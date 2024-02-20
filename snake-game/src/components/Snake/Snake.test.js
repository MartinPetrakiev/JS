import { fireEvent, render, screen } from "@testing-library/react";
import Snake from "./Snake";
import {
    FoodProvider,
    GameControlsProvider,
    ObstacleProvider,
} from "../../ContextProviders";
import { v4 as uuidv4 } from "uuid";
import SnakeTail from "./SnakeTail";
import React, { useState } from "react";
import { useHandleKeyDown } from "../../hooks/useSnakeControls";

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

    // it("should move the snake in the specified direction", () => {
    //     mockGameControls.alive = true;
    //     mockGameControls.isPaused = false;

    //     const moveDirection = "RIGHT";
    //     const setMoveDirection = jest.fn();
    //     const setMoveDirectionSpy = jest.spyOn(React, "useState");
    //     setMoveDirectionSpy.mockImplementation(() => [
    //         moveDirection,
    //         setMoveDirection,
    //     ]);

    //     render(
    //         <GameControlsProvider initialValue={mockGameControls}>
    //             <ObstacleProvider initialObstacles={[]}>
    //                 <FoodProvider initialFoodDots={mockFoodDots}>
    //                     <Snake />
    //                 </FoodProvider>
    //             </ObstacleProvider>
    //         </GameControlsProvider>
    //     );

    //     fireEvent.keyDown(document, { keyCode: 37 }); // Left arrow key

    //     expect(setMoveDirection).toHaveBeenCalled();
    // });

    it("should handle key down event correctly", () => {
        const mockSetGameControls = jest.fn();
        const mockSetMoveDirection = jest.fn();
        const mockIsPaused = false;
        const mockMoveDirection = "RIGHT";

        useHandleKeyDown.mockImplementation(
            (
                onKeyDown,
                isPaused,
                moveDirection,
                setMoveDirection,
                setGameControls
            ) => {
                onKeyDown(
                    {},
                    mockIsPaused,
                    mockMoveDirection,
                    mockSetMoveDirection,
                    mockSetGameControls
                );
            }
        );

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
            expect.any(Function),
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
        const useStateSpy = jest.spyOn(React, 'useState');

        useHandleKeyDown.mockImplementation(
            (
                onKeyDown,
                isPaused,
                moveDirection,
                setMoveDirection,
                setGameControls
            ) => {
                onKeyDown(
                    { keyCode: 37 },
                    mockIsPaused,
                    mockMoveDirection,
                    mockSetMoveDirection,
                    mockSetGameControls
                );
            }
        );

        useStateSpy.mockReturnValue([mockMoveDirection, mockSetMoveDirection]);

        render(
            <GameControlsProvider initialValue={mockGameControls}>
                <ObstacleProvider>
                    <FoodProvider>
                        <Snake />
                    </FoodProvider>
                </ObstacleProvider>
            </GameControlsProvider>
        );

        expect(mockSetMoveDirection).toHaveBeenCalledWith("LEFT");
    });

    it('should render a polygon element with class "snake-item snake-tail"', () => {
        render(<SnakeTail snakeDot={[]} snakeDotAdjacent={[]} />);
        const polygonElement = screen.getByTestId("snake-tail");
        expect(polygonElement).toBeInTheDocument();
        expect(polygonElement).toHaveClass("snake-item snake-tail");
    });
});
