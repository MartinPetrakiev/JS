import React from "react";
import SnakeTail from "./SnakeTail";
import SnakeHead from "./SnakeHead";

function Snake({ snakeDots }) {
  return (
    <>
      {snakeDots?.map((snakeDot, index, allDots) => {
        if (index === 0) {
          return (
            <SnakeTail
              key={index}
              snakeDot={snakeDot}
              snakeDotAdjacent={allDots[1]}
            />
          );
        } else if (index === snakeDots.length - 1) {
          return <SnakeHead key={index} x={snakeDot[1]} y={snakeDot[0]} />;
        } else {
          return (
            <rect
              className="snake-item snake-body"
              key={index}
              x={`${snakeDot[1]}rem`}
              y={`${snakeDot[0]}rem`}
            />
          );
        }
      })}
    </>
  );
}

export default Snake;
