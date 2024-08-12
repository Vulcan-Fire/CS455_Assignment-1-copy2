import React, { useState, useEffect } from "react";
import "./Grid.css";
import { generateRandomBlocks, startColorChangeTimer } from "./Util";

function Grid() {
  const rows = 8;
  const columns = 8;
  const totalBlocks = rows * columns;
  const numDifferent = 10;

  const initialBlocks = generateRandomBlocks(totalBlocks, "blue");
  const [blocks, setBlocks] = useState(initialBlocks);

  useEffect(() => {
    const clearTimer = startColorChangeTimer(setBlocks, initialBlocks, 3000);
    return clearTimer;
  }, [initialBlocks, totalBlocks, numDifferent]);

  return (
    <div className="container">
      <div className="grid">
        {blocks.map((block, index) => (
          <div
            key={index}
            className="cell"
            style={{ backgroundColor: block.color }}
          />
        ))}
      </div>
    </div>
  );
}

export default Grid;
