import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import MenuPage from "./Pages/MenuPage/MenuPage";
import TicTacToe from "./Components/TicTacToe/TicTacToe";
import RockPaperScissors from "./Components/RockPaperScissors/RockPaperScissors";
import "./App.css";

function App() {
  const [players, setPlayers] = useState(() => {
    const savedPlayers = localStorage.getItem("players");
    return savedPlayers
      ? JSON.parse(savedPlayers)
      : { player1: "", player2: "" };
  });

  const [scores, setScores] = useState(() => {
    const savedScores = localStorage.getItem("scores");
    return savedScores ? JSON.parse(savedScores) : {};
  });

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem("scores", JSON.stringify(scores));
  }, [scores]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage setPlayers={setPlayers} />} />
        <Route
          path="/menu"
          element={<MenuPage players={players} scores={scores} />}
        />
        <Route
          path="/tictactoe"
          element={
            <TicTacToe
              players={players}
              scores={scores}
              setScores={setScores}
            />
          }
        />
        <Route
          path="/rockpaperscissors"
          element={
            <RockPaperScissors
              players={players}
              scores={scores}
              setScores={setScores}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
