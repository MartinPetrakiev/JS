import React, { createContext, useContext, useState } from "react";

const FoodObstaclesContext = createContext();
const GameControlsContext = createContext();

export const FoodObstacleProvider = ({ children, initialFoodDots, initialObstacles }) => {
    const [foodDots, setFoodDots] = useState(initialFoodDots);
    const [obstacles, setObstacles] = useState(initialObstacles);

    return (
        <FoodObstaclesContext.Provider
            value={{ foodDots, setFoodDots, obstacles, setObstacles }}
        >
            {children}
        </FoodObstaclesContext.Provider>
    );
};

export const useFoodObstacles = () => useContext(FoodObstaclesContext);

export const GameControlsProvider = ({ children, initialValue }) => {
    const [gameControls, setGameControls] = useState(initialValue);

    return (
        <GameControlsContext.Provider value={{ gameControls, setGameControls }}>
            {children}
        </GameControlsContext.Provider>
    );
};

export const useGameControls = () => useContext(GameControlsContext);