import React from "react";
import "./Grid.css";

function Grid() {
  const rows = 8;
  const columns = 8;

  const grid = Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: columns }, (_, colIndex) => ({ rowIndex, colIndex }))
  );

  return (
    <div className="Grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="Row">
          {row.map(({ rowIndex, colIndex }) => (
            <div key={colIndex} className="Cell"></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Grid;
