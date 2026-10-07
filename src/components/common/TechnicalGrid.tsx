"use client";

import React, { useLayoutEffect, useRef, useState } from "react";

type TechnicalGridProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * Measured mode (default): rails and registers are derived from the real
   * cells inside the host, so every bracket lands on an actual cell corner at
   * every breakpoint. Fixed mode draws the classic 25/50/75 × 50 blueprint and
   * is kept for full-frame stages whose rails are animated (the intro).
   */
  measure?: boolean;
  /** Which elements count as cells, queried from the host. */
  cellSelector?: string;
  columns?: number[];
  rows?: number[];
  cornerRegisters?: boolean;
};

// Top corners only — the bottom ones are the next section's top corners.
const corners = [
  { key: "top-left", left: "0", top: "0" },
  { key: "top-right", left: "100%", top: "0" },
];

type Segment = { at: number; from: number; to: number };
type Point = { x: number; y: number; kind: "corner" | "edge" | "inner" };
type Layout = { vertical: Segment[]; horizontal: Segment[]; points: Point[] };

/**
 * The frame: top, left and right edges only, drawn with the same dashed rail
 * as the inner lines. No bottom edge — the next section's top edge is that
 * line. Drawing both stacked two rails 1px apart at every section boundary
 * (in two different dash rhythms), which read as a doubled line.
 */
const GridEdges = () => (
  <>
    <span className="technical-grid-line technical-grid-line--h technical-grid-edge" style={{ top: 0 }} />
    <span className="technical-grid-line technical-grid-line--v technical-grid-edge" style={{ left: 0 }} />
    <span className="technical-grid-line technical-grid-line--v technical-grid-edge technical-grid-edge--right" style={{ left: "100%" }} />
  </>
);

const EMPTY_LAYOUT: Layout = { vertical: [], horizontal: [], points: [] };
const SNAP = 2;

const snap = (value: number) => Math.round(value / SNAP) * SNAP;
/** Edges closer than this are treated as one rail. */
const CLUSTER = 4;

/** Maps each raw edge to the snapped value of its cluster of near-equal edges. */
const clusterEdges = (values: number[]) => {
  const sorted = Array.from(new Set(values)).sort((a, b) => a - b);
  const lookup = new Map<number, number>();
  let group: number[] = [];
  const flush = () => {
    if (!group.length) return;
    const rep = snap(group.reduce((sum, value) => sum + value, 0) / group.length);
    group.forEach((value) => lookup.set(value, rep));
    group = [];
  };
  sorted.forEach((value) => {
    if (group.length && value - group[group.length - 1] > CLUSTER) flush();
    group.push(value);
  });
  flush();
  return (value: number) => lookup.get(value) ?? snap(value);
};

/**
 * Cell position relative to the host from the offset chain, which ignores
 * transforms — reveal animations translate and scale cells, and a
 * bounding-rect measurement would bake those offsets into the grid.
 */
const offsetWithin = (cell: HTMLElement, host: HTMLElement) => {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = cell;
  while (node && node !== host) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return node === host ? { x, y } : null;
};

const mergeSegments = (segments: Segment[]) => {
  const byLine = new Map<number, Segment[]>();
  segments.forEach((segment) => {
    const line = byLine.get(segment.at) ?? [];
    line.push(segment);
    byLine.set(segment.at, line);
  });

  const merged: Segment[] = [];
  byLine.forEach((line) => {
    line.sort((a, b) => a.from - b.from);
    let current = { ...line[0] };
    line.slice(1).forEach((segment) => {
      if (segment.from <= current.to + SNAP) {
        current.to = Math.max(current.to, segment.to);
      } else {
        merged.push(current);
        current = { ...segment };
      }
    });
    merged.push(current);
  });
  return merged;
};

const measureLayout = (grid: HTMLElement, cellSelector: string): Layout => {
  const host = grid.parentElement;
  if (!host) return EMPTY_LAYOUT;

  const width = host.clientWidth;
  const height = host.clientHeight;
  if (!width || !height) return EMPTY_LAYOUT;

  const seen = new Set<string>();
  const vertical: Segment[] = [];
  const horizontal: Segment[] = [];
  const points = new Map<string, Point>();

  const onLeftOrRight = (x: number) => x <= SNAP || x >= width - SNAP;
  const onTopOrBottom = (y: number) => y <= SNAP || y >= height - SNAP;

  const addPoint = (x: number, y: number) => {
    // Bottom-edge nodes belong to the next section's top edge; drawing them
    // here too doubled every boundary node.
    if (y >= height - SNAP) return;
    const key = `${x}:${y}`;
    if (points.has(key)) return;
    const onX = onLeftOrRight(x);
    const onY = onTopOrBottom(y);
    points.set(key, { x, y, kind: onX && onY ? "corner" : onX || onY ? "edge" : "inner" });
  };

  // Pass 1: measure every cell box.
  const boxes: Array<{ left: number; top: number; right: number; bottom: number }> = [];
  host.querySelectorAll<HTMLElement>(cellSelector).forEach((cell) => {
    if (cell === grid || grid.contains(cell) || !cell.offsetWidth || !cell.offsetHeight) return;
    const origin = offsetWithin(cell, host);
    if (!origin) return;
    boxes.push({
      left: Math.max(0, origin.x),
      top: Math.max(0, origin.y),
      right: Math.min(width, origin.x + cell.offsetWidth),
      bottom: Math.min(height, origin.y + cell.offsetHeight),
    });
  });

  // Pass 2: neighbouring edges that differ by a pixel or two (borders, gaps,
  // sub-pixel column widths) are the same rail. Cluster them so one shared
  // edge never renders as two parallel lines with two nodes.
  const xs = clusterEdges(boxes.flatMap((box) => [box.left, box.right]));
  const ys = clusterEdges(boxes.flatMap((box) => [box.top, box.bottom]));

  boxes.forEach((box) => {
    const left = xs(box.left);
    const right = xs(box.right);
    const top = ys(box.top);
    const bottom = ys(box.bottom);
    if (right - left < SNAP || bottom - top < SNAP) return;

    // Stacked reveals (e.g. two card batches sharing four slots) share a box.
    const key = `${left}:${top}:${right}:${bottom}`;
    if (seen.has(key)) return;
    seen.add(key);

    // The perimeter SVG owns the outer frame; rails only mark inner edges.
    if (!onLeftOrRight(left)) vertical.push({ at: left, from: top, to: bottom });
    if (!onLeftOrRight(right)) vertical.push({ at: right, from: top, to: bottom });
    if (!onTopOrBottom(top)) horizontal.push({ at: top, from: left, to: right });
    if (!onTopOrBottom(bottom)) horizontal.push({ at: bottom, from: left, to: right });

    addPoint(left, top);
    addPoint(right, top);
    addPoint(left, bottom);
    addPoint(right, bottom);
  });

  return {
    vertical: mergeSegments(vertical),
    horizontal: mergeSegments(horizontal),
    points: Array.from(points.values()),
  };
};

