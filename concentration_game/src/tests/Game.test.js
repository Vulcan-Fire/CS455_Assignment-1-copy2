import React from "react";
import { render, act } from "@testing-library/react";
import MemoryGame from "../components/Game";
import useGameLogic from "../components/FlipLogic";

jest.mock("../components/FlipLogic", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("MemoryGame Component", () => {
  let mockGameLogic;

  beforeEach(() => {
    mockGameLogic = {
      blocks: Array(16).fill({ isDifferent: false }),
      flippedBlocks: Array(16).fill(false),
      isGameVisible: true,
      isGameWon: false,
      isGameOver: false,
      handleBlockClick: jest.fn(),
      resetGame: jest.fn(),
    };
    useGameLogic.mockReturnValue(mockGameLogic);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders initial game state correctly", () => {
    const { container } = render(<MemoryGame />);
    expect(container.querySelector(".MemoryGame")).toBeTruthy();
  });

  test("resets game when retry button is clicked", () => {
    mockGameLogic.isGameOver = true;

    const { getByText } = render(<MemoryGame />);
    const retryButton = getByText("Retry Level");

    act(() => {
      retryButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(mockGameLogic.resetGame).toHaveBeenCalled();
  });

  test("transitions to the next level", () => {
    mockGameLogic.isGameWon = true;
    const { rerender } = render(<MemoryGame />);

    act(() => {
      rerender(<MemoryGame />);
    });
    expect(useGameLogic).toHaveBeenCalled();
  });

  
});
