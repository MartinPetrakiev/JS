import React, { useContext, useEffect } from "react";
import { getRandomCoordinates } from "../../utils/gameLogic";
import { v4 as uuidv4 } from "uuid";
import Food from "./Food";
import {
    FoodObstaclesContext,
    GameControlsContext,
} from "../../ContextProviders";

function FoodDots() {
    const { foodDots, setFoodDots, obstacles } =
        useContext(FoodObstaclesContext);
    const { gameControls } = useContext(GameControlsContext);
    const { isPaused } = gameControls;

    useEffect(() => {
        const foodDotGenerate = setTimeout(() => {
            if (!isPaused) {
                setFoodDots((prev) => {
                    const [randomX, randomY] = getRandomCoordinates(
                        [],
                        prev,
                        obstacles
                    );
                    return [
                        ...prev,
                        {
                            key: uuidv4(),
                            x: randomX,
                            y: randomY,
                        },
                    ];
                });
            }
        }, 5000);

        return () => {
            clearTimeout(foodDotGenerate);
        };
    }, [isPaused, setFoodDots, foodDots.length, obstacles]);

    useEffect(() => {
        if (!isPaused && foodDots.length > 6) {
            setFoodDots((prev) => {
                return [...prev.slice(prev.length - 2)];
            });
        }
    }, [isPaused, foodDots.length, setFoodDots]);

    return (
        <>
            {foodDots.length > 0 &&
                foodDots.map(({ key, x, y }) => <Food key={key} x={x} y={y} />)}
        </>
    );
}

export default React.memo(FoodDots);
