import { useState } from "react";
import { GAME_HISOTRY } from "./constants";

const initalHistory =  JSON.parse(localStorage.getItem(GAME_HISOTRY)) || [];
export function useGameControls() {
    const [gameControls, setGameControls] = useState({
        alive: false,
        startButtonName: "Play",
        score: 0,
        isPaused: true,
        gameLevel: 1,
        playerName: "",
        gameHistory: initalHistory,
    });

    return {
        gameControls,
        setGameControls,
    };
}
