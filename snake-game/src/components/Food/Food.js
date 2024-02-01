import React from "react";
import FoodItem from "./FoodItem";

function Food({x, y}) {
  return (
    <svg
      className="food-item"
      viewBox="0 0 1110 1110"
      x={`${x}rem`}
      y={`${y}rem`}
    >
      <FoodItem />
    </svg>
  );
}

export default Food;
