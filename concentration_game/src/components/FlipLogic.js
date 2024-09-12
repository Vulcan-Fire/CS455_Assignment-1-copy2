import { generateRandomBlocks } from './Util';
import { useEffect, useState } from 'react';

export const initializeGameState = (totalBlocks, numDifferent, setBlocks, setFlippedBlocks, setIsGameVisible, setIsGameWon, setIsGameOver) => {
  const initialBlocks = generateRandomBlocks(totalBlocks, numDifferent);
  setBlocks(initialBlocks);
  setFlippedBlocks(new Array(totalBlocks).fill(false));
  setIsGameVisible(true);
  setIsGameWon(false);
  setIsGameOver(false);

  setTimeout(() => {
    setIsGameVisible(false);
  }, 3000);
};

export const handleBlockClickLogic = (index, blocks, flippedBlocks, setFlippedBlocks, setIsGameWon, setIsGameOver, isGameVisible, isGameOverState) => {
  if (isGameVisible || isGameOverState || flippedBlocks[index]) return;

  const newFlippedBlocks = [...flippedBlocks];
  newFlippedBlocks[index] = true;
  setFlippedBlocks(newFlippedBlocks);

  if (blocks[index].isDifferent) {
    const totalColoredTiles = blocks.filter((block) => block.isDifferent).length;
    const flippedColoredTiles = blocks
      .map((block, idx) => block.isDifferent && newFlippedBlocks[idx])
      .filter(Boolean).length;

    if (flippedColoredTiles === totalColoredTiles) {
      setIsGameWon(true);
    }
  } else {
    setIsGameOver(true);
  }
};


const useGameLogic = (totalBlocks, numDifferent) => {
  const [blocks, setBlocks] = useState([]);
  const [flippedBlocks, setFlippedBlocks] = useState([]);
  const [isGameVisible, setIsGameVisible] = useState(true);
  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    initializeGameState(totalBlocks, numDifferent, setBlocks, setFlippedBlocks, setIsGameVisible, setIsGameWon, setIsGameOver);
  }, [totalBlocks, numDifferent]);

  const handleBlockClick = (index) => {
    handleBlockClickLogic(index, blocks, flippedBlocks, setFlippedBlocks, setIsGameWon, setIsGameOver, isGameVisible, isGameOver);
  };

  const resetGame = () => {
    initializeGameState(totalBlocks, numDifferent, setBlocks, setFlippedBlocks, setIsGameVisible, setIsGameWon, setIsGameOver);
  };

  return {
    blocks,
    flippedBlocks,
    isGameVisible,
    isGameWon,
    isGameOver,
    handleBlockClick,
    resetGame,
  };
};

export default useGameLogic;
