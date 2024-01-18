import React from "react";

function Food(props) {
  return (
    <div
      className="food-item"
      style={{ top: `${props.foodDot[0]}rem`, left: `${props.foodDot[1]}rem` }}
    />
  );
}

export default Food;
