import { useState, useEffect } from "react";
import Snake from "./components/Snake";
import Food from "./components/Food";
import "./App.css";
import {
  getRandomCoordinates,
  moveSnake,
  checkCollision,
  KEYBOARD_KEYS,
} from "./gameLogic";
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
  const [moveDirection, setMoveDirection] = useState("RIGHT");
  const [alive, setAlive] = useState(false);
  const [speed, setSpeed] = useState(200);
  const [startButtonName, setStartButtonName] = useState("Play");
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [dangerDots, setDangerDots] = useState([]);
  const [gameHistory, setGameHistory] = useState(
    JSON.parse(localStorage.getItem("gameHistory")) || []
  );

  useEffect(() => {
    document.onkeydown = onKeyDown;
    let run;
    if (!isPaused) {
      run = setInterval(() => {
        moveSnake(alive, moveDirection, snakeDots, setSnakeDots);
        checkCollision(
          {
            moveDirection,
            snakeDots,
            setSnakeDots,
            foodDot,
            setFoodDot,
            speed,
            setSpeed,
            score,
            setScore,
            dangerDots,
            setDangerDots,
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
    moveDirection,
    snakeDots,
    alive,
    foodDot,
    speed,
    score,
    onGameOver,
  ]);

  useEffect(() => {
    const dangerDotGenerate = setTimeout(() => {
      if (!isPaused) {
        setDangerDots((prev) => [
          ...prev,
          getRandomCoordinates(snakeDots, foodDot, prev),
        ]);
      }
    }, 5000);

    return () => {
      clearTimeout(dangerDotGenerate);
    };
  }, [dangerDots, isPaused]);

  useEffect(() => {
    if (!isPaused && score % 50 === 0) {
      setDangerDots([]);
    }
  }, [score]);

  function onKeyDown(e) {
    const { UP, DOWN, LEFT, RIGHT, PAUSE } = KEYBOARD_KEYS;

    switch (e.keyCode) {
      case UP:
        !isPaused && setMoveDirection("UP");
        break;
      case DOWN:
        !isPaused && setMoveDirection("DOWN");
        break;
      case LEFT:
        !isPaused && setMoveDirection("LEFT");
        break;
      case RIGHT:
        !isPaused && setMoveDirection("RIGHT");
        break;
      case PAUSE:
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
    setMoveDirection("RIGHT");
    setIsPaused(true);

    const currentGame = { score: score, timestamp: new Date().toISOString() };
    const updatedHistory = [...gameHistory, currentGame];

    localStorage.setItem("gameHistory", JSON.stringify(updatedHistory));
    setGameHistory((prevState) => {
      return [...prevState, currentGame];
    });
  }

  function rePlay() {
    setMoveDirection("RIGHT");
    setStartButtonName("Play again");
    setScore(0);
    setAlive(true);
    setDangerDots([]);
    setIsPaused(false);
  }

  return (
    <div className="app">
      <div className="snake-image"></div>
      <h1 className="title">Snake Game</h1>
      {alive ? (
        <div>
          <div className="box">
            <span className="content">{score}</span>
          </div>
          <svg className="wrapper">
            <g>
              <Food foodDot={foodDot} />
              {dangerDots.length > 0 &&
                dangerDots.map((dangerDot, index) => (
                  <DangerItem dangerDot={dangerDot} />
                ))}
              <Snake snakeDots={snakeDots} />
            </g>
          </svg>
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
            <span className="content">Your points: {score}</span>
            {gameHistory.length > 0 && (
              <ul className="game-hitory">
                {gameHistory.length > 0 &&
                  gameHistory.map((eachGame, index) => (
                    <li key={index}>
                      {index + 1}. Score: {eachGame.score} -{" "}
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
