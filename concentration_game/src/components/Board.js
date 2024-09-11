import React from "react";
import PropTypes from "prop-types"; 
import "./Board.css";

const Block = ({ block, index, isFlipped, isClickable, handleClick }) => {
  return (
    <div
      key={index}
      onClick={handleClick}
      style={{
        width: "50px",
        height: "50px",
        backgroundColor: isFlipped ? block.color : "#e0e0e0",
        border: "1px solid #000",
        cursor: isClickable ? "pointer" : "not-allowed",
        transition: "background-color 0.3s ease",
      }}
    />
  );
};

Block.propTypes = {
  block: PropTypes.shape({
    color: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  isFlipped: PropTypes.bool.isRequired,
  isClickable: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

const GameBoardGrid = ({
  blocks,
  flippedBlocks,
  isGameVisible,
  isGameOver,
  handleBlockClick,
}) => {
  const gridSize = Math.sqrt(blocks.length);
  return (
    <div
      className="game-board"
      style={{
        gridTemplateColumns: repeat(${gridSize}, 50px),
        gridTemplateRows: repeat(${gridSize}, 50px),
      }}
    >
      {blocks.map((block, index) => (
        <Block
          key={index}
          block={block}
          index={index}
          isFlipped={isGameVisible || flippedBlocks[index] || isGameOver}
          isClickable={!isGameVisible}
          handleClick={() => handleBlockClick(index)}
        />
      ))}
    </div>
  );
};

GameBoardGrid.propTypes = {
  blocks: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  flippedBlocks: PropTypes.arrayOf(PropTypes.bool).isRequired,
  isGameVisible: PropTypes.bool.isRequired,
  isGameOver: PropTypes.bool.isRequired,
  handleBlockClick: PropTypes.func.isRequired,
};

const GameBoard = ({
  blocks,
  flippedBlocks,
  isGameVisible,
  isGameOver,
  handleBlockClick,
}) => {
  return (
    <div className="game-board-container">
      <GameBoardGrid
        blocks={blocks}
        flippedBlocks={flippedBlocks}
        isGameVisible={isGameVisible}
        isGameOver={isGameOver}
        handleBlockClick={handleBlockClick}
      />
    </div>
  );
};

GameBoard.propTypes = {
  blocks: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  flippedBlocks: PropTypes.arrayOf(PropTypes.bool).isRequired,
  isGameVisible: PropTypes.bool.isRequired,
  isGameOver: PropTypes.bool.isRequired,
  handleBlockClick: PropTypes.func.isRequired,
};

export default GameBoard;
