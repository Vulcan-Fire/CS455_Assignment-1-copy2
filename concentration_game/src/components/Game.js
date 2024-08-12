import React, { useState, useEffect } from "react";
import GameBoard from "./Board";
import useGameLogic from "./FlipLogic";
import "./Game.css";

const levels = [
  { gridSize: 4, name: "Level 1", coloredCells: 5 },
  { gridSize: 6, name: "Level 2", coloredCells: 8 },
  { gridSize: 6, name: "Level 3", coloredCells: 10 },
  { gridSize: 8, name: "Level 4", coloredCells: 10 },
  { gridSize: 8, name: "Level 5", coloredCells: 12 },
];
const MemoryGame = () => {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [showTransitionScreen, setShowTransitionScreen] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const currentLevel = levels[currentLevelIndex];
  const totalBlocks = currentLevel.gridSize * currentLevel.gridSize;
  const numDifferent = currentLevel.coloredCells;

  const {
    blocks,
    flippedBlocks,
    isGameVisible,
    isGameWon,
    isGameOver,
    handleBlockClick,
    resetGame,
  } = useGameLogic(totalBlocks, numDifferent, currentLevel.twoColors);

  useEffect(() => {
    if (isGameWon) {
      if (currentLevelIndex < levels.length - 1) {
        setShowTransitionScreen(true);
        setTimeout(() => {
          setShowTransitionScreen(false);
          setCurrentLevelIndex((prevIndex) => prevIndex + 1);
          resetGame();
        }, 2000);
      } else {
        setGameCompleted(true);
      }
    }
  }, [isGameWon, currentLevelIndex]);

  useEffect(() => {
    resetGame();
  }, [currentLevelIndex]);

  const totalColoredTiles = blocks.filter((block) => block.isDifferent).length;
  const flippedColoredTiles = blocks
    .map((block, index) => block.isDifferent && flippedBlocks[index])
    .filter(Boolean).length;

  const tilesLeft = totalColoredTiles - flippedColoredTiles;

  const handleResetClick = () => {
    resetGame();
  };

  return (
    <div className="MemoryGame">
      {gameCompleted ? (
        <div className="congratulations-page">
          <h1>Congratulations!</h1>
          <p>You've conquered all the levels!</p>
          <p>You're a memory master!</p>
          <button
            onClick={() => window.location.reload()}
            className="play-again-button"
          >
            Play Again
          </button>
        </div>
      ) : showTransitionScreen ? (
        <div className="transition-screen">
          <h2>
            Too Easy! Ready for:{" "}
            {levels[currentLevelIndex + 1]?.name || "the Ultimate Challenge!"}
          </h2>
        </div>
      ) : (
        <>
          <h1 className="grid-heading">Memory Game</h1>
          <div className="GridContainer">
            <div className="game-info">
              <div className="info-item">
                Tiles Left: {tilesLeft}/{totalColoredTiles}
              </div>
              <div className="info-item">{currentLevel.name}</div>
            </div>
            <GameBoard
              blocks={blocks}
              flippedBlocks={flippedBlocks}
              isGameVisible={isGameVisible}
              isGameOver={isGameOver}
              handleBlockClick={handleBlockClick}
            />
          </div>
          {isGameOver && !isGameWon && (
            <button onClick={handleResetClick} className="play-again-button">
              Retry Level
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default MemoryGame;
