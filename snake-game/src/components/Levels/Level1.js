import React from "react";
import Snake from "../Snake";
import Food from "../Food";

function Level1({foodDots, snakeDots}) {
  return (
    <svg className="game-board">
      <g>
        {foodDots.length > 0 &&
          foodDots.map((foodDot, index) => (
            <Food key={index} foodDot={foodDot} />
          ))}
        <Snake snakeDots={snakeDots} />
      </g>
    </svg>
  );
}

export default Level1;
