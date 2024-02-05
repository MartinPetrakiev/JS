import React from "react";

function SnakeHead({ x, y }) {
    return (
        <circle
            className="snake-item snake-head"
            cx={`${x + 1}rem`}
            cy={`${y + 1}rem`}
            r={"21px"}
        />
    );
}

export default SnakeHead;
