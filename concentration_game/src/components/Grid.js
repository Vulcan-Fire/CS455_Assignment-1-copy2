import React from "react";
import "./Grid.css";

function Grid() {
  const rows = 8;
  const columns = 8;

  const grid = Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: columns }, (_, colIndex) => ({ rowIndex, colIndex }))
  );

  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map(({ rowIndex, colIndex }) => (
            <div key={colIndex} className="cell"></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Grid;
