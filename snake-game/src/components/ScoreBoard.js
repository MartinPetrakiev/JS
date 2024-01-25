import React from "react";

function ScoreBoard({ gameHistory, score }) {
  return (
    <>
      <span className="content">Your points: {score}</span>
      {gameHistory.length > 0 && (
        <ul className="game-hitory">
          {gameHistory.length > 0 &&
            gameHistory.map((eachGame, index) => (
              <li key={index}>
                {index + 1}. Score: {eachGame.score} -{" "}
                {new Date(eachGame.timestamp).toLocaleString()}
              </li>
            ))}
        </ul>
      )}
    </>
  );
}

export default ScoreBoard;
