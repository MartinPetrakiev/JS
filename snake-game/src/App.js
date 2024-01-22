import { useState, useEffect } from "react";
import Snake from "./components/Snake";
import Food from "./components/Food";
import "./App.css";
import { getRandomCoordinates, moveSnake, checkCollision } from "./gameLogic";
import DangerItem from "./components/DangerItem";

function App() {
  const initialSnakeDots = [
    [2, 2],
    [2, 4],
    [2, 6],
    [2, 8],
  ];
  const [snakeDots, setSnakeDots] = useState(initialSnakeDots);
  const [foodDot, setFoodDot] = useState(
    getRandomCoordinates(initialSnakeDots)
  );
  const [direction, setDirection] = useState("RIGHT");
  const [alive, setAlive] = useState(false);
  const [speed, setSpeed] = useState(300);
  const [startButtonName, setStartButtonName] = useState("Play");
  const [point, setPoint] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [dangerDot, setDangerDot] = useState(null);
  const [gameHistory, setGameHistory] = useState(
    JSON.parse(localStorage.getItem("gameHistory")) || []
  );

  useEffect(() => {
    document.onkeydown = onKeyDown;
    let run;
    if (!isPaused) {
      run = setInterval(() => {
        moveSnake(alive, direction, snakeDots, setSnakeDots);
        checkCollision(
          {
            direction,
            snakeDots,
            setSnakeDots,
            foodDot,
            setFoodDot,
            speed,
            setSpeed,
            point,
            setPoint,
            dangerDot,
            setDangerDot,
          },
          onGameOver
        );
      }, speed);
    }

    return () => {
      clearInterval(run);
    };
  }, [
    isPaused,
    direction,
    snakeDots,
    alive,
    foodDot,
    speed,
    point,
    onGameOver,
  ]);

  useEffect(() => {
    const dangerDotGenerate = setTimeout(() => {
      if (!dangerDot && !isPaused) {
        setDangerDot(getRandomCoordinates(snakeDots));
      }
    }, 10000);

    return () => {
      clearTimeout(dangerDotGenerate);
    };
  }, [dangerDot, isPaused]);

  function onKeyDown(e) {
    switch (e.keyCode) {
      case 38:
        !isPaused && setDirection("UP");
        break;
      case 40:
        !isPaused && setDirection("DOWN");
        break;
      case 37:
        !isPaused && setDirection("LEFT");
        break;
      case 39:
        !isPaused && setDirection("RIGHT");
        break;
      case 32:
        !isPaused ? setIsPaused(true) : setIsPaused(false);
        break;
      default:
        break;
    }
  }

  function onGameOver() {
    setAlive(false);
    setSnakeDots([
      [2, 2],
      [2, 4],
      [2, 6],
      [2, 8],
    ]);
    setFoodDot([10, 10]);
    setDirection("RIGHT");
    setIsPaused(true);

    const currentGame = { score: point, timestamp: new Date().toISOString() };
    const updatedHistory = [...gameHistory, currentGame];

    localStorage.setItem("gameHistory", JSON.stringify(updatedHistory));
    setGameHistory((prevState) => {
      return [...prevState, currentGame];
    });
  }

  function rePlay() {
    setDirection("RIGHT");
    setStartButtonName("Play again");
    setPoint(0);
    setAlive(true);
    setDangerDot(null);
    setIsPaused(false);
  }

  return (
    <div className="app">
      <div className="snake-image"></div>
      <h1 className="title">Snake Game</h1>
      {alive ? (
        <div>
          <div className="box">
            <span className="content">{point}</span>
          </div>
          <div className="wrapper">
            <Snake snakeDots={snakeDots} />
            <Food foodDot={foodDot} />
            {dangerDot && <DangerItem dangerDot={dangerDot} />}
          </div>
        </div>
      ) : (
        <div>
          <div className="instructions">
            Start the game by pressing the "Play" button. To move the snake use
            the arrow keys on your keayboard
            <span className="key-symbol">↑</span>{" "}
            <span className="key-symbol">↓</span>{" "}
            <span className="key-symbol">→</span>{" "}
            <span className="key-symbol">←</span>. You can pause the game at any
            time by pressing <span className="key-symbol">space</span> key.
          </div>
          <div className="box">
            <span className="content">Your points: {point}</span>
            {gameHistory.length > 0 && (
              <ul>
                {gameHistory.length > 0 &&
                  gameHistory.map((eachGame, index) => (
                    <li key={index}>
                      {index + 1}. {eachGame.score} -{" "}
                      {new Date(eachGame.timestamp).toLocaleString()}
                    </li>
                  ))}
              </ul>
            )}
            <button className="button" onClick={rePlay}>
              {startButtonName}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
