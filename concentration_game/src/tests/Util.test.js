import { generateRandomBlocks } from '../components/Util.js';

const generateRandomBlocksMock = jest.fn();

beforeEach(() => {
  generateRandomBlocksMock.mockReset();
});

describe('generateRandomBlocks', () => {
  test('should generate correct number of different blocks', () => {
    generateRandomBlocksMock.mockImplementation((totalBlocks, numDifferent) => {
      const differentIndices = new Set();
      while (differentIndices.size < numDifferent) {
        differentIndices.add(Math.floor(Math.random() * totalBlocks));
      }
      return Array.from({ length: totalBlocks }, (_, index) =>
        differentIndices.has(index)
          ? { color: '#75ab00', isDifferent: true }
          : { color: '#ffffff', isDifferent: false }
      );
    });

    const totalBlocks = 16;
    const numDifferent = 4;
    const blocks = generateRandomBlocksMock(totalBlocks, numDifferent);
    const differentBlocks = blocks.filter(block => block.isDifferent);
    expect(differentBlocks.length).toBe(numDifferent);
  });

  test('should always return an array of the specified totalBlocks length', () => {
    generateRandomBlocksMock.mockImplementation((totalBlocks, numDifferent) => {
      return Array.from({ length: totalBlocks }, (_, index) => ({
        color: index < numDifferent ? '#75ab00' : '#ffffff',
        isDifferent: index < numDifferent
      }));
    });

    const totalBlocks = 10;
    const numDifferent = 3;
    const blocks = generateRandomBlocksMock(totalBlocks, numDifferent);
    expect(blocks).toHaveLength(totalBlocks);
  });

  test('should return blocks with colors set correctly', () => {
    generateRandomBlocksMock.mockImplementation((totalBlocks, numDifferent) => {
      return Array.from({ length: totalBlocks }, (_, index) => ({
        color: index < numDifferent ? '#75ab00' : '#ffffff',
        isDifferent: index < numDifferent
      }));
    });

    const totalBlocks = 10;
    const numDifferent = 5;
    const blocks = generateRandomBlocksMock(totalBlocks, numDifferent);
    const firstFewBlocks = blocks.slice(0, numDifferent);
    firstFewBlocks.forEach(block => {
      expect(block.color).toBe('#75ab00');
      expect(block.isDifferent).toBe(true);
    });
  });
});
