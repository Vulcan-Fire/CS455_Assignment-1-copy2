const generateUniqueRandomIndices = (totalBlocks, numDifferent) => {
  const differentIndices = new Set();
  while (differentIndices.size < numDifferent) {
    differentIndices.add(Math.floor(Math.random() * totalBlocks));
  }
  return differentIndices;
};

const createBlock = (index, differentIndices) => {
  return differentIndices.has(index)
    ? { color: "#75ab00", isDifferent: true }
    : { color: "#ffffff", isDifferent: false };
};

const generateBlocksArray = (totalBlocks, differentIndices) => {
  return Array.from({ length: totalBlocks }, (_, index) => 
    createBlock(index, differentIndices)
  );
};
export const generateRandomBlocks = (totalBlocks, numDifferent) => {
  const differentIndices = generateUniqueRandomIndices(totalBlocks, numDifferent);
  return generateBlocksArray(totalBlocks, differentIndices);
};
