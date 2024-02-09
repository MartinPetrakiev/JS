import React from "react";
import { getRandomInt } from "../../utils/utils";
import { RAINBOW_COLORS } from "../../utils/constants";

function SnakeBodyItem({ snakeDot }) {
    return (
        <rect
            className="snake-item snake-body"
            x={`${snakeDot[1]}rem`}
            y={`${snakeDot[0]}rem`}
            fill={RAINBOW_COLORS[getRandomInt(0, RAINBOW_COLORS.length - 1)]}
        />
    );
}

export default SnakeBodyItem;
