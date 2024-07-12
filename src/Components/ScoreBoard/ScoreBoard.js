import React from "react";
import styles from "./styles.module.css";

function ScoreBoard({ players, scores, specificGame }) {
  const games = specificGame ? [specificGame] : Object.keys(scores);

  return (
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
            {games.map((game) => (
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
  );
}

export default ScoreBoard;
