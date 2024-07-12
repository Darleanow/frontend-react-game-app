import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./page.module.css";
import ScoreBoard from "../../Components/ScoreBoard/ScoreBoard";

function MenuPage({ players, scores }) {
  const [loadedPlayers, setLoadedPlayers] = useState(players);
  const navigate = useNavigate();

  useEffect(() => {
    if (!players.player1 || !players.player2) {
      const savedPlayers = localStorage.getItem("players");
      if (savedPlayers) {
        setLoadedPlayers(JSON.parse(savedPlayers));
      } else {
        navigate("/");
      }
    }
  }, [players, navigate]);

  const handleQuit = () => {
    navigate("/");
  };

  return (
    <>
      <h1 className={styles.main_title}>Main Menu</h1>
      <div>
        <h2 className={styles.select_game}>Select a Game</h2>
        <div className={styles.game_container}>
          <Link to="/tictactoe" className={styles.game}>
            Tic Tac Toe
          </Link>
          <Link to="/rockpaperscissors" className={styles.game}>
            Rock Paper Scissors
          </Link>
        </div>
      </div>
      <div>
        <h2 className={styles.score_summary}>Score Summary</h2>
        <ScoreBoard players={loadedPlayers} scores={scores} />
      </div>
      <button onClick={handleQuit} className={styles.quit_button}>
        Quit
      </button>
    </>
  );
}

export default MenuPage;
