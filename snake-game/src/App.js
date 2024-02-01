import "./App.css";
import { rePlay } from "./utils/gameLogic";
import GameBoard from "./components/GameBoard";
import GameStartScreen from "./components/GameStartScreen";
import { useGameControls } from "./utils/customHooks";

function App() {
    const { gameControls, setGameControls } = useGameControls();

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
                    gameControls={{...gameControls}}
                    setGameControls={setGameControls}
                    rePlay={() =>
                        rePlay(setGameControls, gameControls.playerName)
                    }
                />
            )}
        </div>
    );
}

export default App;
