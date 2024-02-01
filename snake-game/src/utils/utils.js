import { KEYBOARD_KEYS, MOVE_DIRECTIONS, OFFSET_X_FULL, OFFSET_X_HALF } from "./constants";

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
                    isPaused: !isPaused
                };
            });
            break;
        default:
            break;
    }
}

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
      pointsString = TRIANGLE_POINTS_UP.map(({ x, y }) => `${x},${y}`).join(" ");
    } else if (adjDotX > dotX) {
      pointsString = TRIANGLE_POINTS_DOWN.map(({ x, y }) => `${x},${y}`).join(
        " ",
      );
    } else if (adjDotY < dotY) {
      pointsString = TRIANGLE_POINTS_LEFT.map(({ x, y }) => `${x},${y}`).join(
        " ",
      );
    } else if (adjDotY > dotY) {
      pointsString = TRIANGLE_POINTS_RIGHT.map(({ x, y }) => `${x},${y}`).join(
        " ",
      );
    }

    return pointsString;
}