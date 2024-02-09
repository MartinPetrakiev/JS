import React from "react";
import BoardObjects from "./BoardObjects";
import { FoodObstacleProvider, useGameControls } from "../../ContextProviders";
import { v4 as uuidv4 } from "uuid";

function GameBoard() {
    const { gameControls } = useGameControls();
    const initialFoodDots = [{ key: uuidv4(), x: 10, y: 10 }];

    return (
        <div>
            <div className="box">
                <span className="content" data-testid="score">
                    {gameControls.score}
                </span>
            </div>
            <svg className="game-board" viewBox="0 0 640 640">
                <FoodObstacleProvider
                    initialFoodDots={initialFoodDots}
                    initialObstacles={[]}
                >
                    <BoardObjects />
                </FoodObstacleProvider>
            </svg>
        </div>
    );
}

export default GameBoard;
