import {
    BOARD_MIN,
    BOARD_MAX,
    SNAKE_DOT_SIZE,
    OBSTACLE_SIZE,
    MOVE_DIRECTIONS,
    GAME_HISOTRY,
    PLAY_AGAIN_BUTTON_TEXT,
    SPEED_STEP_LVL_2,
    SPEED_STEP_LVL_N,
} from "./constants";

export function getRandomCoordinates(snakeDots, foodDots, obstacles) {
    let min = BOARD_MIN + 1;
    let max = BOARD_MAX - 2;
    let x, y;
    do {
        x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
        y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    } while (
        checkCollisionOnObjectBuild([x, y], snakeDots, foodDots, obstacles)
    );

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

export function moveSnake(moveDirection, snakeDots, setSnakeDots) {
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

export function gameRun(gameParams, gameStateSetters) {
    const { snakeDots, foodDots, obstacles, moveDirection, gameControls } =
        gameParams;
    let currentHead = snakeDots[snakeDots.length - 1];

    const { setSnakeDots, setFoodDots, setSpeed, setGameControls } =
        gameStateSetters;

    // Check if fruit eaten
    const fruitEaten = checkIfEat(snakeDots, foodDots, setFoodDots);

    if (fruitEaten) {
        enlargeSnake(snakeDots, moveDirection, setSnakeDots);

        const { speed, gameLevel, score } = gameControls;

        if (gameLevel > 1) {
            increaseSpeed(speed, gameLevel, setSpeed);
        }

        setGameControls((prevState) => {
            return {
                ...prevState,
                score: prevState.score + 10,
            };
        });

        if ((score + 10) % 100 === 0) {
            setGameControls((prev) => {
                return {
                    ...prev,
                    gameLevel: prev.gameLevel + 1,
                };
            });
        }
    }

    // Control on snake out of border
    if (gameControls.gameLevel <= 2) {
        snakeWrap(snakeDots, setSnakeDots);
    } else {
        checkIfOutOfBoard(snakeDots, gameControls, setGameControls);
    }

    //Check self collision
    checkIfSelfCollapsed(snakeDots, gameControls, setGameControls);

    //Check collision with obstacle
    if (gameControls.gameLevel > 1) {
        checkCollisionWithObstacle(
            obstacles,
            moveDirection,
            currentHead,
            gameControls,
            setGameControls
        );
    }
}

export function play(setGameControls, playerName) {
    if (playerName === "") {
        return;
    }

    setGameControls((prevState) => {
        return {
            ...prevState,
            startButton: PLAY_AGAIN_BUTTON_TEXT,
            score: 0,
            alive: true,
            isPaused: false,
            gameLevel: 1,
        };
    });
}

function checkCollisionWithObstacle(
    obstacles,
    moveDirection,
    currentHead,
    gameControls,
    setGameControls
) {
    const [headY, headX] = currentHead;
    let offsetX = headX;
    let offsetY = headY;
    const { UP, DOWN, LEFT, RIGHT } = MOVE_DIRECTIONS;

    switch (moveDirection) {
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

    let obstacleCollidedIndex = obstacles.some(
        ([obstacleX, obstacleY]) =>
            obstacleX * 2 === offsetX && obstacleY * 2 === offsetY
    );

    if (obstacleCollidedIndex) {
        onGameOver(gameControls, setGameControls);
    }
}

function checkIfOutOfBoard(snakeDots, gameControls, setGameControls) {
    let [topPosition, leftPosition] = snakeDots[snakeDots.length - 1];
    if (
        topPosition === BOARD_MAX ||
        leftPosition === BOARD_MAX ||
        topPosition < BOARD_MIN ||
        leftPosition < BOARD_MIN
    ) {
        onGameOver(gameControls, setGameControls);
    }
}

function checkCollisionOnObjectBuild(
    [inputTop, inputLeft],
    snakeDots,
    foodDots,
    obstacles
) {
    if (
        (snakeDots &&
            snakeDots.some(
                ([dotTop, dotLeft]) =>
                    dotTop === inputTop && dotLeft === inputLeft
            )) ||
        (foodDots &&
            foodDots.some(
                ({ dotTop, dotLeft }) =>
                    dotTop === inputTop && dotLeft === inputLeft
            )) ||
        (obstacles &&
            obstacles.some(
                ([dotTop, dotLeft]) =>
                    dotTop === inputTop && dotLeft === inputLeft
            ))
    ) {
        return true;
    }

    return false;
}

function checkIfEat(snakeDots, foodDots, setFoodDots) {
    const head = snakeDots[snakeDots.length - 1];
    const [headY, headX] = head;

    let foodCollidedIndex = foodDots?.findIndex(
        ({ x: foodX, y: foodY }) => foodX === headX && foodY === headY
    );

    if (foodCollidedIndex > -1) {
        setFoodDots((prevFoodDots) => {
            return [
                ...prevFoodDots.slice(0, foodCollidedIndex),
                ...prevFoodDots.slice(foodCollidedIndex + 1),
            ];
        });

        return true;
    }

    return false;
}

//teleport snake on opposite side if out of bounds on level < 3
function snakeWrap(snakeDots, setSnakeDots) {
    let [headX, headY] = snakeDots[snakeDots.length - 1];
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

        const newSnakeDots = [...snakeDots];
        newSnakeDots[newSnakeDots.length - 1] = [newHeadX, newHeadY];

        setSnakeDots(newSnakeDots);
    }
}

function checkIfSelfCollapsed(snakeDots, gameControls, setGameControls) {
    let snake = [...snakeDots];
    const [headTopPosition, headLeftPosition] = snakeDots[snakeDots.length - 1];

    snake.pop();

    const snakeSelfCollided = snake.some(
        ([snakeDotTop, snakeDotLeft]) =>
            headTopPosition === snakeDotTop && headLeftPosition === snakeDotLeft
    );

    if (snakeSelfCollided) {
        onGameOver(gameControls, setGameControls);
    }
}

function increaseSpeed(speed, gameLevel, setSpeed) {
    if (speed > 10) {
        setSpeed((prevSpeed) =>
            gameLevel === 2
                ? prevSpeed - SPEED_STEP_LVL_2
                : prevSpeed - SPEED_STEP_LVL_N
        );
    }
}

function enlargeSnake(snakeDots, moveDirection, setSnakeDots) {
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

    setSnakeDots([...snakeDots, newDot]);
}

function onGameOver(gameControls, setGameControls) {
    const currentGame = {
        playerName: gameControls.playerName,
        score: gameControls.score,
        timestamp: new Date().toISOString(),
    };
    const updatedHistory = [...gameControls.gameHistory, currentGame];

    localStorage.setItem(GAME_HISOTRY, JSON.stringify(updatedHistory));

    setGameControls((prevState) => {
        return {
            ...prevState,
            alive: false,
            moveDirection: MOVE_DIRECTIONS.RIGHT,
            isPaused: true,
            gameHistory: [...prevState.gameHistory, currentGame],
            playerName: "",
            startButtonName: PLAY_AGAIN_BUTTON_TEXT,
        };
    });
}
