import React from "react";
import Level1 from "./Levels/Level1";
import Level2 from "./Levels/Level2";

function GameBoard({
  score,
  foodDots,
  snakeDots,
  obstacles,
  gameLevel,
  setObstacles,
}) {
  return (
    <div>
      <div className="box">
        <span className="content">{score}</span>
      </div>
      <svg className="game-board">
        {gameLevel > 1 ? (
          <Level2
            foodDots={foodDots}
            snakeDots={snakeDots}
            obstacles={obstacles}
            setObstacles={setObstacles}
          />
        ) : (
          <Level1 foodDots={foodDots} snakeDots={snakeDots} />
        )}
      </svg>
    </div>
  );
}

export default GameBoard;
