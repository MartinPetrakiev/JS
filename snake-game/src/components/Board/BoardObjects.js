import React, { useCallback, useEffect, useState } from "react";
import Snake from "../Snake/Snake";
import FoodDots from "../Food/FoodDots";
import ObstacleDots from "../Obstacles/ObstacleDots";
import { useGameObjects } from "../../utils/customHooks";
import { INITIAL_GAME_SPEED, MOVE_DIRECTIONS } from "../../utils/constants";
import { onKeyDown } from "../../utils/utils";
import { gameRun, moveSnake } from "../../utils/gameLogic";

function BoardObjects({ gameControls, setGameControls }) {
    const { gameObjects, setGameObjects } = useGameObjects();
    const [speed, setSpeed] = useState(INITIAL_GAME_SPEED);
    const [moveDirection, setMoveDirection] = useState(MOVE_DIRECTIONS.RIGHT);
    const { alive: isAlive, isPaused, gameLevel, ...restOfGameControls } = gameControls;

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

        if (!isPaused) {
            run = setInterval(() => {
                moveSnake(
                    isAlive,
                    moveDirection,
                    gameObjects.snakeDots,
                    setGameObjects
                );

                gameRun(
                    {
                        gameObjects,
                        moveDirection,
                        speed,
                        gameControls: { alive: isAlive, isPaused, gameLevel, ...restOfGameControls }
                    },
                    {
                        setGameObjects,
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
        gameObjects,
        setGameObjects,
        moveDirection,
        speed,
        isPaused,
        isAlive,
        gameLevel,
        restOfGameControls,
        setGameControls,
    ]);

    return (
        <g>
            <FoodDots
                isPaused={isPaused}
                foodDots={gameObjects.foodDots}
                setGameObjects={setGameObjects}
            />
            <Snake snakeDots={gameObjects.snakeDots} />
            {gameLevel > 1 && (
                <ObstacleDots
                    gameLevel={gameLevel}
                    snakeDots={gameObjects.snakeDots}
                    foodDots={gameObjects.foodDots}
                    obstacles={gameObjects.obstacles}
                    setGameObjects={setGameObjects}
                />
            )}
        </g>
    );
}

export default BoardObjects;
