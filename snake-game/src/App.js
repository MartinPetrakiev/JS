import "./App.css";
import { play } from "./utils/gameLogic";
import GameBoard from "./components/Board/GameBoard";
import GameStartScreen from "./components/StartScreen/GameStartScreen";
import { useGameControls } from "./ContextProviders";

function App() {
    const { gameControls, setGameControls } = useGameControls();

    return (
        <div className="app">
            <h1 className="title">Snake Game</h1>
            {gameControls.alive ? (
                <GameBoard />
            ) : (
                <GameStartScreen
                    play={() => play(setGameControls, gameControls.playerName)}
                />
            )}
        </div>
    );
}

export default App;
