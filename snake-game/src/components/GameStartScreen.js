import React from "react";
import GameInstructions from "./GameInstructions";
import ScoreBoard from "./ScoreBoard";

function GameStartScreen({ score, gameHistory, rePlay, startButtonName }) {
  return (
    <div>
      <GameInstructions />
      <div className="box">
        <ScoreBoard score={score} gameHistory={gameHistory} />
        <button className="button" onClick={rePlay}>
          {startButtonName}
        </button>
      </div>
    </div>
  );
}

export default GameStartScreen;
