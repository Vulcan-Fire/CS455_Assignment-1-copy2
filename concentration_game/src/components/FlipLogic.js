import { useState, useEffect } from "react";
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsGameVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [blocks]);

  const handleBlockClick = (index) => {
    if (isGameVisible || flippedBlocks[index]) return;

    const newFlippedBlocks = [...flippedBlocks];
    newFlippedBlocks[index] = true;
    setFlippedBlocks(newFlippedBlocks);
  };

  const resetGame = () => {
    setBlocks(generateRandomBlocks(totalBlocks));
    setFlippedBlocks(Array(totalBlocks).fill(false));
    setIsGameVisible(true);
  };

  return {
    blocks,
    flippedBlocks,
    isGameVisible,
    handleBlockClick,
    resetGame,
  };
};

export default useGameLogic;
