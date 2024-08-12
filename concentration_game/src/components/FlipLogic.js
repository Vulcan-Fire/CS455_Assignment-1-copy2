import { useState, useEffect } from "react";
import { generateRandomBlocks } from "./Util";

const useGameLogic = (totalBlocks, numDifferent) => {
  const [blocks, setBlocks] = useState([]);
  const [flippedBlocks, setFlippedBlocks] = useState([]);
  const [isGameVisible, setIsGameVisible] = useState(true);
  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    initializeGame();
  }, [totalBlocks, numDifferent]);

  const initializeGame = () => {
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

  const handleBlockClick = (index) => {
    if (isGameVisible || isGameOver || flippedBlocks[index]) return;

    const newFlippedBlocks = [...flippedBlocks];
    newFlippedBlocks[index] = true;
    setFlippedBlocks(newFlippedBlocks);

    if (blocks[index].isDifferent) {
      const totalColoredTiles = blocks.filter(
        (block) => block.isDifferent
      ).length;
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

  const resetGame = () => {
    initializeGame();
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
