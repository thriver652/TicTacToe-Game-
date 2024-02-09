import React from "react";
import Square from "./Square";

const GameBoard = ({ squares, onClick, winningLine }) => (
  <div className="board">
    {squares.map((value, index) => (
      <Square
        key={index}
        value={value}
        onClick={() => onClick(index)}
        highlight={winningLine.includes(index)}
      />
    ))}
  </div>
);

export default GameBoard;
