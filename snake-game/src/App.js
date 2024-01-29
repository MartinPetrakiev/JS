import { useState, useEffect } from "react";
import "./App.css";
import {
  getRandomCoordinates,
  moveSnake,
  checkCollision,
  advanceGameLevel,
  rePlay,
} from "./utils/gameLogic";
import { onKeyDown } from "./utils/utils";
import { INITIAL_SNAKE_DOTS } from "./utils/constants";
import GameBoard from "./components/GameBoard";
import GameStartScreen from "./components/GameStartScreen";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [snakeDots, setSnakeDots] = useState(INITIAL_SNAKE_DOTS);
  const [foodDots, setFoodDots] = useState([
    { key: uuidv4(), x: 10, y: 10  },
  ]);
  const [obstacles, setObstacles] = useState([]);
  const [moveDirection, setMoveDirection] = useState("RIGHT");
  const [alive, setAlive] = useState(false);
  const [speed, setSpeed] = useState(240);
  const [startButtonName, setStartButtonName] = useState("Play");
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [gameLevel, setGameLevel] = useState(1);
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
            snakeDots,
            foodDots,
            obstacles,
            moveDirection,
            alive,
            speed,
            startButtonName,
            score,
            isPaused,
            gameLevel,
            gameHistory,
          },
          {
            setSnakeDots,
            setFoodDots,
            setObstacles,
            setMoveDirection,
            setAlive,
            setSpeed,
            setStartButtonName,
            setScore,
            setIsPaused,
            setGameLevel,
            setGameHistory,
          }
        );

        advanceGameLevel({ score, gameLevel }, { setGameLevel });
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
    obstacles,
    speed,
    score,
    gameLevel,
    gameHistory,
    startButtonName,
  ]);

  useEffect(() => {
    const foodDotGenerate = setTimeout(() => {
      if (!isPaused) {
        
        setFoodDots((prev) => {
          const [randomX, randomY] = getRandomCoordinates(snakeDots, prev, obstacles);
          return [
            ...prev,
            {
              key: uuidv4(),
              x: randomX,
              y: randomY
            },
          ]
        });
        console.log(foodDots)
      }
    }, 5000);

    return () => {
      clearTimeout(foodDotGenerate);
    };
  }, [isPaused, foodDots]);

  useEffect(() => {
    if (!isPaused && foodDots.length > 6) {
      setFoodDots((prev) => [...prev.slice(prev.length - 2)]);
    }
  }, [isPaused, foodDots]);

  return (
    <div className="app">
      <h1 className="title">Snake Game</h1>
      {alive ? (
        <GameBoard
          score={score}
          snakeDots={snakeDots}
          foodDots={foodDots}
          obstacles={obstacles}
          setObstacles={setObstacles}
          gameLevel={gameLevel}
        />
      ) : (
        <GameStartScreen
          score={score}
          gameHistory={gameHistory}
          rePlay={() =>
            rePlay({
              setMoveDirection,
              setStartButtonName,
              setScore,
              setAlive,
              setFoodDots,
              setIsPaused,
              setSpeed,
            })
          }
          startButtonName={startButtonName}
        />
      )}
    </div>
  );
}

export default App;
