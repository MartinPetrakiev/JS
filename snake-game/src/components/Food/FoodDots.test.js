import { render, screen } from "@testing-library/react";
import {
    FoodProvider,
    GameControlsProvider,
    ObstacleProvider,
} from "../../ContextProviders";
import React, { useState as useStateMock } from "react";
import FoodDots from "./FoodDots";
import Food from "./Food";

jest.mock("../../utils/utils", () => ({
    generateFoodDots: jest.fn(),
    getRandomInt: jest.fn(),
}));

jest.mock("react", () => ({
    ...jest.requireActual("react"),
    useState: jest.fn(),
}));

jest.mock("./Food", () => ({
    __esModule: true,
    default: jest
        .fn()
        .mockImplementation(({ x, y, disco, alcohol }) => (
            <div
                data-testid="mock-food"
                data-x={x}
                data-y={y}
                data-disco={disco}
                data-alcohol={alcohol}
            ></div>
        )),
}));

describe("FoodDots", () => {
    const mockSetFoodDots = jest.fn();

    beforeEach(() => {
        jest.useFakeTimers();
        useStateMock.mockImplementation((init) => [init, mockSetFoodDots]);
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    it("should not render any food items when foodDots state is empty", () => {
        const foodDots = [];
        const obstacles = [];
        const gameControls = { isPaused: false, gameLevel: 1 };
        const useEffect = jest.spyOn(React, "useEffect");

        render(
            <GameControlsProvider initialValue={gameControls}>
                <ObstacleProvider initialObstacles={obstacles}>
                    <FoodProvider initialFoodDots={foodDots}>
                        <FoodDots />
                    </FoodProvider>
                </ObstacleProvider>
            </GameControlsProvider>
        );

        expect(useEffect).toHaveBeenCalledTimes(2);
        expect(useEffect).toHaveBeenCalledWith(expect.any(Function), [
            false,
            1,
            mockSetFoodDots,
            0,
            [],
        ]);
        expect(useEffect).toHaveBeenCalledWith(expect.any(Function), [
            false,
            0,
            mockSetFoodDots,
        ]);
        expect(Food).not.toHaveBeenCalled();
    });

    it("should generate new food dots based on game level and obstacles", () => {
        const foodDots = [
            { key: "1", x: 1, y: 2, disco: false, alcohol: false },
            { key: "2", x: 3, y: 4, disco: true, alcohol: false },
        ];
        const obstacles = [];
        const gameControls = { isPaused: false, gameLevel: 1 };
        const useEffect = jest.spyOn(React, "useEffect");

        render(
            <GameControlsProvider initialValue={gameControls}>
                <ObstacleProvider initialObstacles={obstacles}>
                    <FoodProvider initialFoodDots={foodDots}>
                        <FoodDots />
                    </FoodProvider>
                </ObstacleProvider>
            </GameControlsProvider>
        );

        expect(useEffect).toHaveBeenCalledTimes(2);
        expect(useEffect).toHaveBeenCalledWith(expect.any(Function), [
            false,
            1,
            mockSetFoodDots,
            2,
            [],
        ]);
        expect(useEffect).toHaveBeenCalledWith(expect.any(Function), [
            false,
            2,
            mockSetFoodDots,
        ]);
        expect(Food).toHaveBeenCalledTimes(2);
        expect(Food).toHaveBeenCalledWith(
            { x: 1, y: 2, disco: false, alcohol: false },
            {}
        );
        expect(Food).toHaveBeenCalledWith(
            { x: 3, y: 4, disco: true, alcohol: false },
            {}
        );
    });

    it("should not generate new food dots when game is paused", () => {
        const obstacles = [];
        const gameControls = { isPaused: true, gameLevel: 1 };
        const useEffect = jest.spyOn(React, "useEffect");
        const clearTimeout = jest.spyOn(global, "clearTimeout");

        render(
            <GameControlsProvider initialValue={gameControls}>
                <ObstacleProvider initialObstacles={obstacles}>
                    <FoodProvider initialFoodDots={[]}>
                        <FoodDots />
                    </FoodProvider>
                </ObstacleProvider>
            </GameControlsProvider>
        );

        expect(useEffect).toHaveBeenCalledTimes(2);
        expect(useEffect).toHaveBeenCalledWith(expect.any(Function), [
            true,
            1,
            mockSetFoodDots,
            0,
            [],
        ]);
        expect(useEffect).toHaveBeenCalledWith(expect.any(Function), [
            true,
            0,
            mockSetFoodDots,
        ]);
        expect(clearTimeout).not.toHaveBeenCalled();
    });

    it("should render food items when foodDots state is not empty", () => {
        const foodDots = [
            { key: "1", x: 1, y: 2, disco: false, alcohol: false },
            { key: "2", x: 3, y: 4, disco: true, alcohol: false },
        ];
        const obstacles = [];
        const gameControls = { isPaused: false, gameLevel: 1 };
        const useEffect = jest.spyOn(React, "useEffect");

        render(
            <GameControlsProvider initialValue={gameControls}>
                <ObstacleProvider initialObstacles={obstacles}>
                    <FoodProvider initialFoodDots={foodDots}>
                        <FoodDots />
                    </FoodProvider>
                </ObstacleProvider>
            </GameControlsProvider>
        );

        expect(Food).toHaveBeenCalledTimes(2);
        expect(Food).toHaveBeenCalledWith(
            expect.objectContaining(
                { x: 1, y: 2, disco: false, alcohol: false },
                {}
            )
        );
        expect(screen.getByTestId("mock-food")).toBeInTheDocument();

        expect(useEffect).toHaveBeenCalledTimes(2);
        expect(useEffect).toHaveBeenCalledWith(expect.any(Function), [
            false,
            1,
            mockSetFoodDots,
            2,
            [],
        ]);
        expect(useEffect).toHaveBeenCalledWith(expect.any(Function), [
            false,
            2,
            mockSetFoodDots,
        ]);
    });
});
