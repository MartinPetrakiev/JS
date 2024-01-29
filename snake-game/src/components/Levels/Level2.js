import React, { useEffect } from "react";
import Snake from "../Snake/Snake";
import Food from "../Food";
import Obstacle from "../Obstacle";
import { generateRandomObstacle } from "../../utils/gameLogic";
import { v4 as uuidv4 } from 'uuid';

function Level2({ foodDots, snakeDots, obstacles, gameLevel, setObstacles }) {
  useEffect(() => {
    const numberOfObstacles = gameLevel > 2 ? 15 : 8;

    const newObstacles = Array.from({ length: numberOfObstacles }, () =>
      generateRandomObstacle(snakeDots, foodDots)
    );

    setObstacles(newObstacles);
  }, []);

  return (
    <g>
      {foodDots.length > 0 &&
        foodDots.map(([x, y]) => <Food key={uuidv4()} x={x} y={y} />)}
      <Snake snakeDots={snakeDots} />
      <g>
        {obstacles.map(([x, y]) => (
          <Obstacle key={uuidv4()} x={x} y={y} />
        ))}
      </g>
    </g>
  );
}

export default Level2;
