export const generateRandomBlocks = (totalBlocks, numDifferent) => {
  numDifferent = Math.floor(Math.random() * 10) + 5;
  const differentIndices = new Set();
  while (differentIndices.size < numDifferent) {
    differentIndices.add(Math.floor(Math.random() * totalBlocks));
  }
  return Array.from({ length: totalBlocks }, (_, index) =>
    differentIndices.has(index)
      ? { color: "#75ab00", isDifferent: true }
      : { color: "#ffffff", isDifferent: false }
  );
};
