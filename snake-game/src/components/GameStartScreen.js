import React from "react";
import GameInstructions from "./GameInstructions";
import ScoreBoard from "./ScoreBoard";
import { handlePlayerNameInput } from "../utils/utils";

function GameStartScreen({
  score,
  gameHistory,
  rePlay,
  startButtonName,
  playerName,
  setPlayerName,
}) {
  return (
    <div>
      <GameInstructions />
      <div className="box">
        <div className="player-input-box">
          <input
            type="text"
            placeholder="Player name"
            value={playerName}
            onChange={(e) => handlePlayerNameInput(e, setPlayerName)}
          />
        </div>
        {gameHistory.length > 0 && (
          <ScoreBoard score={score} gameHistory={gameHistory} />
        )}
        <button className="button" onClick={rePlay}>
          {startButtonName}
        </button>
      </div>
    </div>
  );
}

export default GameStartScreen;
