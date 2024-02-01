import React from "react";
import Snake from "../Snake/Snake";
import FoodDots from "../Food/FoodDots";
import ObstacleDots from "../Obstacles/ObstacleDots";

function Level({ isPaused, foodDots, snakeDots, obstacles, gameLevel, setGameObjects }) {
    return (
        <g>
            <FoodDots
                isPaused={isPaused}
                foodDots={foodDots}
                setGameObjects={setGameObjects}
            />
            <Snake snakeDots={snakeDots} />
            {gameLevel > 1 && (
                <ObstacleDots
                    gameLevel={gameLevel}
                    snakeDots={snakeDots}
                    foodDots={foodDots}
                    obstacles={obstacles}
                    setGameObjects={setGameObjects}
                />
            )}
        </g>
    );
}

export default Level;
