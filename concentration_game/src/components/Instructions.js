import React from "react";
import { Link } from "react-router-dom";
import "./Instructions.css"; 

function Instructions() {
  return (
    <div className="InstructionsContainer">
      <header className="InstructionsHeader">
        <h1> What is Mind Grid </h1>
        <p > In Mind Grid, you quickly memorize a group of tiles on a grid. 
            That means remembering their location, and maybe even the shapes they create.
            This task challenges a part of your short-term memory called spatial recall — 
            your ability to track location and position within an environment. 
                                                                              </p>
        <h1> How to Play Mind Grid </h1>
        <p className="Instruction"> You'll be presented with a grid of cells, each either coloured or blank.</p>
        <p className="Instruction"> Memorize the cells having colour in 5 seconds.</p>
        <p className="Instruction"> Grid will turn completely blank, try to flip all the former coloured cells.</p>
        <p className="Instruction"> Complete without mistake to proceed to the next level.</p>
        
        <Link to="/game" className="StartLink">
          Start Game
        </Link>
      </header>
    </div>
  );
}

export default Instructions;
