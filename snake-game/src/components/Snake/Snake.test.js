import { fireEvent, render, screen } from "@testing-library/react";
import Snake from "./Snake";
import {
    FoodProvider,
    GameControlsProvider,
    ObstacleProvider,
} from "../../ContextProviders";
import SnakeTail from "./SnakeTail";
import React from "react";
import { useHandleKeyDown, onKeyDown } from "../../hooks/useSnakeControls";

const mockGameControls = {
    alive: false,
    startButtonName: "Play",
    score: 0,
    isPaused: true,
    gameLevel: 1,
    playerName: "",
    gameHistory: [],
};

jest.mock("../../hooks/useSnakeControls", () => ({
    __esModule: true,
    useHandleKeyDown: jest.fn(),
    useHandleTouchStart: jest.fn(),
    useHandleDoubleTap: jest.fn(),
    onKeyDown: jest.fn(),
}));

describe("Snake", () => {
    it("should render the snake game with initial state and controls", () => {
        mockGameControls.alive = true;
        mockGameControls.isPaused = false;

        const setSnakeDots = jest.fn();

        const setSpeed = jest.fn();

        const setMoveDirection = jest.fn();

        render(
            <GameControlsProvider initialValue={mockGameControls}>
                <ObstacleProvider>
                    <FoodProvider>
                        <Snake />
                    </FoodProvider>
                </ObstacleProvider>
            </GameControlsProvider>
        );

        expect(setSnakeDots).not.toHaveBeenCalled();
        expect(setSpeed).not.toHaveBeenCalled();
        expect(setMoveDirection).not.toHaveBeenCalled();
    });

    it("should handle key down event correctly", () => {
        const mockSetGameControls = jest.fn();
        const mockSetMoveDirection = jest.fn();
        const mockIsPaused = false;
        const mockMoveDirection = "RIGHT";

        useHandleKeyDown.mockImplementationOnce(() => {
            onKeyDown(
                {},
                mockIsPaused,
                mockMoveDirection,
                mockSetMoveDirection,
                mockSetGameControls
            );
        });

        render(
            <GameControlsProvider initialValue={mockGameControls}>
                <ObstacleProvider>
                    <FoodProvider>
                        <Snake />
                    </FoodProvider>
                </ObstacleProvider>
            </GameControlsProvider>
        );

        fireEvent.keyDown(document, { keyCode: 37 }); // Left arrow key

        expect(useHandleKeyDown).toHaveBeenCalledWith(
            onKeyDown,
            mockIsPaused,
            mockMoveDirection,
            expect.any(Function),
            expect.any(Function)
        );
    });

    it('should set moveDirection to "Left" on left arrow key press', () => {
        const mockSetGameControls = jest.fn();
        const mockIsPaused = false;
        const mockMoveDirection = "RIGHT";
        const mockSetMoveDirection = jest.fn();

        jest.spyOn(useHandleKeyDown, 'mockReturnValue').mockImplementationOnce((onKeyDown) => {
            onKeyDown(
                { keyCode: 37 },
                mockIsPaused,
                mockMoveDirection,
                mockSetMoveDirection,
                mockSetGameControls
            );
        });

        render(
            <GameControlsProvider initialValue={mockGameControls}>
                <ObstacleProvider>
                    <FoodProvider>
                        <Snake />
                    </FoodProvider>
                </ObstacleProvider>
            </GameControlsProvider>
        );

        fireEvent.keyDown(document, { keyCode: 37 });

        expect(useHandleKeyDown).toHaveBeenCalled();

        expect(mockSetMoveDirection).toHaveBeenCalledWith("LEFT");
    });

    it('should render a polygon element with class "snake-item snake-tail"', () => {
        render(<SnakeTail snakeDot={[]} snakeDotAdjacent={[]} />);
        const polygonElement = screen.getByTestId("snake-tail");
        expect(polygonElement).toBeInTheDocument();
        expect(polygonElement).toHaveClass("snake-item snake-tail");
    });
});
