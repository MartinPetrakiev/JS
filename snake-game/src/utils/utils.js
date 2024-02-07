import { useCallback, useRef } from "react";
import {
    KEYBOARD_KEYS,
    MOVE_DIRECTIONS,
    OFFSET_X_FULL,
    OFFSET_X_HALF,
} from "./constants";

export function onKeyDown(e, isPaused, setMoveDirection, setGameControls) {
    const { UP, DOWN, LEFT, RIGHT, PAUSE } = KEYBOARD_KEYS;

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

export function UseHandleTouchStart(isPaused, setMoveDirection) {
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
                        endY
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
        [isPaused, setMoveDirection]
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

export const calculateSwipeDirection = (startX, startY, endX, endY) => {
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    if (angle >= -45 && angle < 45) {
        return MOVE_DIRECTIONS.RIGHT;
    } else if (angle >= 45 && angle < 135) {
        return MOVE_DIRECTIONS.DOWN;
    } else if (angle >= -135 && angle < -45) {
        return MOVE_DIRECTIONS.UP;
    } else {
        return MOVE_DIRECTIONS.LEFT;
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
