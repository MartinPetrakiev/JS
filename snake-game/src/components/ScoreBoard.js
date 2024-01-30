import React, { useState } from "react";

function ScoreBoard({ gameHistory, score }) {
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  const sortedGameHistory = gameHistory.slice().sort((a, b) => {
    if (sortBy === "score") {
      return sortOrder === "asc" ? a.score - b.score : b.score - a.score;
    } else if (sortBy === "timestamp") {
      return sortOrder === "asc"
        ? a.timestamp - b.timestamp
        : b.timestamp - a.timestamp;
    } else if (sortBy === "player") {
      return sortOrder === "asc"
        ? a.playerName.localeCompare(b.playerName)
        : b.playerName.localeCompare(a.playerName);
    }
    return 0;
  });

  return (
    <>
      <span className="content">Your points: {score}</span>
      <div className="game-history">
        {gameHistory.length > 0 && (
          <table>
            <thead>
              <tr>
                <th onClick={() => handleSort("player")}>Player</th>
                <th onClick={() => handleSort("score")}>Score</th>
                <th onClick={() => handleSort("timestamp")}>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {sortedGameHistory.map((eachGame, index) => (
                <tr key={index}>
                  <td>{eachGame.playerName}</td>
                  <td>{eachGame.score}</td>
                  <td>{new Date(eachGame.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default ScoreBoard;
