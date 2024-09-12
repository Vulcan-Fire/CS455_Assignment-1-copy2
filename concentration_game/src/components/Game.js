import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes
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

const getLevelInfo = (currentLevelIndex) => levels[currentLevelIndex];

const handleTransition = (
  setShowTransitionScreen,
  setCurrentLevelIndex,
  resetGame
) => {
  setShowTransitionScreen(true);
  setTimeout(() => {
    setShowTransitionScreen(false);
    setCurrentLevelIndex((prevIndex) => prevIndex + 1);
    resetGame();
  }, 2000);
};

const checkGameCompletion = (
  isGameWon,
  currentLevelIndex,
  setShowTransitionScreen,
  setCurrentLevelIndex,
  resetGame,
  setGameCompleted
) => {
  if (isGameWon) {
    if (currentLevelIndex < levels.length - 1) {
      handleTransition(
        setShowTransitionScreen,
        setCurrentLevelIndex,
        resetGame
      );
    } else {
      setGameCompleted(true);
    }
  }
};

const calculateTilesLeft = (blocks, flippedBlocks) => {
  const totalColoredTiles = blocks.filter((block) => block.isDifferent).length;
  const flippedColoredTiles = blocks
    .map((block, index) => block.isDifferent && flippedBlocks[index])
    .filter(Boolean).length;
  return totalColoredTiles - flippedColoredTiles;
};
const useMemoryGame = (
  currentLevelIndex,
  setCurrentLevelIndex,
  setShowTransitionScreen,
  setGameCompleted
) => {
  const currentLevel = getLevelInfo(currentLevelIndex);
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
    checkGameCompletion(
      isGameWon,
      currentLevelIndex,
      setShowTransitionScreen,
      setCurrentLevelIndex,
      resetGame,
      setGameCompleted
    );
  }, [isGameWon]);
  useEffect(() => {
    resetGame();
  }, [currentLevelIndex]);
  const tilesLeft = calculateTilesLeft(blocks, flippedBlocks);
  return {
    currentLevel,
    blocks,
    flippedBlocks,
    isGameVisible,
    isGameOver,
    isGameWon,
    handleBlockClick,
    resetGame,
    tilesLeft,
  };
};

const MemoryGame = () => {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [showTransitionScreen, setShowTransitionScreen] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const {
    currentLevel,
    blocks,
    flippedBlocks,
    isGameVisible,
    isGameOver,
    isGameWon,
    handleBlockClick,
    resetGame,
    tilesLeft,
  } = useMemoryGame(
    currentLevelIndex,
    setCurrentLevelIndex,
    setShowTransitionScreen,
    setGameCompleted
  );

  return (
    <div className="MemoryGame">
      {gameCompleted ? (
        <CongratulationsScreen />
      ) : showTransitionScreen ? (
        <TransitionScreen currentLevelIndex={currentLevelIndex} />
      ) : (
        <div className="GameContainer">
          <GameHeader
            currentLevel={currentLevel}
            tilesLeft={tilesLeft}
            totalColoredTiles={currentLevel.coloredCells}
          />
          <GameBoard
            blocks={blocks}
            flippedBlocks={flippedBlocks}
            isGameVisible={isGameVisible}
            isGameOver={isGameOver}
            handleBlockClick={handleBlockClick}
          />
          {isGameOver && !isGameWon && <RetryButton resetGame={resetGame} />}
        </div>
      )}
    </div>
  );
};

const GameHeader = ({ currentLevel, tilesLeft, totalColoredTiles }) => (
  <div className="GridContainer">
    <h1 className="grid-heading">Memory Game</h1>
    <div className="game-info">
      <div className="info-item">
        Tiles Left: {tilesLeft}/{totalColoredTiles}
      </div>
      <div className="info-item">{currentLevel.name}</div>
    </div>
  </div>
);
GameHeader.propTypes = {
  currentLevel: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  tilesLeft: PropTypes.number.isRequired,
  totalColoredTiles: PropTypes.number.isRequired,
};

const TransitionScreen = ({ currentLevelIndex }) => (
  <div className="transition-screen">
    <h2>
      Too Easy! Ready for:{" "}
      {levels[currentLevelIndex + 1]?.name || "the Ultimate Challenge!"}
    </h2>
  </div>
);
TransitionScreen.propTypes = {
  currentLevelIndex: PropTypes.number.isRequired,
};
const CongratulationsScreen = () => (
  <div className="congratulations-page">
    <h1>Congratulations!</h1>
    <p>You&rsquo;ve conquered all the levels!</p>
    <p>You&rsquo;re a memory master!</p>
    <button
      onClick={() => window.location.reload()}
      className="play-again-button"
    >
      Play Again
    </button>
  </div>
);
const RetryButton = ({ resetGame }) => (
  <button onClick={resetGame} className="play-again-button">
    Retry Level
  </button>
);
RetryButton.propTypes = {
  resetGame: PropTypes.func.isRequired,
};
export default MemoryGame;
