import React from "react";
import BoardObjects from "./BoardObjects";

function GameBoard({ gameControls, setGameControls }) {
    return (
        <div>
            <div className="box">
                <span className="content">{gameControls.score}</span>
            </div>
            <svg className="game-board">
                <BoardObjects
                    gameControls ={gameControls}
                    setGameControls={setGameControls}
                />
            </svg>
        </div>
    );
}

export default GameBoard;
