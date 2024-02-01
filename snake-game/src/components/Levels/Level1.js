import React from "react";
import Snake from "../Snake/Snake";
import Food from "../Food";

function Level1({ foodDots, snakeDots }) {
  return (
    <g>
      {foodDots.length > 0 &&
        foodDots.map(({ key, x, y}) => (
          <Food key={key} x={x} y={y} />
        ))}
      <Snake snakeDots={snakeDots} />
    </g>
  );
}

export default Level1;
