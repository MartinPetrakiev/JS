import React from "react";

function SnakeTail({ snakeDot, snakeDotAdjacent }) {
  const [dotX, dotY] = snakeDot.map((x) => x * 16);
  const [adjDotX, adjDotY] = snakeDotAdjacent.map((x) => x * 16);

  const TRIANGLE_POINTS_UP = [
    { x: dotY, y: dotX },
    { x: dotY + 32, y: dotX },
    { x: dotY + 16, y: dotX + 32 },
  ];

  const TRIANGLE_POINTS_RIGHT = [
    { x: dotY + 32, y: dotX },
    { x: dotY + 32, y: dotX + 32 },
    { x: dotY, y: dotX + 16 },
  ];

  const TRIANGLE_POINTS_LEFT = [
    { x: dotY, y: dotX },
    { x: dotY, y: dotX + 32 },
    { x: dotY + 32, y: dotX + 16 },
  ];

  const TRIANGLE_POINTS_DOWN = [
    { x: dotY + 16, y: dotX },
    { x: dotY, y: dotX + 32 },
    { x: dotY + 32, y: dotX + 32 },
  ];

  let pointsString = "";

  if (adjDotX < dotX) {
    pointsString = TRIANGLE_POINTS_UP.map(({ x, y }) => `${x},${y}`).join(" ");
  } else if (adjDotX > dotX) {
    pointsString = TRIANGLE_POINTS_DOWN.map(({ x, y }) => `${x},${y}`).join(
      " ",
    );
  } else if (adjDotY < dotY) {
    pointsString = TRIANGLE_POINTS_LEFT.map(({ x, y }) => `${x},${y}`).join(
      " ",
    );
  } else if (adjDotY > dotY) {
    pointsString = TRIANGLE_POINTS_RIGHT.map(({ x, y }) => `${x},${y}`).join(
      " ",
    );
  }

  return <polygon className="snake-item snake-tail" points={pointsString} />;
}

export default SnakeTail;
