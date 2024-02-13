import React, { createContext, useContext, useState } from "react";

const GameControlsContext = createContext();
const FoodContext = createContext();
const ObstacleContext = createContext();

export const FoodProvider = ({ children, initialFoodDots }) => {
    const [foodDots, setFoodDots] = useState(initialFoodDots);

    return (
        <FoodContext.Provider
            value={{ foodDots, setFoodDots }}
        >
            {children}
        </FoodContext.Provider>
    );
};

export const useFoodContext = () => useContext(FoodContext);

export const ObstacleProvider = ({children, initialObstacles}) => {
    const [obstacles, setObstacles] = useState(initialObstacles);

    return (
        <ObstacleContext.Provider value={{obstacles, setObstacles}}>
            {children}
        </ObstacleContext.Provider>
    )
}

export const useObstacleContext = () => useContext(ObstacleContext);

export const GameControlsProvider = ({ children, initialValue }) => {
    const [gameControls, setGameControls] = useState(initialValue);

    return (
        <GameControlsContext.Provider value={{ gameControls, setGameControls }}>
            {children}
        </GameControlsContext.Provider>
    );
};

export const useGameControls = () => useContext(GameControlsContext);