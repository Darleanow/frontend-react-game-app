import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

function RockPaperScissors({ players, scores, setScores }) {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const choices = ["rock", "paper", "scissors"];

  const handleClick = (choice) => {
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    setPlayerChoice(choice);
    setComputerChoice(computerChoice);
    setResult(calculateWinner(choice, computerChoice));
  };

  const calculateWinner = (player, computer) => {
    if (player === computer) return "Draw";
    if (
      (player === "rock" && computer === "scissors") ||
      (player === "paper" && computer === "rock") ||
      (player === "scissors" && computer === "paper")
    ) {
      return "Player 1 Wins";
    }
    return "Player 2 Wins";
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleWin = (result) => {
    let winnerName;
    if (result === "Player 1 Wins") {
      winnerName = players.player1;
    } else if (result === "Player 2 Wins") {
      winnerName = players.player2;
    }
    if (winnerName) {
      setScores((prevScores) => ({
        ...prevScores,
        RockPaperScissors: {
          ...prevScores.RockPaperScissors,
          [winnerName]: (prevScores.RockPaperScissors?.[winnerName] || 0) + 1,
        },
      }));
    }
  };

  const handleQuit = () => {
    navigate("/menu");
  };

  useEffect(() => {
    if (result) {
      handleWin(result);
    }
  }, [result, handleWin]);

  return (
    <div className={styles.container}>
      <h2>Rock Paper Scissors</h2>
      <div className={styles.choices}>
        {choices.map((choice) => (
          <button
            key={choice}
            className={styles.choiceButton}
            onClick={() => handleClick(choice)}
          >
            {choice}
          </button>
        ))}
      </div>
      {playerChoice && <div>Your choice: {playerChoice}</div>}
      {computerChoice && <div>Computer's choice: {computerChoice}</div>}
      {result && <div>{result}</div>}
      <button className={styles.quitButton} onClick={handleQuit}>
        Quit
      </button>
    </div>
  );
}

export default RockPaperScissors;
