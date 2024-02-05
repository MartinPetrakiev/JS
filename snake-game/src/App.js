import "./App.css";
import { play } from "./utils/gameLogic";
import GameBoard from "./components/Board/GameBoard";
import GameStartScreen from "./components/StartScreen/GameStartScreen";
import { GameControlsContext } from "./ContextProviders";
import { useContext } from "react";

function App() {
    const { gameControls, setGameControls } = useContext(GameControlsContext);

    return (
        <div className="app">
            <h1 className="title">Snake Game</h1>
            {gameControls.alive ? (
                <GameBoard
                    gameControls={gameControls}
                    setGameControls={setGameControls}
                />
            ) : (
                <GameStartScreen
                    gameControls={gameControls}
                    setGameControls={setGameControls}
                    play={() =>
                        play(setGameControls, gameControls.playerName)
                    }
                />
            )}
        </div>
    );
}

export default App;
