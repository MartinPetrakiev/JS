import React, { useCallback, useEffect, useState } from "react";
import Level1 from "./Levels/Level1";
import Level2 from "./Levels/Level2";
import { useGameObjects } from "../utils/customHooks";
import { MOVE_DIRECTIONS } from "../utils/constants";
import { advanceGameLevel, gameRun, getRandomCoordinates, moveSnake } from "../utils/gameLogic";
import { onKeyDown } from "../utils/utils";
import { v4 as uuidv4 } from "uuid";

function GameBoard({ gameControls, setGameControls}) {
    const { gameObjects, setGameObjects } = useGameObjects();
    const [speed, setSpeed] = useState(240);
    const [moveDirection, setMoveDirection] = useState(MOVE_DIRECTIONS.RIGHT);

    const handleKeyDown = useCallback(
        (e) => {
            onKeyDown(
                e,
                gameControls.isPaused,
                setMoveDirection,
                setGameControls
            );
        },
        [gameControls.isPaused, setGameControls]
    );

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    useEffect(() => {
        let run;

        if (!gameControls.isPaused) {
            run = setInterval(() => {
                moveSnake(
                    gameControls.alive,
                    moveDirection,
                    gameObjects.snakeDots,
                    setGameObjects
                );

                gameRun(
                    {
                        gameObjects,
                        moveDirection,
                        speed,
                        gameControls,
                    },
                    {
                        setGameObjects,
                        setMoveDirection,
                        setSpeed,
                        setGameControls,
                    }
                );

                advanceGameLevel(gameControls, setGameControls);
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
        gameControls,
        setGameControls,
    ]);

    useEffect(() => {
        const foodDotGenerate = setTimeout(() => {
            if (!gameControls.isPaused) {
                setGameObjects((prev) => {
                    const [randomX, randomY] = getRandomCoordinates(
                        gameObjects.snakeDots,
                        prev.foodDots,
                        gameObjects.obstacles
                    );
                    return {
                        ...prev,
                        foodDots: [
                            ...prev.foodDots,
                            {
                                key: uuidv4(),
                                x: randomX,
                                y: randomY,
                            },
                        ],
                    };
                });
            }
        }, 5000);

        return () => {
            clearTimeout(foodDotGenerate);
        };
    }, [
        gameControls.isPaused,
        gameObjects.foodDots,
        gameObjects.obstacles,
        setGameObjects,
    ]);

    useEffect(() => {
        if (!gameControls.isPaused && gameObjects.foodDots.length > 6) {
            setGameObjects((prev) => {
                return {
                    ...prev,
                    foodDots: [...prev.foodDots.slice(prev.length - 2)],
                };
            });
        }
    }, [gameControls.isPaused, gameObjects.foodDots.length, setGameObjects]);

    return (
        <div>
            <div className="box">
                <span className="content">{gameControls.score}</span>
            </div>
            <svg className="game-board">
                {gameControls.gameLevel > 1 ? (
                    <Level2 {...gameObjects} setGameObjects={setGameObjects} />
                ) : (
                    <Level1
                        foodDots={gameObjects.foodDots}
                        snakeDots={gameObjects.snakeDots}
                    />
                )}
            </svg>
        </div>
    );
}

export default GameBoard;
