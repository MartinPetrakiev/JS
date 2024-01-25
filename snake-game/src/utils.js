import { BOARD_MAX, KEYBOARD_KEYS, OBSTACLE_SIZE } from "./constants";

export function onKeyDown(e, isPaused, setMoveDirection, setIsPaused) {
  const { UP, DOWN, LEFT, RIGHT, PAUSE } = KEYBOARD_KEYS;

  switch (e.keyCode) {
    case UP:
      !isPaused && setMoveDirection("UP");
      break;
    case DOWN:
      !isPaused && setMoveDirection("DOWN");
      break;
    case LEFT:
      !isPaused && setMoveDirection("LEFT");
      break;
    case RIGHT:
      !isPaused && setMoveDirection("RIGHT");
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
