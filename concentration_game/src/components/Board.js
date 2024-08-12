import React from "react";
import "./Board.css";

const GameBoard = ({
  blocks,
  flippedBlocks,
  isGameVisible,
  isGameOver,
  handleBlockClick,
}) => {
  const gridSize = Math.sqrt(blocks.length); 

  return (
    <div className="game-board-container">
      <div
        className="game-board"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 50px)`,
          gridTemplateRows: `repeat(${gridSize}, 50px)`,
        }}
      >
        {blocks.map((block, index) => (
          <div
            key={index}
            onClick={() => handleBlockClick(index)}
            style={{
              width: "50px",
              height: "50px",
              backgroundColor:
                isGameVisible || flippedBlocks[index] || isGameOver
                  ? block.color
                  : "#e0e0e0",
              border: "1px solid #000",
              cursor: isGameVisible ? "not-allowed" : "pointer",
              transition: "background-color 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
