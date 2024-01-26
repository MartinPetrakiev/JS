import React, { useEffect, useMemo } from "react";
import Snake from "../Snake/Snake";
import Food from "../Food";
import Obstacle from "../Obstacle";
import { generateRandomObstacle } from "../../utils/gameLogic";

function Level2({ foodDots, snakeDots, obstacles, gameLevel, setObstacles }) {
  useEffect(() => {
    const numberOfObstacles = gameLevel > 2 ? 15 : 8;

    const newObstacles = Array.from({ length: numberOfObstacles }, (_, index) =>
      generateRandomObstacle(snakeDots, foodDots)
    );

    setObstacles(newObstacles);
  }, []);

  return (
    <svg className="game-board">
      <g>
        {foodDots.length > 0 &&
          foodDots.map(([x, y], index) => (
            <Food key={index + "f"} x={x} y={y} />
          ))}
        <Snake snakeDots={snakeDots} />
        <g>
          {obstacles.map(([x, y], index) => (
            <Obstacle key={index + "o"} x={x} y={y} />
          ))}
        </g>
      </g>
    </svg>
  );
}

export default Level2;
