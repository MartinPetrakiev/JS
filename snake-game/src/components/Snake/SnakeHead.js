import React from "react";

function SnakeHead({ index, lastDotIndex, x, y }) {
    if (index === lastDotIndex) {
        return (
            <circle
                className="snake-item snake-head"
                cx={`${x + 1}rem`}
                cy={`${y + 1}rem`}
                r={"21px"}
            />
        );
    }

    return null;
}

export default SnakeHead;
