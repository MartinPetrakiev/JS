import React from "react";
import { OBSTACLE_SIZE } from "../utils/constants";


function Obstacle({ x, y }) {
  return (
    <rect
      className="obstacle"
      x={`${x * OBSTACLE_SIZE}rem`}
      y={`${y * OBSTACLE_SIZE}rem`}
    />
  );
}

export default Obstacle;
