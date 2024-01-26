import React from "react";

function SnakeTail({ snakeDot, snakeDotAdjacent }) {
  const [row, col] = snakeDot.map((x) => x * 16);
  const [rowAdj, colAdj] = snakeDotAdjacent.map((x) => x * 16);

  const TRIANGLE_POINTS_UP = [
    { x: col, y: row },
    { x: col + 32, y: row },
    { x: col + 16, y: row + 32 },
  ];

  const TRIANGLE_POINTS_RIGHT = [
    { x: col + 32, y: row },
    { x: col + 32, y: row + 32 },
    { x: col, y: row + 16 },
  ];

  const TRIANGLE_POINTS_LEFT = [
    { x: col, y: row },
    { x: col, y: row + 32 },
    { x: col + 32, y: row + 16 },
  ];

  const TRIANGLE_POINTS_DOWN = [
    { x: col + 16, y: row },
    { x: col, y: row + 32 },
    { x: col + 32, y: row + 32 },
  ];

  let pointsString = "";

  if (rowAdj < row) {
    pointsString = TRIANGLE_POINTS_UP.map(({ x, y }) => `${x},${y}`).join(" ");
  } else if (rowAdj > row) {
    pointsString = TRIANGLE_POINTS_DOWN.map(({ x, y }) => `${x},${y}`).join(
      " ",
    );
  } else if (colAdj < col) {
    pointsString = TRIANGLE_POINTS_LEFT.map(({ x, y }) => `${x},${y}`).join(
      " ",
    );
  } else if (colAdj > col) {
    pointsString = TRIANGLE_POINTS_RIGHT.map(({ x, y }) => `${x},${y}`).join(
      " ",
    );
  }

  return <polygon className="snake-item snake-tail" points={pointsString} />;
}

export default SnakeTail;
