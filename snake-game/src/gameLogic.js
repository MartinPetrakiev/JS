import {
  BOARD_MIN,
  BOARD_MAX,
  SNAKE_DOT_SIZE,
  OBSTACLE_SIZE,
} from "./constants";

export function getRandomCoordinates(snakeDots, foodDots) {
  let min = BOARD_MIN + 1;
  let max = BOARD_MAX - 2;
  let x, y;
  do {
    x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  } while (checkCollisionWithOtherObjects([x, y], snakeDots, foodDots));

  return [x, y];
}

export function generateRandomObstacle(snakeDots, foodDots) {
  let x, y;
  do {
    x = Math.floor(Math.random() * (BOARD_MAX / OBSTACLE_SIZE));
    y = Math.floor(Math.random() * (BOARD_MAX / OBSTACLE_SIZE));
  } while (checkCollisionWithOtherObjects([x, y], snakeDots, foodDots));

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
  const { snakeDots, foodDots } = gameParams;
  let currentHead = snakeDots[snakeDots.length - 1];

  checkIfEat(gameParams);
  onOutOfBounds(gameParams, onGameOver);
  checkIfSelfCollapsed(gameParams, currentHead, onGameOver);
  if (
    checkCollisionWithOtherObjects(
      currentHead,
      snakeDots.slice(0,snakeDots.length - 1),
      foodDots
    )
  ) {
    console.log("ue");
    // onGameOver();
  }
}

function checkCollisionWithOtherObjects(
  [inputTop, inputLeft],
  snakeDots,
  foodDots
) {
  for (let [dotTop, dotLeft] of snakeDots) {
    if (dotTop === inputTop && dotLeft === inputLeft) {
      console.log("be");
      return true;
    }
  }

  if (!foodDots) {
    return false;
  }

  for (let [dotTop, dotLeft] of foodDots) {
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
}

function onOutOfBounds(gameParams) {
  let [x, y] = gameParams.snakeDots[gameParams.snakeDots.length - 1];
  if (x >= BOARD_MAX || y >= BOARD_MAX || x < BOARD_MIN || y < BOARD_MIN) {
    let newX = x;
    let newY = y;

    if (x >= BOARD_MAX) {
      newX = BOARD_MIN;
    } else if (y >= BOARD_MAX) {
      newY = BOARD_MIN;
    }

    if (x < BOARD_MIN) {
      newX = BOARD_MAX - 2;
    } else if (y < BOARD_MIN) {
      newY = BOARD_MAX - 2;
    }

    const newSnakeDots = [...gameParams.snakeDots];
    newSnakeDots[newSnakeDots.length - 1] = [newX, newY];
    gameParams.setSnakeDots(newSnakeDots);
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
  const newSnake = [...snakeDots, newDot];
  setSnakeDots(newSnake);
}
