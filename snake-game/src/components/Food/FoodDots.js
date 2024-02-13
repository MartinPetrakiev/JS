import React, { useEffect } from "react";
import Food from "./Food";
import { useFoodContext, useGameControls } from "../../ContextProviders";
import { generateFoodDots } from "../../utils/utils";

function FoodDots() {
    const { foodDots, setFoodDots, obstacles } = useFoodContext();
    const { gameControls } = useGameControls();
    const { isPaused } = gameControls;

    useEffect(() => {
        const foodGenerateTimeout = generateFoodDots(isPaused, setFoodDots, obstacles);

        return () => {
            clearTimeout(foodGenerateTimeout);
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
