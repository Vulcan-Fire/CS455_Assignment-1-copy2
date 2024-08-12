import React, { useEffect, useRef, useState } from "react";
import "./AudioPlayer.css";

const AudioPlayer = ({ src, volume = 0.5, loop = true }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

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

  return (
    <div className="audio-player-container">
      <audio ref={audioRef} src={src} loop={loop} />
      <button className="play-button" onClick={togglePlayPause}>
        {isPlaying ? "Stop Music" : "Play Music"}
      </button>
    </div>
  );
};

export default AudioPlayer;
