import React, { useEffect, useRef } from "react";
import ObstacleItem from "./ObstacleItem";
import { generateRandomObstacle } from "../../utils/gameLogic";
import { LEVEL_2, LEVEL_3 } from "../../utils/constants";
import { useFoodObstacles, useGameControls } from "../../ContextProviders";

function ObstacleDots() {
    const { foodDots, obstacles, setObstacles } = useFoodObstacles();
    const { gameControls } = useGameControls();
    const { gameLevel } = gameControls;

    const foodDotsRef = useRef(foodDots);

    useEffect(() => {
        foodDotsRef.current = foodDots;
    }, [foodDots]);

    useEffect(() => {
        const numberOfObstacles = gameLevel > 2 ? LEVEL_3 : LEVEL_2;

        const newObstacles = Array.from({ length: numberOfObstacles }, () =>
            generateRandomObstacle(foodDotsRef.current)
        );

        setObstacles(newObstacles);
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
