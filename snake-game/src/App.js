import { useState, useEffect } from "react";
import "./App.css";
import { getRandomCoordinates, moveSnake, checkCollision, generateRandomObstacle } from "./gameLogic";
import GameInstructions from "./components/GameInstructions";
import ScoreBoard from "./components/ScoreBoard";
import Level1 from "./components/Levels/Level1";
import { generateRandomCoordinates, onKeyDown } from "./utils";
import { INITIAL_SNAKE_DOTS } from "./constants";
import Level2 from "./components/Levels/Level2";

function App() {
  const [snakeDots, setSnakeDots] = useState(INITIAL_SNAKE_DOTS);
  const [foodDots, setFoodDots] = useState([
    getRandomCoordinates(INITIAL_SNAKE_DOTS, []),
  ]);
  const [obstacles, setObstacles] = useState([]);
  const [moveDirection, setMoveDirection] = useState("RIGHT");
  const [alive, setAlive] = useState(false);
  const [speed, setSpeed] = useState(200);
  const [startButtonName, setStartButtonName] = useState("Play");
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [gameHistory, setGameHistory] = useState(
    JSON.parse(localStorage.getItem("gameHistory")) || []
  );

  useEffect(() => {
    document.onkeydown = (e) =>
      onKeyDown(e, isPaused, setMoveDirection, setIsPaused);

    let run;

    if (!isPaused) {
      run = setInterval(() => {
        moveSnake(alive, moveDirection, snakeDots, setSnakeDots);
        checkCollision(
          {
            moveDirection,
            snakeDots,
            setSnakeDots,
            foodDots,
            setFoodDots,
            speed,
            setSpeed,
            score,
            setScore,
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
    foodDots,
    speed,
    score,
    onGameOver,
  ]);

  useEffect(() => {
    const foodDotGenerate = setTimeout(() => {
      if (!isPaused) {
        setFoodDots((prev) => [...prev, getRandomCoordinates(snakeDots, prev)]);
      }
    }, 5000);

    return () => {
      clearTimeout(foodDotGenerate);
    };
  }, [foodDots, isPaused]);

  useEffect(() => {
    if (!isPaused && foodDots.length > 6) {
      setFoodDots((prev) => [...prev.slice(prev.length - 2)]);
    }
  }, [foodDots]);

  useEffect(() => {
    const numberOfObstacles = 10;

    const newObstacles = Array.from({ length: numberOfObstacles }, (_, index) =>
      generateRandomObstacle(snakeDots, foodDots)
    );

    setObstacles(newObstacles);
  }, []);

  function onGameOver() {
    setAlive(false);
    setSnakeDots([
      [2, 2],
      [2, 4],
      [2, 6],
      [2, 8],
    ]);
    setFoodDots([10, 10]);
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
    setFoodDots([]);
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
          {/* <Level1 foodDots={foodDots} snakeDots={snakeDots} /> */}
          <Level2 snakeDots={snakeDots} foodDots={foodDots} obstacles={obstacles} />
        </div>
      ) : (
        <div>
          <GameInstructions />
          <div className="box">
            <ScoreBoard score={score} gameHistory={gameHistory} />
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
