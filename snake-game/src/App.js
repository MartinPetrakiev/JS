import { useState, useEffect } from "react";
import Snake from './components/Snake';
import Food from './components/Food';
import "./App.css";
import { getRandomCoordinates, moveSnake, checkCollision } from './gameLogic';

function App() {
  const [snakeDots, setSnakeDots] = useState([[0, 0], [0, 2], [0, 4], [0, 6]]);
  const [foodDot, setFoodDot] = useState(getRandomCoordinates());
  const [direction, setDirection] = useState('RIGHT');
  const [alive, setAlive] = useState(false);
  const [speed, setSpeed] = useState(300);
  const [startButtonName, setStartButtonName] = useState('Play');
  const [point, setPoint] = useState(0);

  useEffect(() => {
    document.onkeydown = onKeyDown;
    const run = setInterval(() => {
      moveSnake(alive, direction, snakeDots, setSnakeDots);
      checkCollision(
        direction,
        snakeDots,
        setSnakeDots,
        foodDot,
        setFoodDot,
        speed,
        setSpeed,
        point,
        setPoint,
        onGameOver
      );
    }, speed);
    return () => clearInterval(run);
  });
  
  function onKeyDown(e) {
		switch (e.keyCode) {
			case 38:
				setDirection('UP');
				break;
			case 40:
				setDirection('DOWN');
				break;
			case 37:
				setDirection('LEFT');
				break;
			case 39:
				setDirection('RIGHT');
				break;
			default:
				break;
		}
	}

  function onGameOver() {
    setAlive(false);
    setSnakeDots([[0, 0], [0, 2], [0, 4], [0, 6]]);
    setFoodDot([10, 10]);
    setDirection('RIGHT');
  }

  function rePlay() {
		setDirection('RIGHT');
		setStartButtonName('Play again');
		setPoint(0);
		setAlive(true);
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
          </div>
        </div>
      ) : (
        <div>
          <div className="box">
            <span className="content">Your points : {point}</span>
          </div>
          <button className="button" onClick={rePlay}>
            {startButtonName}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
