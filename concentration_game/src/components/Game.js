import React, { useState, useEffect } from "react";
import GameBoard from "./Board";
import { generateRandomBlocks } from "./Util";
import useGameLogic from "./FlipLogic";
import "./Game.css";

const initialGridSize = 6;

const MemoryGame = () => {
  const [gridSize, setGridSize] = useState(initialGridSize);
  const totalBlocks = gridSize * gridSize;

  const {
    blocks,
    flippedBlocks,
    isGameVisible,
    isGameWon,
    isGameOver,
    correctCount,
    handleBlockClick,
    resetGame,
  } = useGameLogic(totalBlocks);

  const totalColoredTiles = blocks.filter((block) => block.isDifferent).length;
  const flippedColoredTiles = blocks
    .map((block, index) => block.isDifferent && flippedBlocks[index])
    .filter(Boolean).length;

  const tilesLeft = totalColoredTiles - flippedColoredTiles;
  const level = 1;

  return (
    <div className="MemoryGame">
      <h1>Memory Game</h1>
      <div className="GridContainer">
        <div className="game-info">
          <div className="info-item">
            Tiles Left: {tilesLeft}/{totalColoredTiles}
          </div>
          <div className="info-item">Level: {level}</div>
        </div>
        <GameBoard
          blocks={blocks}
          flippedBlocks={flippedBlocks}
          isGameVisible={isGameVisible}
          isGameOver={isGameOver}
          handleBlockClick={handleBlockClick}
        />
      </div>
    </div>
  );
};

export default MemoryGame;
