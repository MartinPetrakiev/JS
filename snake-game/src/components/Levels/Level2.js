import React, { useMemo } from "react";
import Snake from "../Snake";
import Food from "../Food";
import { OBSTACLE_SIZE } from "../../constants";
import { generateRandomCoordinates } from "../../utils";

function Level2({ foodDots, snakeDots, obstacles }) {
  return (
    <svg className="game-board">
      <g>
        {foodDots.length > 0 &&
          foodDots.map((foodDot, index) => (
            <Food key={index} foodDot={foodDot} />
          ))}
        <Snake snakeDots={snakeDots} />
        {obstacles.map((obstacle, index) => (
          <rect
            key={index}
            className="obstacle"
            x={`${obstacle[0] * OBSTACLE_SIZE}rem`}
            y={`${obstacle[1] * OBSTACLE_SIZE}rem`}
            width={`${OBSTACLE_SIZE}rem`}
            height={`${OBSTACLE_SIZE}rem`}
          />
        ))}
      </g>
    </svg>
  );
}

export default Level2;
/* <g>
        {foodDots.length > 0 &&
          foodDots.map((foodDot, index) => (
            <Food key={index} foodDot={foodDot} />
          ))}
        <Snake snakeDots={snakeDots} />
      </g> */
