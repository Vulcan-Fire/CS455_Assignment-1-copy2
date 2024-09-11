import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Instructions from './components/Instructions';
import Game from './components/Game';
import AudioPlayer from './components/AudioPlayer';
import backgroundMusic from './assets/background-music.mp3';

function App() {
  return (
    <Router>
      <div>
        <AudioPlayer src={backgroundMusic} volume={0.3} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
