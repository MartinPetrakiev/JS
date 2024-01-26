import React from "react";
import Snake from "../Snake/Snake";
import Food from "../Food";

function Level1({ foodDots, snakeDots }) {
  return (
    <svg className="game-board">
      <g>
        {foodDots.length > 0 &&
          foodDots.map(([x, y], index) => (
            <Food key={index + "f"} x={x} y={y} />
          ))}
        <Snake snakeDots={snakeDots} />
      </g>
    </svg>
  );
}

export default Level1;
