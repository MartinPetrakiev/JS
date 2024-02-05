import React from "react";
import BoardObjects from "./BoardObjects";
import { FoodObstacleProvider } from "../../ContextProviders";

function GameBoard({ gameControls, setGameControls }) {
    return (
        <div>
            <div className="box">
                <span className="content">{gameControls.score}</span>
            </div>
            <svg className="game-board">
                <FoodObstacleProvider>
                    <BoardObjects
                        gameControls={gameControls}
                        setGameControls={setGameControls}
                    />
                </FoodObstacleProvider>
            </svg>
        </div>
    );
}

export default GameBoard;
