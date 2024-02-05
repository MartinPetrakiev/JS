import React, { useContext } from "react";
import Snake from "../Snake/Snake";
import FoodDots from "../Food/FoodDots";
import ObstacleDots from "../Obstacles/ObstacleDots";
import { FoodObstaclesContext } from "../../ContextProviders";

function BoardObjects({ gameControls, setGameControls }) {
    const { foodDots, setFoodDots, obstacles, setObstacles } = useContext(FoodObstaclesContext);

    return (
        <g>
            <FoodDots
                isPaused={gameControls.isPaused}
                foodDots={foodDots || []}
                setFoodDots={setFoodDots}
            />
            <Snake
                foodDots={foodDots}
                setFoodDots={setFoodDots}
                obstacles={obstacles}
                gameControls={gameControls}
                setGameControls={setGameControls}
            />
            {gameControls.gameLevel > 1 && (
                <ObstacleDots
                    gameLevel={gameControls.gameLevel}
                    obstacles={obstacles}
                    setObstacles={setObstacles}
                />
            )}
        </g>
    );
}

export default React.memo(BoardObjects);
