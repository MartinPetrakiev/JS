import React from "react";
import Snake from "../Snake/Snake";
import Food from "../Food";
import { v4 as uuidv4 } from 'uuid';

function Level1({ foodDots, snakeDots }) {
  return (
    <g>
      {foodDots.length > 0 &&
        foodDots.map(([x, y]) => <Food key={uuidv4()} x={x} y={y} />)}
      <Snake snakeDots={snakeDots} />
    </g>
  );
}

export default Level1;
