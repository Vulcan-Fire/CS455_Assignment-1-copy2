import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AudioPlayer from "../components/AudioPlayer";

Object.defineProperty(global.HTMLMediaElement.prototype, "play", {
  configurable: true,
  writable: true,
  value: jest.fn().mockImplementation(() => Promise.resolve()),
});

Object.defineProperty(global.HTMLMediaElement.prototype, "pause", {
  configurable: true,
  writable: true,
  value: jest.fn(),
});

test("renders the AudioPlayer component with initial props", () => {
  render(
    <AudioPlayer
      src="../assets/background-music.mp3"
      volume={0.75}
      loop={true}
    />
  );

  const audioElement = screen.getByTestId("audio-element");
  expect(audioElement).not.toBeNull();

  const homeButton = screen.getByText("Home");
  expect(homeButton).not.toBeNull();
});

test("clicking play button starts audio playback", () => {
  render(<AudioPlayer src="test-audio.mp3" volume={0.75} loop={true} />);

  const playButton = screen.getByText("Play Music");
  fireEvent.click(playButton);

  expect(global.HTMLMediaElement.prototype.play).toHaveBeenCalled();
});

test("clicking stop button pauses audio playback", () => {
  render(<AudioPlayer src="test-audio.mp3" volume={0.75} loop={true} />);
  fireEvent.click(screen.getByText("Play Music"));
  fireEvent.click(screen.getByText("Stop Music"));
  expect(global.HTMLMediaElement.prototype.pause).toHaveBeenCalled();
});

test("audio element has correct volume and loop attributes", () => {
  render(<AudioPlayer src="test-audio.mp3" volume={0.75} loop={true} />);
  const audioElement = screen.getByTestId("audio-element");
  expect(audioElement.volume).toBe(0.75);
  expect(audioElement.loop).toBe(true);
});
