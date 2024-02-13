import { useCallback, useEffect, useRef } from "react";
import {
    KEYBOARD_KEYS,
    LEVEL_2,
    LEVEL_3,
    MOVE_DIRECTIONS,
    OFFSET_X_FULL,
    OFFSET_X_HALF,
} from "./constants";
import { generateRandomObstacle, getRandomCoordinates } from "./gameLogic";
import { v4 as uuidv4 } from "uuid";

export function onKeyDown(
    e,
    isPaused,
    moveDirection,
    setMoveDirection,
    setGameControls
) {
    const { UP, DOWN, LEFT, RIGHT, PAUSE } = KEYBOARD_KEYS;
    const oppositeDirections = {
        [RIGHT]: MOVE_DIRECTIONS.LEFT,
        [LEFT]: MOVE_DIRECTIONS.RIGHT,
        [DOWN]: MOVE_DIRECTIONS.UP,
        [UP]: MOVE_DIRECTIONS.DOWN,
    };

    if (moveDirection === oppositeDirections[e.keyCode]) {
        return;
    }

    switch (e.keyCode) {
        case UP:
            !isPaused && setMoveDirection(MOVE_DIRECTIONS.UP);
            break;
        case DOWN:
            !isPaused && setMoveDirection(MOVE_DIRECTIONS.DOWN);
            break;
        case LEFT:
            !isPaused && setMoveDirection(MOVE_DIRECTIONS.LEFT);
            break;
        case RIGHT:
            !isPaused && setMoveDirection(MOVE_DIRECTIONS.RIGHT);
            break;
        case PAUSE:
            setGameControls((prevState) => {
                return {
                    ...prevState,
                    isPaused: !isPaused,
                };
            });
            break;
        default:
            break;
    }
}

export function UseHandleTouchStart(
    isPaused,
    currentDirection,
    setMoveDirection
) {
    return useCallback(
        (e) => {
            if (!isPaused) {
                const touch = e.touches[0];
                const startX = touch.clientX;
                const startY = touch.clientY;

                const handleTouchEnd = (e) => {
                    const touch = e.changedTouches[0];
                    const endX = touch.clientX;
                    const endY = touch.clientY;

                    const swipeDirection = calculateSwipeDirection(
                        startX,
                        startY,
                        endX,
                        endY,
                        currentDirection
                    );

                    switch (swipeDirection) {
                        case MOVE_DIRECTIONS.UP:
                            setMoveDirection(MOVE_DIRECTIONS.UP);
                            break;
                        case MOVE_DIRECTIONS.DOWN:
                            setMoveDirection(MOVE_DIRECTIONS.DOWN);
                            break;
                        case MOVE_DIRECTIONS.LEFT:
                            setMoveDirection(MOVE_DIRECTIONS.LEFT);
                            break;
                        case MOVE_DIRECTIONS.RIGHT:
                            setMoveDirection(MOVE_DIRECTIONS.RIGHT);
                            break;
                        default:
                            break;
                    }
                };

                document.addEventListener("touchend", handleTouchEnd);

                return () => {
                    document.removeEventListener("touchend", handleTouchEnd);
                };
            }
        },
        [isPaused, currentDirection, setMoveDirection]
    );
}

export const UseDoubleTapCallback = (isPaused, setGameControls) => {
    const lastTapTimeRef = useRef(0);

    return useCallback(() => {
        const now = Date.now();
        const timeSinceLastTap = now - lastTapTimeRef.current;

        if (timeSinceLastTap < 300) {
            setGameControls((prevState) => {
                return {
                    ...prevState,
                    isPaused: !isPaused,
                };
            });
        }

        lastTapTimeRef.current = now;
    }, [isPaused, setGameControls]);
};

export const calculateSwipeDirection = (
    startX,
    startY,
    endX,
    endY,
    currentDirection
) => {
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    const oppositeDirections = {
        [MOVE_DIRECTIONS.RIGHT]: MOVE_DIRECTIONS.LEFT,
        [MOVE_DIRECTIONS.LEFT]: MOVE_DIRECTIONS.RIGHT,
        [MOVE_DIRECTIONS.DOWN]: MOVE_DIRECTIONS.UP,
        [MOVE_DIRECTIONS.UP]: MOVE_DIRECTIONS.DOWN,
    };

    if (angle >= -45 && angle < 45) {
        return MOVE_DIRECTIONS.RIGHT === oppositeDirections[currentDirection]
            ? currentDirection
            : MOVE_DIRECTIONS.RIGHT;
    } else if (angle >= 45 && angle < 135) {
        return MOVE_DIRECTIONS.DOWN === oppositeDirections[currentDirection]
            ? currentDirection
            : MOVE_DIRECTIONS.DOWN;
    } else if (angle >= -135 && angle < -45) {
        return MOVE_DIRECTIONS.UP === oppositeDirections[currentDirection]
            ? currentDirection
            : MOVE_DIRECTIONS.UP;
    } else {
        return MOVE_DIRECTIONS.LEFT === oppositeDirections[currentDirection]
            ? currentDirection
            : MOVE_DIRECTIONS.LEFT;
    }
};

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function handlePlayerNameInput(e, stateSetter) {
    stateSetter((prevState) => {
        return {
            ...prevState,
            playerName: e.target.value,
        };
    });
}

