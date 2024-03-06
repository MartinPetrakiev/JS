import { screen, fireEvent, render } from "@testing-library/react";
import Snake from "./Snake";
import {
    FoodProvider,
    GameControlsProvider,
    ObstacleProvider,
} from "../../ContextProviders";
import SnakeTail from "./SnakeTail";
import React, { useState as useStateMock } from "react";
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

jest.mock("react", () => ({
    ...jest.requireActual("react"),
    useState: jest.fn(),
}));

describe("Snake", () => {
    const mockSetSnakeDots = jest.fn();
    const mockSetMoveDirection = jest.fn();

    beforeEach(() => {
        useStateMock.mockImplementation(jest.requireActual("react").useState);
    });

    it("should render the snake game with initial state and controls", () => {
        mockGameControls.alive = true;
        mockGameControls.isPaused = false;

        render(
            <GameControlsProvider initialValue={mockGameControls}>
                <ObstacleProvider>
                    <FoodProvider>
                        <Snake />
                    </FoodProvider>
                </ObstacleProvider>
            </GameControlsProvider>
        );

        expect(mockSetSnakeDots).not.toHaveBeenCalled();
        expect(mockSetMoveDirection).not.toHaveBeenCalled();
    });

    it("should handle key down event correctly", () => {
        const mockSetGameControls = jest.fn();
        const mockIsPaused = false;
        const mockMoveDirection = "RIGHT";

        useHandleKeyDown.mockImplementationOnce((onKeyDown) => {
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

        // fireEvent.keyDown(window.document, { keyCode: 37 }); // Left arrow key

        expect(useHandleKeyDown).toHaveBeenCalledWith(
            onKeyDown,
            mockIsPaused,
            mockMoveDirection,
            expect.any(Function),
            expect.any(Function)
        );
    });

    it('should set moveDirection to "Left" on left arrow key press', () => {
        const mockIsPaused = false;
        const mockMoveDirection = "RIGHT";

        render(
            <GameControlsProvider initialValue={mockGameControls}>
                <ObstacleProvider>
                    <FoodProvider>
                        <Snake />
                    </FoodProvider>
                </ObstacleProvider>
            </GameControlsProvider>
        );

        const snakeHeadElement = screen.getByTestId("snake-head");
        snakeHeadElement.focus();

        fireEvent.keyDown(document, { keyCode: 37 });

        expect(useHandleKeyDown).toHaveBeenCalled();

        expect(useHandleKeyDown).toHaveBeenCalledWith(
            onKeyDown,
            mockIsPaused,
            mockMoveDirection,
            expect.any(Function),
            expect.any(Function)
        );

        expect(snakeHeadElement.getAttribute("data-move-direction")).toBe(
            "LEFT"
        );
    });

    it('should render a polygon element with class "snake-item snake-tail"', () => {
        render(<SnakeTail snakeDot={[]} snakeDotAdjacent={[]} />);
        const polygonElement = screen.getByTestId("snake-tail");
        expect(polygonElement).toBeInTheDocument();
        expect(polygonElement).toHaveClass("snake-item snake-tail");
    });
});
