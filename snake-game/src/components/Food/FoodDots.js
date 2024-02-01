import React, { useEffect } from "react";
import { getRandomCoordinates } from "../../utils/gameLogic";
import { v4 as uuidv4 } from "uuid";
import Food from "./Food";

function FoodDots({ isPaused, foodDots, setGameObjects }) {
    useEffect(() => {
        const foodDotGenerate = setTimeout(() => {
            if (!isPaused) {
                setGameObjects((prev) => {
                    const [randomX, randomY] = getRandomCoordinates(
                        prev.snakeDots,
                        prev.foodDots,
                        prev.obstacles
                    );
                    return {
                        ...prev,
                        foodDots: [
                            ...prev.foodDots,
                            {
                                key: uuidv4(),
                                x: randomX,
                                y: randomY,
                            },
                        ],
                    };
                });
            }
        }, 5000);

        return () => {
            clearTimeout(foodDotGenerate);
        };
    }, [isPaused, setGameObjects]);

    useEffect(() => {
        if (!isPaused && foodDots.length > 6) {
            setGameObjects((prev) => {
                return {
                    ...prev,
                    foodDots: [...prev.foodDots.slice(prev.length - 2)],
                };
            });
        }
    }, [isPaused, foodDots.length, setGameObjects]);

    return (
        <>
            {foodDots.length > 0 &&
                foodDots.map(({ key, x, y }) => <Food key={key} x={x} y={y} />)}
        </>
    );
}

export default FoodDots;
