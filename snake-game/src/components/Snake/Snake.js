import React, { useEffect, useState } from "react";
import SnakeTail from "./SnakeTail";
import SnakeHead from "./SnakeHead";
import SnakeBodyItem from "./SnakeBodyItem";
import {
    GAME_OBJECT_TYPES,
    INITIAL_GAME_SPEED,
    INITIAL_SNAKE_DOTS,
    MOVE_DIRECTIONS,
} from "../../utils/constants";
import { checkSnakeOverlap, gameRun, moveSnake } from "../../utils/gameLogic";
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

    const { alive: isAlive, isPaused, discoMode } = gameControls;

    useHandleKeyDown(
        onKeyDown,
        isPaused,
        moveDirection,
        setMoveDirection,
        setGameControls
    );
    useHandleTouchStart(isPaused, moveDirection, setMoveDirection);
    useHandleDoubleTap(isPaused, setGameControls);

    useEffect(() => {
        let run;

        if (!isPaused && isAlive) {
            run = setInterval(() => {
                moveSnake(moveDirection, snakeDots, setSnakeDots);

                let overlappingObject = null;

                do {
                    overlappingObject = checkSnakeOverlap(
                        snakeDots,
                        foodDots,
                        obstacles
                    );

                    if (overlappingObject) {
                        switch (overlappingObject) {
                            case GAME_OBJECT_TYPES.OBSTACLE:
                                generateObstacles(
                                    gameControls.gameLevel,
                                    foodDots,
                                    setObstacles
                                );
                                break;
                            case GAME_OBJECT_TYPES.FOOD:
                                generateFoodDots(
                                    gameControls.isPaused,
                                    setFoodDots,
                                    obstacles
                                );
                                break;
                            default:
                                break;
                        }
                    }

                    overlappingObject = "";
                } while (overlappingObject);

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
                        setObstacles,
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
                        <SnakeBodyItem
                            snakeDot={snakeDot}
                            discoMode={discoMode}
                        />
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
