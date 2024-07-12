import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import ScoreBoard from "../ScoreBoard/ScoreBoard";

function TicTacToe({ players, scores, setScores }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [scoreUpdated, setScoreUpdated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setWinner(calculateWinner(board));
  }, [board]);

  useEffect(() => {
    if (winner && !scoreUpdated) {
      const winnerName = winner === "X" ? players.player1 : players.player2;
      setScores((prevScores) => ({
        ...prevScores,
        TicTacToe: {
          ...prevScores.TicTacToe,
          [winnerName]: (prevScores.TicTacToe?.[winnerName] || 0) + 1,
        },
      }));
      setScoreUpdated(true); // Set the flag to true to prevent multiple updates
    }
  }, [winner, scoreUpdated, players.player1, players.player2, setScores]);

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const handleQuit = () => {
    navigate("/menu");
  };

  function calculateWinner(board) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  return (
    <div className={styles.container}>
      <h2>Tic Tac Toe</h2>
      <p>
        {winner
          ? `${winner} (Winner: ${
              winner === "X" ? players.player1 : players.player2
            })`
          : `Next player: ${isXNext ? players.player1 : players.player2}`}
      </p>
      <div className={styles.board}>
        {board.map((value, index) => (
          <button
            key={index}
            className={styles.cell}
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>
      <ScoreBoard players={players} scores={scores} specificGame="TicTacToe" />
      <button className={styles.quitButton} onClick={handleQuit}>
        Quit
      </button>
    </div>
  );
}

export default TicTacToe;
