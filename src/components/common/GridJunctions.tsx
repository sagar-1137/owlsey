import React from "react";

const COLUMNS = [0, 25, 50, 75, 100];
const ROWS = [0, 50, 100];

export const GridJunctions: React.FC = () => (
  <div className="complete-grid-junctions" aria-hidden="true">
    {ROWS.flatMap((row) =>
      COLUMNS.map((column) => (
        <span key={`${row}-${column}`} style={{ left: `${column}%`, top: `${row}%` }} />
      ))
    )}
  </div>
);
