import React, { useEffect, useState } from "react";
import ObstacleItem from "./ObstacleItem";
import { generateRandomObstacle } from "../../utils/gameLogic";
import { LEVEL_2, LEVEL_3 } from "../../utils/constants";

function ObstacleDots({ gameLevel, obstacles, setObstacles }) {
    useEffect(() => {
        const numberOfObstacles = gameLevel > 2 ? LEVEL_3 : LEVEL_2;

        setObstacles((prevState) => {
            return {
                ...prevState,
                obstacles: Array.from({ length: numberOfObstacles }, () =>
                    generateRandomObstacle(
                        [],
                    )
                ),
            };
        });
    }, [gameLevel, setObstacles]);

    return (
        <g>
            {obstacles.map(([x, y], index) => (
                <ObstacleItem key={index} x={x} y={y} />
            ))}
        </g>
    );
}

export default React.memo(ObstacleDots);
