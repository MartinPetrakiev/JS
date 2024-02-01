import React from "react";
import SnakeTail from "./SnakeTail";
import SnakeHead from "./SnakeHead";
import SnakeBodyItem from "./SnakeBodyItem";

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
          return <SnakeBodyItem key={index} snakeDot={snakeDot} />;
        }
      })}
    </>
  );
}

export default Snake;
