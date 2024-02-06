import React, { useCallback, useEffect, useState } from "react";
import SnakeTail from "./SnakeTail";
import SnakeHead from "./SnakeHead";
import SnakeBodyItem from "./SnakeBodyItem";
import {
    INITIAL_GAME_SPEED,
    INITIAL_SNAKE_DOTS,
    MOVE_DIRECTIONS,
} from "../../utils/constants";
import { gameRun, moveSnake } from "../../utils/gameLogic";
import { onKeyDown } from "../../utils/utils";
import { useFoodObstacles, useGameControls } from "../../ContextProviders";

function Snake() {
    const { gameControls, setGameControls } = useGameControls();
    const { foodDots,  setFoodDots, obstacles } = useFoodObstacles();
    const [snakeDots, setSnakeDots] = useState(INITIAL_SNAKE_DOTS);
    const [speed, setSpeed] = useState(INITIAL_GAME_SPEED);
    const [moveDirection, setMoveDirection] = useState(MOVE_DIRECTIONS.RIGHT);

    const { alive: isAlive, isPaused } = gameControls;

    const handleKeyDown = useCallback(
        (e) => {
            onKeyDown(e, isPaused, setMoveDirection, setGameControls);
        },
        [isPaused, setGameControls]
    );

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    useEffect(() => {
        let run;

        if (!isPaused && isAlive) {
            run = setInterval(() => {
                moveSnake(
                    moveDirection,
                    snakeDots,
                    setSnakeDots
                );

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
