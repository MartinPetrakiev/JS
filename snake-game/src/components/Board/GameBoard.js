import React from "react";
import BoardObjects from "./BoardObjects";
import { FoodObstacleProvider, useGameControls } from "../../ContextProviders";

function GameBoard() {
    const { gameControls } = useGameControls();
    return (
        <div>
            <div className="box">
                <span className="content">{gameControls.score}</span>
            </div>
            <svg className="game-board">
                <FoodObstacleProvider>
                    <BoardObjects />
                </FoodObstacleProvider>
            </svg>
        </div>
    );
}

export default GameBoard;
