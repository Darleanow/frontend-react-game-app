import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./page.module.css";

function MenuPage({ players, scores }) {
  const navigate = useNavigate();

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
        <div className={styles.score_container}>
          <div className={styles.score_card}>
            <table className={styles.score_table}>
              <thead>
                <tr>
                  <th>Game</th>
                  <th>{players.player1}</th>
                  <th>{players.player2}</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(scores).map((game) => (
                  <tr key={game}>
                    <td>{game}</td>
                    <td>{scores[game]?.[players.player1] || 0}</td>
                    <td>{scores[game]?.[players.player2] || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <button onClick={handleQuit} className={styles.quit_button}>
        Quit
      </button>
    </>
  );
}

export default MenuPage;
