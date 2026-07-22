import React from "react";

type TechnicalGridProps = React.HTMLAttributes<HTMLDivElement> & {
  columns?: number[];
  rows?: number[];
  cornerRegisters?: boolean;
};

const corners = [
  { key: "top-left", left: "0", top: "0" },
  { key: "top-right", left: "100%", top: "0" },
  { key: "bottom-left", left: "0", top: "100%" },
  { key: "bottom-right", left: "100%", top: "100%" },
];

export const TechnicalGrid: React.FC<TechnicalGridProps> = ({
  columns = [25, 50, 75],
  rows = [50],
  cornerRegisters = true,
  className = "",
  ...props
}) => (
  <div className={`technical-grid ${className}`.trim()} aria-hidden="true" {...props}>
    <svg className="technical-grid-perimeter" aria-hidden="true">
      <rect className="technical-grid-perimeter-base" />
      <rect className="technical-grid-perimeter-accent" />
    </svg>

    {cornerRegisters && corners.map((corner) => (
      <span
        className="technical-grid-junction technical-grid-corner"
        style={{ left: corner.left, top: corner.top }}
        key={corner.key}
      />
    ))}

    {cornerRegisters && columns.flatMap((column) => ([
      <span
        className="technical-grid-junction technical-grid-edge-register technical-grid-edge-register--top"
        style={{ left: `${column}%`, top: "0" }}
        key={`top-register-${column}`}
      />,
      <span
        className="technical-grid-junction technical-grid-edge-register technical-grid-edge-register--bottom"
        style={{ left: `${column}%`, top: "100%" }}
        key={`bottom-register-${column}`}
      />,
    ]))}

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
