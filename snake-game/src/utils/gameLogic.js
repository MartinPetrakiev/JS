import {
  BOARD_MIN,
  BOARD_MAX,
  SNAKE_DOT_SIZE,
  OBSTACLE_SIZE,
  MOVE_DIRECTIONS,
  INITIAL_SNAKE_DOTS,
} from "./constants";

export function getRandomCoordinates(snakeDots, foodDots, obstacles) {
  let min = BOARD_MIN + 1;
  let max = BOARD_MAX - 2;
  let x, y;
  do {
    x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  } while (checkCollisionOnObjectBuild([x, y], snakeDots, foodDots, obstacles));

  return [x, y];
}

export function generateRandomObstacle(snakeDots, foodDots) {
  let x, y;
  do {
    x = Math.floor(Math.random() * (BOARD_MAX / OBSTACLE_SIZE));
    y = Math.floor(Math.random() * (BOARD_MAX / OBSTACLE_SIZE));
  } while (checkCollisionOnObjectBuild([x, y], snakeDots, foodDots));

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

export function checkCollision(gameParams, gameStateSetters) {
  const { snakeDots } = gameParams;
  let currentHead = snakeDots[snakeDots.length - 1];

  checkIfEat(gameParams, gameStateSetters);
  onOutOfBounds(gameParams, gameStateSetters);
  checkIfSelfCollapsed(gameParams, currentHead, gameStateSetters);

  if (gameParams.gameLevel > 1) {
    checkCollisionWithObstacle(gameParams, currentHead, gameStateSetters);
  }

  if (gameParams.gameLevel > 2) {
    checkIfOutOfBoard(gameParams, gameStateSetters);
  }
}

export function advanceGameLevel(gameParams, gameStateSetters) {
  if (gameParams.score !== 0 && gameParams.score % 200 === 0) {
    gameStateSetters.setGameLevel((prev) => prev + 1);
  }
}

export function rePlay(gameStateSetters) {
  gameStateSetters.setMoveDirection("RIGHT");
  gameStateSetters.setStartButtonName("Play again");
  gameStateSetters.setScore(0);
  gameStateSetters.setAlive(true);
  gameStateSetters.setFoodDots([getRandomCoordinates(INITIAL_SNAKE_DOTS)]);
  gameStateSetters.setIsPaused(false);
  gameStateSetters.setSpeed(240);
}

function checkCollisionWithObstacle(gameParams, currentHead, gameStateSetters) {
  const obstacles = gameParams.obstacles;
  const [headY, headX] = currentHead;
  let offsetX = headX;
  let offsetY = headY;
  const { UP, DOWN, LEFT, RIGHT } = MOVE_DIRECTIONS;

  switch (gameParams.moveDirection) {
    case UP:
      offsetY = headY - 2;
      break;
    case DOWN:
      offsetY = headY + 2;
      break;
    case LEFT:
      offsetX = headX - 2;
      break;
    case RIGHT:
      offsetX = headX + 2;
      break;
    default:
      break;
  }

  let obstacleCollidedIndex = obstacles.findIndex(
    ([obstacleX, obstacleY]) =>
      obstacleX * 2 === offsetX && obstacleY * 2 === offsetY
  );

  if (obstacleCollidedIndex > -1) {
    onGameOver(gameParams, gameStateSetters);
  }
}

function checkIfOutOfBoard(gameParams, gameStateSetters) {
  let [topPosition, leftPosition] =
    gameParams.snakeDots[gameParams.snakeDots.length - 1];
  if (
    topPosition === BOARD_MAX ||
    leftPosition === BOARD_MAX ||
    topPosition < BOARD_MIN ||
    leftPosition < BOARD_MIN
  ) {
    onGameOver(gameParams, gameStateSetters);
  }
}

function checkCollisionOnObjectBuild(
  [inputTop, inputLeft],
  snakeDots,
  foodDots,
  obstacles
) {
  for (let [dotTop, dotLeft] of snakeDots) {
    if (dotTop === inputTop && dotLeft === inputLeft) {
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

  if (obstacles) {
    for (let [dotTop, dotLeft] of obstacles) {
      if (dotTop === inputTop && dotLeft === inputLeft) {
        return true;
      }
    }
  }

  return false;
}

function checkIfEat(gameParams, gameStateSetters) {
  let head = gameParams.snakeDots[gameParams.snakeDots.length - 1];
  const [headY, headX] = head;

  let foodCollidedIndex = gameParams.foodDots?.findIndex(
    ([foodX, foodY]) => foodX === headX && foodY === headY
  );

  if (foodCollidedIndex > -1) {
    gameStateSetters.setFoodDots((prev) => [
      ...prev.slice(0, foodCollidedIndex),
      ...prev.slice(foodCollidedIndex + 1),
    ]);

    gameStateSetters.setFoodDots((prev) => [
      ...prev,
      getRandomCoordinates(gameParams.snakeDots, gameParams.foodDots),
    ]);

    enlargeSnake(gameParams, gameStateSetters.setSnakeDots);

    if (gameParams.gameLevel > 1) {
      increaseSpeed(gameParams, gameStateSetters.setSpeed);
    }

    gameStateSetters.setScore((prevScore) => prevScore + 10);
  }
}

function onOutOfBounds(gameParams, gameStateSetters) {
  let [headX, headY] = gameParams.snakeDots[gameParams.snakeDots.length - 1];
  if (
    headX >= BOARD_MAX ||
    headY >= BOARD_MAX ||
    headX < BOARD_MIN ||
    headY < BOARD_MIN
  ) {
    let newHeadX = headX;
    let newHeadY = headY;

    if (headX >= BOARD_MAX) {
      newHeadX = BOARD_MIN;
    } else if (headY >= BOARD_MAX) {
      newHeadY = BOARD_MIN;
    }

    if (headX < BOARD_MIN) {
      newHeadX = BOARD_MAX - 2;
    } else if (headY < BOARD_MIN) {
      newHeadY = BOARD_MAX - 2;
    }

    const newSnakeDots = [...gameParams.snakeDots];
    newSnakeDots[newSnakeDots.length - 1] = [newHeadX, newHeadY];
    gameStateSetters.setSnakeDots(newSnakeDots);
  }
}

function checkIfSelfCollapsed(gameParams, head, gameStateSetters) {
  let snake = [...gameParams.snakeDots];
  const [headTopPosition, headLeftPosition] = head;
  snake.pop();
  snake.forEach(([snakeDotTop, snakeDotLeft], index) => {
    if (headTopPosition === snakeDotTop && headLeftPosition === snakeDotLeft) {
      onGameOver(gameParams, gameStateSetters);
    }
  });
}

function increaseSpeed({ speed, gameLevel }, setSpeed) {
  if (speed > 10) {
    setSpeed((prevSpeed) =>
      gameLevel === 2 ? prevSpeed - 5 : prevSpeed - 10
    );
  }
}

function enlargeSnake({ snakeDots, moveDirection }, setSnakeDots) {
  let newDot = snakeDots[snakeDots.length - 1];
  const [dotY, dotX] = newDot;
  const { UP, DOWN, LEFT, RIGHT } = MOVE_DIRECTIONS;

  switch (moveDirection) {
    case RIGHT:
      newDot = [dotY, dotX + SNAKE_DOT_SIZE];
      break;
    case LEFT:
      newDot = [dotY, dotX - SNAKE_DOT_SIZE];
      break;
    case DOWN:
      newDot = [dotY + SNAKE_DOT_SIZE, dotX];
      break;
    case UP:
      newDot = [dotY - SNAKE_DOT_SIZE, dotX];
      break;
    default:
      break;
  }

  const newSnake = [...snakeDots, newDot];
  setSnakeDots(newSnake);
}

function onGameOver(gameParams, gameStateSetters) {
  gameStateSetters.setAlive(false);
  gameStateSetters.setSnakeDots(INITIAL_SNAKE_DOTS);
  gameStateSetters.setFoodDots(
    getRandomCoordinates(INITIAL_SNAKE_DOTS, [], gameParams.obstacles)
  );
  gameStateSetters.setMoveDirection("RIGHT");
  gameStateSetters.setIsPaused(true);

  const currentGame = {
    score: gameParams.score,
    timestamp: new Date().toISOString(),
  };
  const updatedHistory = [...gameParams.gameHistory, currentGame];

  localStorage.setItem("gameHistory", JSON.stringify(updatedHistory));
  gameStateSetters.setGameHistory((prevState) => {
    return [...prevState, currentGame];
  });
}