const BOARD_MIN = 0
const BOARD_MAX = 30

export const getRandomCoordinates = () => {
	let min = 1;
	let max = 28;
	let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
	let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

export const moveSnake = (state, direction, snakeDots, setSnakeDots) => {
  if (state === true) {
    let dots = [...snakeDots];
    let head = dots[dots.length - 1];

    switch (direction) {
      case "RIGHT":
        head = [head[0], head[1] + 2];
        break;
      case "LEFT":
        head = [head[0], head[1] - 2];
        break;
      case "DOWN":
        head = [head[0] + 2, head[1]];
        break;
      case "UP":
        head = [head[0] - 2, head[1]];
        break;
      default:
        break;
    }
    dots.push(head);
    dots.shift();
    setSnakeDots(dots);
  }
};

export const checkCollision = (
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
) => {
  let head = snakeDots[snakeDots.length - 1];
  let food = foodDot;

  checkIfEat(
    direction,
    snakeDots,
    setSnakeDots,
    food,
    setFoodDot,
    speed,
    setSpeed,
    point,
    setPoint
  );

  checkIfOutOfBorders(snakeDots, onGameOver);
  checkIfCollapsed(snakeDots, head, onGameOver);
};

function checkIfEat(
  direction,
  snakeDots,
  setSnakeDots,
  food,
  setFoodDot,
  speed,
  setSpeed,
  point,
  setPoint
) {
  let head = snakeDots[snakeDots.length - 1];

  if (head[0] === food[0] && head[1] === food[1]) {
    setFoodDot(getRandomCoordinates());
    enlargeSnake(direction, snakeDots, setSnakeDots);
    increaseSpeed(speed, setSpeed);
    setPoint(point + 10);
  }
}

const checkIfOutOfBorders = (snakeDots, onGameOver) => {
  let head = snakeDots[snakeDots.length - 1];
  if (head[0] === BOARD_MAX || head[1] === BOARD_MAX || head[0] < BOARD_MIN || head[1] < BOARD_MIN) {
    onGameOver();
  }
};

const checkIfCollapsed = (snakeDots, head, onGameOver,) => {
  let snake = [...snakeDots];
  snake.pop();
  snake.forEach((dot, index) => {
    if (head[0] === dot[0] && head[1] === dot[1]) {
      onGameOver();
    }
  });
};

function increaseSpeed(speed, setSpeed) {
  if (speed > 10) {
    setSpeed(speed - 10);
  }
}

function enlargeSnake(direction, snakeDots, setSnakeDots) {
  let newDot = snakeDots[snakeDots.length - 1];
  switch (direction) {
    case "RIGHT":
      newDot = [newDot[0], newDot[1] + 2];
      break;
    case "LEFT":
      newDot = [newDot[0], newDot[1] - 2];
      break;
    case "DOWN":
      newDot = [newDot[0] + 2, newDot[1]];
      break;
    case "UP":
      newDot = [newDot[0] - 2, newDot[1]];
      break;
    default:
      break;
  }
  let newSnake = [newDot, ...snakeDots];
  setSnakeDots(newSnake);
}
