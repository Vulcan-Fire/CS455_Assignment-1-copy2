export const generateRandomBlocks = (totalBlocks, numDifferent) => {
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
