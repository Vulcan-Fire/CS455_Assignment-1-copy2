import { useState, useEffect } from "react";
import { generateRandomBlocks } from "./Util";

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
