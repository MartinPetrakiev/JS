import React, { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { GAME_HISOTRY } from "./utils/constants";

const initalHistory =  JSON.parse(localStorage.getItem(GAME_HISOTRY)) || [];

export const FoodObstaclesContext = createContext();
export const GameControlsContext = createContext();

export const FoodObstacleProvider = ({ children }) => {
    const [foodDots, setFoodDots] = useState([{ key: uuidv4(), x: 10, y: 10 }]);
    const [obstacles, setObstacles] = useState([]);

    return (
        <FoodObstaclesContext.Provider
            value={{ foodDots, setFoodDots, obstacles, setObstacles }}
        >
            {children}
        </FoodObstaclesContext.Provider>
    );
};

export const GameControlsProvider = ({ children }) => {
    const [gameControls, setGameControls] = useState({
        alive: false,
        startButtonName: "Play",
        score: 0,
        isPaused: true,
        gameLevel: 1,
        playerName: "",
        gameHistory: initalHistory,
    });

    return (
        <GameControlsContext.Provider value={{ gameControls, setGameControls }}>
            {children}
        </GameControlsContext.Provider>
    );
};
