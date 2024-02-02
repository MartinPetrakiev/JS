import React from "react";
import { buildSnakeTailPoints } from "../../utils/utils";

function SnakeTail({ index, snakeDot, snakeDotAdjacent }) {
    if (index === 0) {
        return (
            <polygon
                className="snake-item snake-tail"
                points={buildSnakeTailPoints(snakeDot, snakeDotAdjacent)}
            />
        );
    }

    return null;
}

export default SnakeTail;
