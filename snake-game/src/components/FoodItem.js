import { useMemo } from "react";
import { getRandomInt } from "../utils";
import { SVGS } from "../constants";

function FoodItem() {
  const randomFoodItem = useMemo(
    () => SVGS[getRandomInt(0, SVGS.length - 1)],
    []
  );

  return randomFoodItem;
}

export default FoodItem;
