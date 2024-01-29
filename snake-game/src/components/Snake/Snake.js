import React from "react";
import SnakeTail from "./SnakeTail";
import SnakeHead from "./SnakeHead";
import SnakeBodyItem from "./SnakeBodyItem";
import { v4 as uuidv4 } from "uuid";

function Snake({ snakeDots }) {
  return (
    <>
      {snakeDots?.map((snakeDot, index, allDots) => {
        if (index === 0) {
          return (
            <SnakeTail
              key={uuidv4()}
              snakeDot={snakeDot}
              snakeDotAdjacent={allDots[1]}
            />
          );
        } else if (index === snakeDots.length - 1) {
          return <SnakeHead key={uuidv4()} x={snakeDot[1]} y={snakeDot[0]} />;
        } else {
          return <SnakeBodyItem key={uuidv4()} snakeDot={snakeDot} />;
        }
      })}
    </>
  );
}

export default Snake;
