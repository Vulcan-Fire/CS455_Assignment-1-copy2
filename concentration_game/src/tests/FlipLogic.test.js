import { initializeGameState, handleBlockClickLogic } from '../components/FlipLogic';
import { generateRandomBlocks } from '../components/Util';

jest.mock('../components/Util', () => ({
  generateRandomBlocks: jest.fn(),
}));

describe('initializeGameState', () => {
  it('should initialize game state correctly', () => {
    const mockBlocks = [{ isDifferent: false }, { isDifferent: true }];
    generateRandomBlocks.mockReturnValue(mockBlocks);

    const setBlocks = jest.fn();
    const setFlippedBlocks = jest.fn();
    const setIsGameVisible = jest.fn();
    const setIsGameWon = jest.fn();
    const setIsGameOver = jest.fn();

    initializeGameState(2, 1, setBlocks, setFlippedBlocks, setIsGameVisible, setIsGameWon, setIsGameOver);

    expect(setBlocks).toHaveBeenCalledWith(mockBlocks);
    expect(setFlippedBlocks).toHaveBeenCalledWith([false, false]);
    expect(setIsGameVisible).toHaveBeenCalledWith(true);
    expect(setIsGameWon).toHaveBeenCalledWith(false);
    expect(setIsGameOver).toHaveBeenCalledWith(false);
  });

  it('should hide the game after 3 seconds', () => {
    jest.useFakeTimers();

    const setBlocks = jest.fn();
    const setFlippedBlocks = jest.fn();
    const setIsGameVisible = jest.fn();
    const setIsGameWon = jest.fn();
    const setIsGameOver = jest.fn();

    initializeGameState(2, 1, setBlocks, setFlippedBlocks, setIsGameVisible, setIsGameWon, setIsGameOver);

    expect(setIsGameVisible).toHaveBeenCalledWith(true);

    jest.advanceTimersByTime(3000);

    expect(setIsGameVisible).toHaveBeenCalledWith(false);

    jest.useRealTimers();
  });

  it('should handle a large number of blocks correctly', () => {
    const mockBlocks = Array(100).fill({ isDifferent: false });
    generateRandomBlocks.mockReturnValue(mockBlocks);

    const setBlocks = jest.fn();
    const setFlippedBlocks = jest.fn();
    const setIsGameVisible = jest.fn();
    const setIsGameWon = jest.fn();
    const setIsGameOver = jest.fn();

    initializeGameState(100, 50, setBlocks, setFlippedBlocks, setIsGameVisible, setIsGameWon, setIsGameOver);

    expect(setBlocks).toHaveBeenCalledWith(mockBlocks);
    expect(setFlippedBlocks).toHaveBeenCalledWith(Array(100).fill(false));
  });
});

describe('handleBlockClickLogic', () => {
  it('should flip a block and handle game win', () => {
    const blocks = [{ isDifferent: true }, { isDifferent: false }];
    const flippedBlocks = [false, false];
    const setFlippedBlocks = jest.fn();
    const setIsGameWon = jest.fn();
    const setIsGameOver = jest.fn();
    const isGameVisible = false;
    const isGameOverState = false;

    handleBlockClickLogic(0, blocks, flippedBlocks, setFlippedBlocks, setIsGameWon, setIsGameOver, isGameVisible, isGameOverState);

    expect(setFlippedBlocks).toHaveBeenCalledWith([true, false]);
    expect(setIsGameWon).toHaveBeenCalledWith(true);
    expect(setIsGameOver).not.toHaveBeenCalled();
  });

  it('should not flip a block if the game is over', () => {
    const blocks = [{ isDifferent: true }, { isDifferent: false }];
    const flippedBlocks = [false, false];
    const setFlippedBlocks = jest.fn();
    const setIsGameWon = jest.fn();
    const setIsGameOver = jest.fn();
    const isGameVisible = false;
    const isGameOverState = true;

    handleBlockClickLogic(0, blocks, flippedBlocks, setFlippedBlocks, setIsGameWon, setIsGameOver, isGameVisible, isGameOverState);

    expect(setFlippedBlocks).not.toHaveBeenCalled();
    expect(setIsGameWon).not.toHaveBeenCalled();
    expect(setIsGameOver).not.toHaveBeenCalled();
  });

  it('should set the game over if a non-different block is clicked', () => {
    const blocks = [{ isDifferent: true }, { isDifferent: false }];
    const flippedBlocks = [false, false];
    const setFlippedBlocks = jest.fn();
    const setIsGameWon = jest.fn();
    const setIsGameOver = jest.fn();
    const isGameVisible = false;
    const isGameOverState = false;

    handleBlockClickLogic(1, blocks, flippedBlocks, setFlippedBlocks, setIsGameWon, setIsGameOver, isGameVisible, isGameOverState);

    expect(setFlippedBlocks).toHaveBeenCalledWith([false, true]);
    expect(setIsGameOver).toHaveBeenCalledWith(true);
    expect(setIsGameWon).not.toHaveBeenCalled();
  });

  it('should not flip a block if it is already flipped', () => {
    const blocks = [{ isDifferent: true }, { isDifferent: false }];
    const flippedBlocks = [true, false];
    const setFlippedBlocks = jest.fn();
    const setIsGameWon = jest.fn();
    const setIsGameOver = jest.fn();
    const isGameVisible = false;
    const isGameOverState = false;

    handleBlockClickLogic(0, blocks, flippedBlocks, setFlippedBlocks, setIsGameWon, setIsGameOver, isGameVisible, isGameOverState);

    expect(setFlippedBlocks).not.toHaveBeenCalled();
    expect(setIsGameWon).not.toHaveBeenCalled();
    expect(setIsGameOver).not.toHaveBeenCalled();
  });

  it('should do nothing if the game is visible', () => {
    const blocks = [{ isDifferent: true }, { isDifferent: false }];
    const flippedBlocks = [false, false];
    const setFlippedBlocks = jest.fn();
    const setIsGameWon = jest.fn();
    const setIsGameOver = jest.fn();
    const isGameVisible = true;
    const isGameOverState = false;

    handleBlockClickLogic(0, blocks, flippedBlocks, setFlippedBlocks, setIsGameWon, setIsGameOver, isGameVisible, isGameOverState);

    expect(setFlippedBlocks).not.toHaveBeenCalled();
    expect(setIsGameWon).not.toHaveBeenCalled();
    expect(setIsGameOver).not.toHaveBeenCalled();
  });
});