const sameLayout = (a: Layout, b: Layout) => JSON.stringify(a) === JSON.stringify(b);

const junctionClass = (kind: Point["kind"]) =>
  kind === "corner"
    ? "technical-grid-junction technical-grid-corner"
    : kind === "edge"
      ? "technical-grid-junction technical-grid-edge-register"
      : "technical-grid-junction";

const MeasuredGrid: React.FC<Omit<TechnicalGridProps, "measure" | "columns" | "rows">> = ({
  cellSelector = ":scope > :not(.technical-grid)",
  cornerRegisters = true,
  className = "",
  ...props
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<Layout>(EMPTY_LAYOUT);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    const host = grid?.parentElement;
    if (!grid || !host) return;

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const next = measureLayout(grid, cellSelector);
        setLayout((previous) => (sameLayout(previous, next) ? previous : next));
      });
    };

    const observer = new ResizeObserver(update);
    observer.observe(host);
    host.querySelectorAll<HTMLElement>(cellSelector).forEach((cell) => {
      if (cell !== grid) observer.observe(cell);
    });
    document.fonts?.ready.then(update);
    update();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [cellSelector]);

  return (
    <div ref={gridRef} className={`technical-grid technical-grid--measured ${className}`.trim()} aria-hidden="true" {...props}>
      <GridEdges />

      {layout.vertical.map((segment) => (
        <span
          className="technical-grid-line technical-grid-line--v"
          style={{ left: segment.at, top: segment.from, bottom: "auto", height: segment.to - segment.from }}
          key={`v-${segment.at}-${segment.from}`}
        />
      ))}

      {layout.horizontal.map((segment) => (
        <span
          className="technical-grid-line technical-grid-line--h"
          style={{ top: segment.at, left: segment.from, right: "auto", width: segment.to - segment.from }}
          key={`h-${segment.at}-${segment.from}`}
        />
      ))}

      {layout.points
        .filter((point) => cornerRegisters || point.kind === "inner")
        .map((point) => (
          <span
            className={junctionClass(point.kind)}
            style={{ left: point.x, top: point.y }}
            key={`p-${point.x}-${point.y}`}
          />
        ))}
    </div>
  );
};

const FixedGrid: React.FC<Omit<TechnicalGridProps, "measure" | "cellSelector">> = ({
  columns = [25, 50, 75],
  rows = [50],
  cornerRegisters = true,
  className = "",
  ...props
}) => (
  <div className={`technical-grid ${className}`.trim()} aria-hidden="true" {...props}>
    <GridEdges />

    {cornerRegisters && corners.map((corner) => (
      <span
        className="technical-grid-junction technical-grid-corner"
        style={{ left: corner.left, top: corner.top }}
        key={corner.key}
      />
    ))}

    {cornerRegisters && columns.map((column) => (
      <span
        className="technical-grid-junction technical-grid-edge-register technical-grid-edge-register--top"
        style={{ left: `${column}%`, top: "0" }}
        key={`top-register-${column}`}
      />
    ))}

    {cornerRegisters && rows.flatMap((row) => ([
      <span
        className="technical-grid-junction technical-grid-edge-register technical-grid-edge-register--left"
        style={{ left: "0", top: `${row}%` }}
        key={`left-register-${row}`}
      />,
      <span
        className="technical-grid-junction technical-grid-edge-register technical-grid-edge-register--right"
        style={{ left: "100%", top: `${row}%` }}
        key={`right-register-${row}`}
      />,
    ]))}

    {columns.map((column) => (
      <span
        className={`technical-grid-line technical-grid-line--v ${column === 50 ? "" : "is-quarter"}`}
        style={{ left: `${column}%` }}
        key={`column-${column}`}
      />
    ))}

    {rows.map((row) => (
      <span
        className="technical-grid-line technical-grid-line--h"
        style={{ top: `${row}%` }}
        key={`row-${row}`}
      />
    ))}

    {rows.flatMap((row) => columns.map((column) => (
      <span
        className={`technical-grid-junction ${column === 50 ? "" : "is-quarter"}`}
        style={{ left: `${column}%`, top: `${row}%` }}
        key={`junction-${column}-${row}`}
      />
    )))}
  </div>
);

export const TechnicalGrid: React.FC<TechnicalGridProps> = ({
  measure = true,
  cellSelector,
  columns,
  rows,
  ...props
}) =>
  measure
    ? <MeasuredGrid cellSelector={cellSelector} {...props} />
    : <FixedGrid columns={columns} rows={rows} {...props} />;
