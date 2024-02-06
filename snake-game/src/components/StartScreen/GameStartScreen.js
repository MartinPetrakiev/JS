import React from "react";
import GameInstructions from "./GameInstructions";
import ScoreBoard from "./ScoreBoard";
import { handlePlayerNameInput } from "../../utils/utils";
import { useGameControls } from "../../ContextProviders";

function GameStartScreen({ play }) {
    const { gameControls, setGameControls } = useGameControls();
    const { score, gameHistory, startButtonName, playerName } = gameControls;

    return (
        <div>
            <GameInstructions />
            <div className="box">
                <div className="player-input-box">
                    <input
                        type="text"
                        placeholder="Player name"
                        value={playerName}
                        onChange={(e) =>
                            handlePlayerNameInput(e, setGameControls)
                        }
                    />
                </div>
                {gameHistory.length > 0 && (
                    <ScoreBoard score={score} gameHistory={gameHistory} />
                )}
                <button className="button" onClick={play}>
                    {startButtonName}
                </button>
            </div>
        </div>
    );
}

export default GameStartScreen;
