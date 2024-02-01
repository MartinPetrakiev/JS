import {
    BOARD_MIN,
    BOARD_MAX,
    SNAKE_DOT_SIZE,
    OBSTACLE_SIZE,
    MOVE_DIRECTIONS,
    GAME_HISOTRY,
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

export function moveSnake(isAlive, moveDirection, snakeDots, setGameObjects) {
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

        setGameObjects((prevState) => {
            return {
                ...prevState,
                snakeDots: currentSnakeDots,
            };
        });
    }
}

export function gameRun(gameParams, gameStateSetters) {
    const { snakeDots } = gameParams.gameObjects;
    let currentHead = snakeDots[snakeDots.length - 1];

    checkIfEat(gameParams, gameStateSetters);
    onOutOfBounds(gameParams, gameStateSetters);
    checkIfSelfCollapsed(gameParams, currentHead, gameStateSetters);

    if (gameParams.gameControls.gameLevel > 1) {
        checkCollisionWithObstacle(gameParams, currentHead, gameStateSetters);
    }

    if (gameParams.gameControls.gameLevel > 2) {
        checkIfOutOfBoard(gameParams, gameStateSetters);
    }
}

export function play(setGameControls, playerName) {
    if (playerName === "") {
        return;
    }

    setGameControls((prevState) => {
        return {
            ...prevState,
            startButton: "Play again",
            score: 0,
            alive: true,
            isPaused: false,
            gameLevel: 1,
        };
    });
}

function checkCollisionWithObstacle(gameParams, currentHead, gameStateSetters) {
    const obstacles = gameParams.gameObjects.obstacles;
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
        onGameOver(gameParams.gameControls, gameStateSetters);
    }
}

function checkIfOutOfBoard({ gameObjects, gameControls }, gameStateSetters) {
    let [topPosition, leftPosition] =
        gameObjects.snakeDots[gameObjects.snakeDots.length - 1];
    if (
        topPosition === BOARD_MAX ||
        leftPosition === BOARD_MAX ||
        topPosition < BOARD_MIN ||
        leftPosition < BOARD_MIN
    ) {
        onGameOver(gameControls, gameStateSetters);
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

    for (let { dotTop, dotLeft } of foodDots) {
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

function checkIfEat(gameParams, { setGameObjects, setGameControls, setSpeed }) {
    const { snakeDots, foodDots } = gameParams.gameObjects;
    const head = snakeDots[snakeDots.length - 1];
    const [headY, headX] = head;

    let foodCollidedIndex = foodDots?.findIndex(
        ({ x: foodX, y: foodY }) => foodX === headX && foodY === headY
    );

    if (foodCollidedIndex > -1) {
        setGameObjects((prev) => {
            return {
                ...prev,
                foodDots: [
                    ...prev.foodDots.slice(0, foodCollidedIndex),
                    ...prev.foodDots.slice(foodCollidedIndex + 1),
                ],
            };
        });

        enlargeSnake(gameParams, setGameObjects);

        const { gameLevel, score } = gameParams.gameControls

        if (gameLevel > 1) {
            increaseSpeed(gameParams, setSpeed);
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
}

function onOutOfBounds({ gameObjects }, { setGameObjects }) {
    const { snakeDots } = gameObjects;
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

        setGameObjects((prevState) => {
            return {
                ...prevState,
                snakeDots: newSnakeDots,
            };
        });
    }
}

function checkIfSelfCollapsed(gameParams, head, gameStateSetters) {
    const { snakeDots } = gameParams.gameObjects;
    let snake = [...snakeDots];
    const [headTopPosition, headLeftPosition] = head;

    snake.pop();

    snake.forEach(([snakeDotTop, snakeDotLeft], index) => {
        if (
            headTopPosition === snakeDotTop &&
            headLeftPosition === snakeDotLeft
        ) {
            onGameOver(gameParams.gameControls, gameStateSetters);
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

function enlargeSnake({ gameObjects, moveDirection }, setGameObjects) {
    const { snakeDots } = gameObjects;
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
    setGameObjects((prevState) => {
        return {
            ...prevState,
            snakeDots: newSnake,
        };
    });
}

function onGameOver(gameControls, gameStateSetters) {
    const currentGame = {
        playerName: gameControls.playerName,
        score: gameControls.score,
        timestamp: new Date().toISOString(),
    };
    const updatedHistory = [...gameControls.gameHistory, currentGame];

    localStorage.setItem(GAME_HISOTRY, JSON.stringify(updatedHistory));

    gameStateSetters.setGameControls((prevState) => {
        return {
            ...prevState,
            alive: false,
            moveDirection: MOVE_DIRECTIONS.RIGHT,
            isPaused: true,
            gameHistory: [...prevState.gameHistory, currentGame],
            playerName: "",
            startButtonName: "Play again",
        };
    });
}
