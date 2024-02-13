import React, { useEffect, useState } from "react";
import SnakeTail from "./SnakeTail";
import SnakeHead from "./SnakeHead";
import SnakeBodyItem from "./SnakeBodyItem";
import {
    INITIAL_GAME_SPEED,
    INITIAL_SNAKE_DOTS,
    MOVE_DIRECTIONS,
} from "../../utils/constants";
import { checkOverlap, gameRun, moveSnake } from "../../utils/gameLogic";
import {
    generateFoodDots,
    generateObstacles,
    onKeyDown,
    useHandleDoubleTap,
    useHandleKeyDown,
    useHandleTouchStart,
} from "../../utils/utils";
import {
    useFoodContext,
    useGameControls,
    useObstacleContext,
} from "../../ContextProviders";

function Snake() {
    const { gameControls, setGameControls } = useGameControls();
    const { foodDots, setFoodDots } = useFoodContext();
    const { obstacles, setObstacles } = useObstacleContext();
    const [snakeDots, setSnakeDots] = useState(INITIAL_SNAKE_DOTS);
    const [speed, setSpeed] = useState(INITIAL_GAME_SPEED);
    const [moveDirection, setMoveDirection] = useState(MOVE_DIRECTIONS.RIGHT);

    const { alive: isAlive, isPaused } = gameControls;

    useHandleKeyDown(onKeyDown, isPaused, setMoveDirection, setGameControls);
    useHandleTouchStart(isPaused, setMoveDirection);
    useHandleDoubleTap(isPaused, setGameControls);

    useEffect(() => {
        let run;

        if (!isPaused && isAlive) {
            run = setInterval(() => {
                let snakeOverlapsWithFoodDot = snakeDots.some((dot) =>
                    checkOverlap(dot, foodDots)
                );

                let snakeOverlapsWithObstacle = snakeDots.some((dot) =>
                    checkOverlap(dot, null, obstacles)
                );

                if (snakeOverlapsWithFoodDot) {
                    generateFoodDots(isPaused, setFoodDots, obstacles);
                }

                if (snakeOverlapsWithObstacle) {
                    const newObstacles = generateObstacles(gameControls.gameLevel, foodDots);
                    setObstacles(newObstacles);
                }

                moveSnake(moveDirection, snakeDots, setSnakeDots);

                gameRun(
                    {
                        snakeDots,
                        foodDots,
                        obstacles,
                        moveDirection,
                        speed,
                        gameControls,
                    },
                    {
                        setSnakeDots,
                        setFoodDots,
                        setMoveDirection,
                        setSpeed,
                        setGameControls,
                    }
                );
            }, speed);
        }

        return () => {
            clearInterval(run);
        };
    }, [
        snakeDots,
        foodDots,
        obstacles,
        setObstacles,
        moveDirection,
        speed,
        isAlive,
        isPaused,
        setFoodDots,
        gameControls,
        setGameControls,
    ]);

    return (
        <>
            {snakeDots?.map((snakeDot, index, allDots) => (
                <React.Fragment key={index}>
                    {index === 0 && (
                        <SnakeTail
                            snakeDot={snakeDot}
                            snakeDotAdjacent={allDots[1]}
                        />
                    )}
                    {index !== 0 && index !== allDots.length - 1 && (
                        <SnakeBodyItem snakeDot={snakeDot} />
                    )}
                    {index === allDots.length - 1 && (
                        <SnakeHead x={snakeDot[1]} y={snakeDot[0]} />
                    )}
                </React.Fragment>
            ))}
        </>
    );
}

export default React.memo(Snake);
