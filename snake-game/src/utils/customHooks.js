import { useState } from "react";
import { GAME_HISOTRY, INITIAL_SNAKE_DOTS } from "./constants";
import { v4 as uuidv4 } from "uuid";

export function useGameObjects() {
    const [gameObjects, setGameObjects] = useState({
        snakeDots: INITIAL_SNAKE_DOTS,
        foodDots: [{ key: uuidv4(), x: 10, y: 10 }],
        obstacles: [],
    });

    return {
        gameObjects,
        setGameObjects,
    };
}

export function useGameControls() {
    const [gameControls, setGameControls] = useState({
        alive: false,
        startButtonName: "Play",
        score: 0,
        isPaused: true,
        gameLevel: 1,
        playerName: "",
        gameHistory: JSON.parse(localStorage.getItem(GAME_HISOTRY)) || [],
    });

    return {
        gameControls,
        setGameControls,
    };
}
