import React from "react";
import { buildSnakeTailPoints } from "../../utils/utils";

function SnakeTail({ snakeDot, snakeDotAdjacent }) {
    return <polygon className="snake-item snake-tail" points={buildSnakeTailPoints(snakeDot, snakeDotAdjacent)} />;
}

export default SnakeTail;
