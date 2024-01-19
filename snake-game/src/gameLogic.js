const BOARD_MIN = 0;
const BOARD_MAX = 40;

export const getRandomCoordinates = () => {
  let min = 1;
  let max = 38;
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
  gameParams, onGameOver
) => {
  let currentHead = gameParams.snakeDots[gameParams.snakeDots.length - 1];

  checkIfEat(gameParams);
  checkIfOutOfBorders(gameParams, onGameOver);
  checkIfCollapsed(gameParams, currentHead, onGameOver);
};

function checkIfEat(gameParams) {
  let head = gameParams.snakeDots[gameParams.snakeDots.length - 1];

  if (head[0] === gameParams.foodDot[0] && head[1] === gameParams.foodDot[1]) {
    gameParams.setFoodDot(getRandomCoordinates());
    enlargeSnake(gameParams);
    increaseSpeed(gameParams);
    gameParams.setPoint(gameParams.point + 10);
  }
}

function checkIfOutOfBorders(gameParams, onGameOver) {
  let head = gameParams.snakeDots[gameParams.snakeDots.length - 1];
  if (
    head[0] ===  BOARD_MAX ||
    head[1] ===  BOARD_MAX ||
    head[0] <= BOARD_MIN ||
    head[1] <= BOARD_MIN
  ) {
    onGameOver();
  }
}

function checkIfCollapsed(gameParams, head, onGameOver) {
  let snake = [...gameParams.snakeDots];
  snake.pop();
  snake.forEach((dot, index) => {
    if (head[0] === dot[0] && head[1] === dot[1]) {
      onGameOver();
    }
  });
}

function increaseSpeed(speed, setSpeed) {
  if (speed > 10) {
    setSpeed(speed - 10);
  }
}

function enlargeSnake(gameParams) {
  let newDot = gameParams.snakeDots[gameParams.snakeDots.length - 1];
  switch (gameParams.direction) {
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
  let newSnake = [newDot, ...gameParams.snakeDots];
  gameParams.setSnakeDots(newSnake);
}
