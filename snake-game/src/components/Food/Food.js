import React from "react";
import FoodItem from "./FoodItem";

function Food({ x, y, disco }) {
    return (
        <svg
            className="food-item"
            viewBox={disco ? "0 0 11100 11100" : "0 0 1110 1110"}
            x={`${x}rem`}
            y={`${y}rem`}
        >
            <FoodItem disco={disco} />
        </svg>
    );
}

export default Food;
