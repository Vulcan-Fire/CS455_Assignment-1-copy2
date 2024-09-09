import React, { useEffect, useRef, useState } from "react";
import "./AudioPlayer.css";

const useAudioPlayer = (audioRef, volume, isPlaying) => {
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Playback failed:", error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [volume, isPlaying]);
};

const PlayPauseButton = ({ isPlaying, togglePlayPause }) => (
  <button className="play-button" onClick={togglePlayPause}>
    {isPlaying ? "Stop Music" : "Play Music"}
  </button>
);

const HomeButton = () => (
  <a href="/" className="home-link">
    <button className="home-button">Home</button>
  </a>
);

const AudioPlayer = ({ src, volume = 0.5, loop = true }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => setIsPlaying(!isPlaying);

  useAudioPlayer(audioRef, volume, isPlaying);

  return (
    <div className="audio-player-container">
      <audio ref={audioRef} src={src} loop={loop} />
      <HomeButton />
      <PlayPauseButton isPlaying={isPlaying} togglePlayPause={togglePlayPause} />
    </div>
  );
};

export default AudioPlayer;
