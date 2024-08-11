import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="HomeContainer">
      <header className="HomeHeader">
        <h1 className="Welcome">
          Welcome to Mind Grid!
        </h1>
        <p className="Tagline">
          Challenge Your Memory, Conquer the Grid
        </p>
        <Link to="/instructions" className="StartLink">
          Start Game
        </Link>
      </header>
    </div>
  );
}

export default Home;
