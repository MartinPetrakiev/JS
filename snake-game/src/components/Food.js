import React from "react";
import FoodItem from "./FoodItem";

function Food(props) {
  return (
    <svg
      className="food-item"
      viewBox="0 0 1110 1110"
      x={`${props?.foodDot[1]}rem`}
      y={`${props?.foodDot[0]}rem`}
    >
      <FoodItem />
    </svg>
  );
}

export default Food;
