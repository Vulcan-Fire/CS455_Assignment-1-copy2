import React from "react";
import { render } from "@testing-library/react";
import Instructions from "../components/Instructions";
import { MemoryRouter } from "react-router-dom";

describe("Instructions Component", () => {
  test("renders the GameDescription section correctly", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Instructions />
      </MemoryRouter>
    );
    
    expect(getByText("What is Mind Grid")).toBeTruthy();
    expect(getByText(/In Mind Grid, you quickly memorize a group of tiles on a grid/)).toBeTruthy();
  });

  test("renders the GameInstructions section correctly", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Instructions />
      </MemoryRouter>
    );
    
    expect(getByText("How to Play Mind Grid")).toBeTruthy();
    expect(getByText("You’ll be presented with a grid of cells, each either coloured or blank.")).toBeTruthy();
    expect(getByText("Memorize the cells having colour in 5 seconds.")).toBeTruthy();
    expect(getByText("The grid will turn completely blank. Try to flip all the former coloured cells.")).toBeTruthy();
    expect(getByText("Complete without a mistake to proceed to the next level.")).toBeTruthy();
  });

  test("renders the Start Game link with correct properties", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Instructions />
      </MemoryRouter>
    );
    
    const startLink = getByText("Start Game");
    expect(startLink).toBeTruthy();
    expect(startLink.getAttribute("href")).toBe("/game");
  });
});
