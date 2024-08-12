[17:16, 8/12/2024] Anitej: import React, { useState, useEffect } from "react";
import GameBoard from "./Board";
import { generateRandomBlocks } from "./Util";
import useGameLogic from "./Logic";
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
    timeRemaining,
    correctCount,
    handleBlockClick,
    resetGame,
  } = useGameLogic(totalBlocks);

  const totalColoredTiles = blocks.filter((block) => block.isDifferent).length;
  const flippedColoredTiles = blocks
    .map((block, index) => block.isDifferent && flippedBlocks[index])
    .filter(Boolean).length;

  const tilesLeft = totalColoredTiles - flippedColoredTiles;
  const level = gridSize;

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
[17:16, 8/12/2024] Anitej: Game.Js
[17:16, 8/12/2024] Anitej: import { useState, useEffect } from "react";
import { generateRandomBlocks } from "./Utils";

const useGameLogic = (totalBlocks) => {
  const numDifferent = 10;
  const [blocks, setBlocks] = useState(
    generateRandomBlocks(totalBlocks, numDifferent)
  );
  const [flippedBlocks, setFlippedBlocks] = useState(
    Array(totalBlocks).fill(false)
  );
  const [isGameVisible, setIsGameVisible] = useState(true);
  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsGameVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [blocks]);

  const handleBlockClick = (index) => {
    if (isGameVisible || isGameOver || isGameWon || flippedBlocks[index])
      return;

    const newFlippedBlocks = [...flippedBlocks];
    newFlippedBlocks[index] = true;
    setFlippedBlocks(newFlippedBlocks);

    if (!blocks[index].isDifferent) {
      setIsGameOver(true);
    } else {
      const newCorrectCount = correctCount + 1;
      setCorrectCount(newCorrectCount);

      const allCorrectBlocksFlipped = blocks.every(
        (block, i) => !block.isDifferent || newFlippedBlocks[i]
      );
      if (allCorrectBlocksFlipped) {
        setIsGameWon(true);
      }
    }
  };

  const resetGame = () => {
    setBlocks(generateRandomBlocks(totalBlocks));
    setFlippedBlocks(Array(totalBlocks).fill(false));
    setIsGameVisible(true);
    setIsGameWon(false);
    setIsGameOver(false);
    setCorrectCount(0);
  };

  return {
    blocks,
    flippedBlocks,
    isGameVisible,
    isGameWon,
    isGameOver,
    correctCount,
    handleBlockClick,
    resetGame,
  };
};

export default useGameLogic;
