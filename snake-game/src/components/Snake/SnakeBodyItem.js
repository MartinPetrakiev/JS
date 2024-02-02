import React from "react";

function SnakeBodyItem({ index, lastDotIndex, snakeDot }) {
  if (index !== 0 && index !== lastDotIndex) {
    return (
      <rect
        className="snake-item snake-body"
        x={`${snakeDot[1]}rem`}
        y={`${snakeDot[0]}rem`}
      />
    );
  }

  return null;
}

export default SnakeBodyItem;
