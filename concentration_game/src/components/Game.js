import React, { useState, useEffect } from "react";
import GameBoard from "./Board";
import { generateRandomBlocks } from "./Utils";
import useGameLogic from "./FlipLogic";
import "./Game.css";

const initialGridSize = 6;

const MemoryGame = () => {
  const [gridSize, setGridSize] = useState(initialGridSize);
  const totalBlocks = gridSize * gridSize;

  const { blocks, flippedBlocks, isGameVisible, handleBlockClick } =
    useGameLogic(totalBlocks);
    
  return (
    <div className="MemoryGame">
      <h1>Memory Game</h1>
      <div className="GridContainer">
        <GameBoard
          blocks={blocks}
          flippedBlocks={flippedBlocks}
          isGameVisible={isGameVisible}
          handleBlockClick={handleBlockClick}
        />
      </div>
    </div>
  );
};

export default MemoryGame;
