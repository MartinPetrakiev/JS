import React from "react";
import Level1 from "./Levels/Level1";
import Level2 from "./Levels/Level2";

function GameBoard({ foodDots, snakeDots, obstacles, gameLevel, setObstacles }) {
  return (
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
  );
}

export default GameBoard;
