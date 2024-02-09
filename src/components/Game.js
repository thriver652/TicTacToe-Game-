import React, { useState, useEffect } from "react";
import axios from "axios";
import GameBoard from "./Gameboard";

const Game = () => {
  // Game state variables
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);

  // Function to handle a player's move on the board
  const handlePlayerMove = (index) => {
    if (!squares[index] && !winner) {
      const newSquares = [...squares];
      newSquares[index] = player;

      setSquares(newSquares);
      checkWinner(newSquares);
      setPlayer(player === "X" ? "O" : "X"); // Switch to the next player
    }
  };

  // Function to check for a winner after each move
  const checkWinner = (squares) => {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const line of winningLines) {
      const [a, b, c] = line;

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        setWinner(squares[a]);
        setWinningLine(line);
        return;
      }
    }

    if (!squares.includes(null)) {
      setWinner("Tie"); // If there are no empty squares, declare  tie
    }
  };

  // Effect to handle computer's move when it's O's turn
  useEffect(() => {
    if (player === "O" && !winner) {
      axios
        .post("https://hiring-react-assignment.vercel.app/api/bot", squares)
        .then((response) => {
          const computerMove = response.data;

          if (!squares[computerMove]) {
            handlePlayerMove(computerMove);
          }
        })
        .catch((error) => console.error("API error:", error));
    }
  }, [player, squares, winner]);

  return (
    <div className="game">
      <h1>TicTacToe Game</h1>
      {/* Render the game board component */}
      <GameBoard
        squares={squares}
        onClick={handlePlayerMove}
        winningLine={winningLine}
      />
      {/* Display the winner or else Tie */}
      {winner && <div className="winner">Winner: {winner}</div>}
    </div>
  );
};

export default Game;
