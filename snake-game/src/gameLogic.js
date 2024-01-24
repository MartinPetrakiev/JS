const BOARD_MIN = 0;
const BOARD_MAX = 40;
const SNAKE_DOT_SIZE = 2;

export const KEYBOARD_KEYS = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  PAUSE: 32,
};

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomCoordinates(snakeDots, foodDots, dangerDots) {
  let min = BOARD_MIN + 1;
  let max = BOARD_MAX - 2;
  let x, y;
  do {
    x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  } while (
    checkCollisionWithOtherObjects([x, y], snakeDots, foodDots, dangerDots)
  );

  return [x, y];
}

export function moveSnake(isAlive, moveDirection, snakeDots, setSnakeDots) {
  if (isAlive) {
    const currentSnakeDots = [...snakeDots];
    let head = currentSnakeDots[currentSnakeDots.length - 1];
    const [topPosition, leftPosition] = head;

    switch (moveDirection) {
      case "RIGHT":
        head = [topPosition, leftPosition + SNAKE_DOT_SIZE];
        break;
      case "LEFT":
        head = [topPosition, leftPosition - SNAKE_DOT_SIZE];
        break;
      case "DOWN":
        head = [topPosition + SNAKE_DOT_SIZE, leftPosition];
        break;
      case "UP":
        head = [topPosition - SNAKE_DOT_SIZE, leftPosition];
        break;
      default:
        break;
    }
    currentSnakeDots.push(head);
    currentSnakeDots.shift();
    setSnakeDots(currentSnakeDots);
  }
}

export function checkCollision(gameParams, onGameOver) {
  let currentHead = gameParams.snakeDots[gameParams.snakeDots.length - 1];

  checkIfEat(gameParams);
  checkIfOutOfBoard(gameParams, onGameOver);
  checkIfSelfCollapsed(gameParams, currentHead, onGameOver);
}

function checkCollisionWithOtherObjects(
  [inputTop, inputLeft],
  snakeDots,
  foodDots,
  dangerDots
) {
  for (let [dotTop, dotLeft] of snakeDots) {
    if (dotTop === inputTop && dotLeft === inputLeft) {
      return true;
    }
  }

  if (!foodDots || !dangerDots) {
    return false;
  }

  for (let [dotTop, dotLeft] of dangerDots) {
    if (dotTop === inputTop && dotLeft === inputLeft) {
      return true;
    }
  }

  return false;
}

function checkIfEat(gameParams) {
  let head = gameParams.snakeDots[gameParams.snakeDots.length - 1];
  const [topPosition, leftPosition] = head;

  let foodCollidedIndex = gameParams.foodDots?.findIndex(
    (foodDot) => foodDot[0] === topPosition && foodDot[1] === leftPosition
  );

  if (foodCollidedIndex > -1) {
    gameParams.setFoodDots((prev) => [
      ...prev.slice(0, foodCollidedIndex),
      ...prev.slice(foodCollidedIndex + 1),
    ]);
    gameParams.setFoodDots((prev) => [
      ...prev,
      getRandomCoordinates(gameParams.snakeDots, gameParams.foodDots),
    ]);
    enlargeSnake(gameParams);
    increaseSpeed(gameParams);
    gameParams.setScore((prevScore) => prevScore + 10);
  }

  let dangerCollidedIndex = gameParams.dangerDots?.findIndex(
    (dangerDot) => dangerDot[0] === topPosition && dangerDot[1] === leftPosition
  );

  if (dangerCollidedIndex > -1) {
    gameParams.setDangerDots((prev) => [
      ...prev.slice(0, dangerCollidedIndex),
      ...prev.slice(dangerCollidedIndex + 1),
    ]);
    gameParams.setScore((prevScore) => prevScore - 10);
  }
}

function checkIfOutOfBoard(gameParams, onGameOver) {
  let [topPosition, leftPosition] =
    gameParams.snakeDots[gameParams.snakeDots.length - 1];
  if (
    topPosition === BOARD_MAX ||
    leftPosition === BOARD_MAX ||
    topPosition < BOARD_MIN ||
    leftPosition < BOARD_MIN
  ) {
    onGameOver();
  }
}

function checkIfSelfCollapsed(gameParams, head, onGameOver) {
  let snake = [...gameParams.snakeDots];
  const [headTopPosition, headLeftPosition] = head;
  snake.pop();
  snake.forEach(([snakeDotTop, snakeDotLeft], index) => {
    if (headTopPosition === snakeDotTop && headLeftPosition === snakeDotLeft) {
      onGameOver();
    }
  });
}

function increaseSpeed(speed, setSpeed) {
  if (speed > 10) {
    setSpeed((prevSpeed) => prevSpeed - 10);
  }
}

function enlargeSnake({ snakeDots, setSnakeDots, moveDirection }) {
  let newDot = snakeDots[snakeDots.length - 1];
  const [topPosition, leftPosition] = newDot;
  switch (moveDirection) {
    case "RIGHT":
      newDot = [topPosition, leftPosition + SNAKE_DOT_SIZE];
      break;
    case "LEFT":
      newDot = [topPosition, leftPosition - SNAKE_DOT_SIZE];
      break;
    case "DOWN":
      newDot = [topPosition + SNAKE_DOT_SIZE, leftPosition];
      break;
    case "UP":
      newDot = [topPosition - SNAKE_DOT_SIZE, leftPosition];
      break;
    default:
      break;
  }
  const newSnake = [newDot, ...snakeDots];
  setSnakeDots(newSnake);
}
