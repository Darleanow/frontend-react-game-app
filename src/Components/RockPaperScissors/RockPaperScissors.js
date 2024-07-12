import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import ScoreBoard from "../ScoreBoard/ScoreBoard";

function RockPaperScissors({ players, scores, setScores }) {
  const [player1Choice, setPlayer1Choice] = useState(null);
  const [player2Choice, setPlayer2Choice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const choices = ["rock", "paper", "scissors"];

  const handleClick = (player, choice) => {
    if (player === 1) {
      setPlayer1Choice(choice);
    } else {
      setPlayer2Choice(choice);
    }
  };

  const calculateWinner = (player1, player2, computer) => {
    const results = {};
    results.player1 = determineWinner(player1, computer);
    results.player2 = determineWinner(player2, computer);
    return results;
  };

  const determineWinner = (player, computer) => {
    if (player === computer) return "Draw";
    if (
      (player === "rock" && computer === "scissors") ||
      (player === "paper" && computer === "rock") ||
      (player === "scissors" && computer === "paper")
    ) {
      return "Win";
    }
    return "Lose";
  };

  const handleWin = useCallback((results) => {
    if (results.player1 === "Win") {
      setScores((prevScores) => ({
        ...prevScores,
        RockPaperScissors: {
          ...prevScores.RockPaperScissors,
          [players.player1]:
            (prevScores.RockPaperScissors?.[players.player1] || 0) + 1,
        },
      }));
    }
    if (results.player2 === "Win") {
      setScores((prevScores) => ({
        ...prevScores,
        RockPaperScissors: {
          ...prevScores.RockPaperScissors,
          [players.player2]:
            (prevScores.RockPaperScissors?.[players.player2] || 0) + 1,
        },
      }));
    }
  }, [players, setScores]);

  const handleRevealResult = () => {
    if (player1Choice && player2Choice) {
      const computerChoice = choices[Math.floor(Math.random() * 3)];
      setComputerChoice(computerChoice);
      const gameResult = calculateWinner(player1Choice, player2Choice, computerChoice);
      setResult(gameResult);
      handleWin(gameResult);
    }
  };

  const handleQuit = () => {
    navigate("/menu");
  };

  useEffect(() => {
    if (result) {
      const timeout = setTimeout(() => {
        setPlayer1Choice(null);
        setPlayer2Choice(null);
        setComputerChoice(null);
        setResult(null);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [result]);

  return (
    <div className={styles.container}>
      <h2>Rock Paper Scissors</h2>
      <div className={styles.choices}>
        <div>
          <h3>{players.player1}'s turn</h3>
          {choices.map((choice) => (
            <button
              key={choice}
              className={styles.choiceButton}
              onClick={() => handleClick(1, choice)}
              disabled={!!result}
            >
              {choice}
            </button>
          ))}
          {player1Choice && <div>Your choice: {player1Choice}</div>}
        </div>
        <div>
          <h3>{players.player2}'s turn</h3>
          {choices.map((choice) => (
            <button
              key={choice}
              className={styles.choiceButton}
              onClick={() => handleClick(2, choice)}
              disabled={!!result}
            >
              {choice}
            </button>
          ))}
          {player2Choice && <div>Your choice: {player2Choice}</div>}
        </div>
      </div>
      {player1Choice && player2Choice && !result && (
        <button className={styles.revealButton} onClick={handleRevealResult}>
          Reveal Result
        </button>
      )}
      {computerChoice && <div>Computer's choice: {computerChoice}</div>}
      {result && (
        <div>
          <div>
            {players.player1}{" "}
            {result.player1 === "Win"
              ? "wins"
              : result.player1 === "Lose"
              ? "loses"
              : "draws"}
          </div>
          <div>
            {players.player2}{" "}
            {result.player2 === "Win"
              ? "wins"
              : result.player2 === "Lose"
              ? "loses"
              : "draws"}
          </div>
        </div>
      )}
      <ScoreBoard
        players={players}
        scores={scores}
        specificGame="RockPaperScissors"
      />
      <button className={styles.quitButton} onClick={handleQuit}>
        Quit
      </button>
    </div>
  );
}

export default RockPaperScissors;
