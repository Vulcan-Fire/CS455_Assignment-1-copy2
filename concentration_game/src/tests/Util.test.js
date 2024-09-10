import { generateRandomBlocks } from '../components/Util.js';

describe('generateRandomBlocks', () => {
  test('should generate the correct number of different blocks', () => {
    const totalBlocks = 16;
    const numDifferent = 4;
    const blocks = generateRandomBlocks(totalBlocks, numDifferent);
    const differentBlocks = blocks.filter(block => block.isDifferent);
    expect(differentBlocks.length).toBe(numDifferent);
  });

  test('should always return an array of the specified totalBlocks length', () => {
    const totalBlocks = 10;
    const numDifferent = 3;
    const blocks = generateRandomBlocks(totalBlocks, numDifferent);
    expect(blocks).toHaveLength(totalBlocks);
  });

  test('should handle case where numDifferent is zero', () => {
    const totalBlocks = 10;
    const numDifferent = 0;
    const blocks = generateRandomBlocks(totalBlocks, numDifferent);
    blocks.forEach(block => {
      expect(block.color).toBe('#ffffff');
      expect(block.isDifferent).toBe(false);
    });
  });

  test('should handle case where both totalBlocks and numDifferent are zero', () => {
    const totalBlocks = 0;
    const numDifferent = 0;
    const blocks = generateRandomBlocks(totalBlocks, numDifferent);
    expect(blocks).toHaveLength(0);
  });

  test('should generate blocks with unique indices for different blocks', () => {
    const totalBlocks = 16;
    const numDifferent = 4;
    const blocks = generateRandomBlocks(totalBlocks, numDifferent);
    const differentIndices = new Set(blocks.map((_, index) => index).filter(index => blocks[index].isDifferent));
    expect(differentIndices.size).toBe(numDifferent);
  });
});
