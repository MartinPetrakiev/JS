import React, { useEffect } from "react";
import ObstacleItem from "./ObstacleItem";
import { generateRandomObstacle } from "../../utils/gameLogic";
import { LEVEL_2, LEVEL_3 } from "../../utils/constants";

function ObstacleDots({ gameLevel, obstacles, setGameObjects }) {
    useEffect(() => {
        const numberOfObstacles = gameLevel > 2 ? LEVEL_3 : LEVEL_2;

        setGameObjects((prevState) => {
            return {
                ...prevState,
                obstacles: Array.from({ length: numberOfObstacles }, () =>
                    generateRandomObstacle(
                        prevState.foodDots,
                        prevState.snakeDots
                    )
                ),
            };
        });
    }, [gameLevel, setGameObjects]);

    return (
        <g>
            {obstacles.map(([x, y], index) => (
                <ObstacleItem key={index} x={x} y={y} />
            ))}
        </g>
    );
}

export default ObstacleDots;
