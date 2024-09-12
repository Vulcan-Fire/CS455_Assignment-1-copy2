import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GameBoard from './Board';

describe('GameBoard Component', () => {
  const blocks = [
    { color: 'red' },
    { color: 'blue' },
    { color: 'green' },
    { color: 'yellow' },
  ];
  const flippedBlocks = [false, false, false, false];
  const handleBlockClick = jest.fn();

  test('renders GameBoard correctly', () => {
    const { container } = render(
      <GameBoard
        blocks={blocks}
        flippedBlocks={flippedBlocks}
        isGameVisible={false}
        isGameOver={false}
        handleBlockClick={handleBlockClick}
      />
    );
    expect(container.firstChild).toHaveClass('game-board-container');
  });

  test('renders correct number of blocks', () => {
    const { getAllByTestId } = render(
      <GameBoard
        blocks={blocks}
        flippedBlocks={flippedBlocks}
        isGameVisible={false}
        isGameOver={false}
        handleBlockClick={handleBlockClick}
      />
    );
    const blockElements = getAllByTestId(/^block-/);
    expect(blockElements).toHaveLength(blocks.length);
  });

  test('handles block click', () => {
    const { getAllByTestId } = render(
      <GameBoard
        blocks={blocks}
        flippedBlocks={flippedBlocks}
        isGameVisible={false}
        isGameOver={false}
        handleBlockClick={handleBlockClick}
      />
    );
    const blockElements = getAllByTestId(/^block-/);
    fireEvent.click(blockElements[0]);
    expect(handleBlockClick).toHaveBeenCalledWith(0);
  });

  test('block displays correct color when flipped', () => {
    const flippedBlocks = [true, false, false, false];
    const { getAllByTestId } = render(
      <GameBoard
        blocks={blocks}
        flippedBlocks={flippedBlocks}
        isGameVisible={false}
        isGameOver={false}
        handleBlockClick={handleBlockClick}
      />
    );
    const blockElements = getAllByTestId(/^block-/);
    expect(blockElements[0]).toHaveStyle('background-color: red');
  });
});
