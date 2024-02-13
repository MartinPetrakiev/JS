import { fireEvent, render, screen } from "@testing-library/react";
import Snake from "./Snake";
import {
    FoodProvider,
    GameControlsProvider,
    ObstacleProvider,
} from "../../ContextProviders";
import { v4 as uuidv4 } from "uuid";
import SnakeTail from "./SnakeTail";
import SnakeBodyItem from "./SnakeBodyItem";
import SnakeHead from "./SnakeHead";

const mockGameControls = {
    alive: false,
    startButtonName: "Play",
    score: 0,
    isPaused: true,
    gameLevel: 1,
    playerName: "",
    gameHistory: [],
};

const mockFoodDots = [{ key: uuidv4(), x: 10, y: 10 }];

describe("Snake", () => {
    it("should render the snake game with initial state and controls", () => {
        mockGameControls.alive = true;
        mockGameControls.isPaused = false;

        const snakeDots = [
            [2, 2],
            [2, 4],
            [2, 6],
            [2, 8],
        ];
        const setSnakeDots = jest.fn();

        const speed = 240;
        const setSpeed = jest.fn();

        const moveDirection = "RIGHT";
        const setMoveDirection = jest.fn();

        render(
            <GameControlsProvider initialValue={mockGameControls}>
                <ObstacleProvider initialObstacles={[]}>
                    <FoodProvider initialFoodDots={mockFoodDots}>
                        <Snake
                            snakeDots={snakeDots}
                            setSnakeDots={setSnakeDots}
                            speed={speed}
                            setSpeed={setSpeed}
                            moveDirection={moveDirection}
                            setMoveDirection={setMoveDirection}
                        />
                    </FoodProvider>
                </ObstacleProvider>
            </GameControlsProvider>
        );

        expect(setSnakeDots).not.toHaveBeenCalled();
        expect(setSpeed).not.toHaveBeenCalled();
        expect(setMoveDirection).not.toHaveBeenCalled();
    });

    it("should move the snake in the specified direction", () => {
        mockGameControls.alive = true;
        mockGameControls.isPaused = false;

        const snakeDots = [
            [2, 2],
            [2, 4],
            [2, 6],
            [2, 8],
        ];
        const setSnakeDots = jest.fn();

        const speed = 240;
        const setSpeed = jest.fn();

        const moveDirection = "RIGHT";
        const setMoveDirection = jest.fn();

        render(<SnakeBodyItem snakeDot={[2, 4]} />);
        render(<SnakeTail snakeDot={[2, 2]} snakeDotAdjacent={[2, 4]} />);
        render(<SnakeHead x={2} y={8} />);

        render(
            <GameControlsProvider initialValue={mockGameControls}>
                <ObstacleProvider initialObstacles={[]}>
                    <FoodProvider initialFoodDots={mockFoodDots}>
                        <Snake
                            snakeDots={snakeDots}
                            setSnakeDots={setSnakeDots}
                            speed={speed}
                            setSpeed={setSpeed}
                            moveDirection={moveDirection}
                            setMoveDirection={setMoveDirection}
                        />
                    </FoodProvider>
                </ObstacleProvider>
            </GameControlsProvider>
        );

        fireEvent.keyDown(document, { keyCode: 37 }); // Left arrow key

        expect(setMoveDirection).toHaveBeenCalled();
    });

    it('should render a polygon element with class "snake-item snake-tail"', () => {
        render(<SnakeTail snakeDot={[]} snakeDotAdjacent={[]} />);
        const polygonElement = screen.getByTestId("snake-tail");
        expect(polygonElement).toBeInTheDocument();
        expect(polygonElement).toHaveClass("snake-item snake-tail");
    });
});
