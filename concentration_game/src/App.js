import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Instructions from "./components/Instructions";
import Grid from "./components/Grid";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/game" element={<Grid />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
