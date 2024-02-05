import React from "react";

function SnakeBodyItem({ snakeDot }) {
    return (
        <rect
            className="snake-item snake-body"
            x={`${snakeDot[1]}rem`}
            y={`${snakeDot[0]}rem`}
        />
    );
}

export default SnakeBodyItem;
