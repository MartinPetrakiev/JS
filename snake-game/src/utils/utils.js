import { KEYBOARD_KEYS, MOVE_DIRECTIONS } from "./constants";

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
