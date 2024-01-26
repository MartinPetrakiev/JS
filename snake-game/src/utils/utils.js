import { KEYBOARD_KEYS, MOVE_DIRECTIONS } from "./constants";

export function onKeyDown(e, isPaused, setMoveDirection, setIsPaused) {
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
      !isPaused ? setIsPaused(true) : setIsPaused(false);
      break;
    default:
      break;
  }
}

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
