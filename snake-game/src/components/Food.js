import React from "react";

function Food(props) {
  return (
    <circle 
      className="food-item"
      cx={`${props.foodDot[1] + 1}rem`}
      cy={`${props.foodDot[0] + 1}rem`}
      r="1rem"
    />
  );
}

export default Food;
