import React, { useCallback, useEffect, useState } from "react";
import Level from "./Levels/Level";
import { useGameObjects } from "../utils/customHooks";
import { INITIAL_GAME_SPEED, MOVE_DIRECTIONS } from "../utils/constants";
import { gameRun, moveSnake } from "../utils/gameLogic";
import { onKeyDown } from "../utils/utils";

function GameBoard({ gameControls, setGameControls }) {
    const { gameObjects, setGameObjects } = useGameObjects();
    const [speed, setSpeed] = useState(INITIAL_GAME_SPEED);
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

    return (
        <div>
            <div className="box">
                <span className="content">{gameControls.score}</span>
            </div>
            <svg className="game-board">
                <Level
                    {...gameObjects}
                    isPaused={gameControls.isPaused}
                    gameLevel={gameControls.gameLevel}
                    setGameObjects={setGameObjects}
                />
            </svg>
        </div>
    );
}

export default GameBoard;
