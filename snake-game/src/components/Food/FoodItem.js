import { useMemo } from "react";
import { getRandomInt } from "../../utils/utils";
import { DISCO_BALL_SVG, SVGS } from "../../utils/constants";

function FoodItem({ disco }) {
    const randomFoodItem = useMemo(() => {
        return disco ? DISCO_BALL_SVG : SVGS[getRandomInt(0, SVGS.length - 1)];
    }, [disco]);

    return randomFoodItem;
}

export default FoodItem;