export function buildSnakeTailPoints(snakeDot, snakeDotAdjacent) {
    const [dotX, dotY] = snakeDot.map((x) => x * OFFSET_X_HALF);
    const [adjDotX, adjDotY] = snakeDotAdjacent.map((x) => x * OFFSET_X_HALF);

    const TRIANGLE_POINTS_UP = [
        { x: dotY, y: dotX },
        { x: dotY + OFFSET_X_FULL, y: dotX },
        { x: dotY + OFFSET_X_HALF, y: dotX + OFFSET_X_FULL },
    ];

    const TRIANGLE_POINTS_RIGHT = [
        { x: dotY + OFFSET_X_FULL, y: dotX },
        { x: dotY + OFFSET_X_FULL, y: dotX + OFFSET_X_FULL },
        { x: dotY, y: dotX + OFFSET_X_HALF },
    ];

    const TRIANGLE_POINTS_LEFT = [
        { x: dotY, y: dotX },
        { x: dotY, y: dotX + OFFSET_X_FULL },
        { x: dotY + OFFSET_X_FULL, y: dotX + OFFSET_X_HALF },
    ];

    const TRIANGLE_POINTS_DOWN = [
        { x: dotY + OFFSET_X_HALF, y: dotX },
        { x: dotY, y: dotX + OFFSET_X_FULL },
        { x: dotY + OFFSET_X_FULL, y: dotX + OFFSET_X_FULL },
    ];

    let pointsString = "";

    if (adjDotX < dotX) {
        pointsString = TRIANGLE_POINTS_UP.map(({ x, y }) => `${x},${y}`).join(
            " "
        );
    } else if (adjDotX > dotX) {
        pointsString = TRIANGLE_POINTS_DOWN.map(({ x, y }) => `${x},${y}`).join(
            " "
        );
    } else if (adjDotY < dotY) {
        pointsString = TRIANGLE_POINTS_LEFT.map(({ x, y }) => `${x},${y}`).join(
            " "
        );
    } else if (adjDotY > dotY) {
        pointsString = TRIANGLE_POINTS_RIGHT.map(
            ({ x, y }) => `${x},${y}`
        ).join(" ");
    }

    return pointsString;
}

export const generateFoodDots = (isPaused, setFoodDots, obstacles) =>
    setTimeout(() => {
        if (!isPaused) {
            setFoodDots((prev) => {
                const [randomX, randomY] = getRandomCoordinates(
                    prev,
                    obstacles
                );
                return [
                    ...prev,
                    {
                        key: uuidv4(),
                        x: randomX,
                        y: randomY,
                        disco: getRandomInt(1, 100) > 50,
                    },
                ];
            });
        }
    }, 5000);

export const generateObstacles = (gameLevel, foodDotsRef, setObstacles) => {
    const numberOfObstacles = gameLevel > 2 ? LEVEL_3 : LEVEL_2;
    const newObstacles = Array.from({ length: numberOfObstacles }, () =>
        generateRandomObstacle(foodDotsRef)
    );
    
    setObstacles(newObstacles);
};

export const useHandleKeyDown = (
    onKeyDown,
    isPaused,
    moveDirection,
    setMoveDirection,
    setGameControls
) => {
    const handleKeyDown = useCallback(
        (e) => {
            onKeyDown(e, isPaused, moveDirection, setMoveDirection, setGameControls);
        },
        [isPaused, moveDirection,  setMoveDirection, setGameControls, onKeyDown]
    );

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);
};

export const useHandleTouchStart = (
    isPaused,
    currentDirection,
    setMoveDirection
) => {
    const handleTouchStartCallback = UseHandleTouchStart(
        isPaused,
        currentDirection,
        setMoveDirection
    );

    useEffect(() => {
        document.addEventListener("touchstart", handleTouchStartCallback);

        return () => {
            document.removeEventListener(
                "touchstart",
                handleTouchStartCallback
            );
        };
    }, [isPaused, handleTouchStartCallback]);
};

export const useHandleDoubleTap = (isPaused, setGameControls) => {
    const handleDoubleTap = UseDoubleTapCallback(isPaused, setGameControls);

    useEffect(() => {
        document.addEventListener("touchend", handleDoubleTap);

        return () => {
            document.removeEventListener("touchend", handleDoubleTap);
        };
    }, [handleDoubleTap]);
};
