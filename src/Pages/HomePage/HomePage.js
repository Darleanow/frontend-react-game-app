import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./page.module.css";

function HomePage({ setPlayers }) {
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (player1Name === player2Name) {
      setErrorMessage("Usernames can't be the same");
      return;
    }

    if (player1Name && player2Name) {
      setPlayers({ player1: player1Name, player2: player2Name });
      navigate("/menu");
    } else {
      setErrorMessage("Both player names are required.");
    }
  };

  return (
    <div>
      <h1 className={styles.welcome_title}>Welcome to our game application!</h1>
      <div className={styles.input_container}>
        <input
          type="text"
          placeholder="Player 1 Name"
          value={player1Name}
          onChange={(e) => setPlayer1Name(e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Player 2 Name"
          value={player2Name}
          onChange={(e) => setPlayer2Name(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleSubmit} className={styles.button_start}>
          Start
        </button>
      </div>
      {errorMessage && <p className={styles.error_message}>{errorMessage}</p>}
    </div>
  );
}

export default HomePage;
