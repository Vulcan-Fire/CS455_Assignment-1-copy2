import React from "react";
import { render } from "@testing-library/react";
import Home from "../components/Home";
import { MemoryRouter } from "react-router-dom";

describe("Home Component", () => {
  test("renders the welcome heading correctly", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    
    expect(getByText("Welcome to Mind Grid!")).toBeTruthy();
  });

  test("renders the tagline correctly", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    
    expect(getByText("Challenge Your Memory, Conquer the Grid")).toBeTruthy();
  });

  test("renders the Start Game link with correct properties", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    
    const startLink = getByText("Start Game");
    expect(startLink).toBeTruthy();
    expect(startLink.getAttribute("href")).toBe("/instructions");
  });
});
