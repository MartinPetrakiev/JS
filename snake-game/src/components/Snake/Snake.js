import React from "react";
import SnakeTail from "./SnakeTail";
import SnakeHead from "./SnakeHead";
import SnakeBodyItem from "./SnakeBodyItem";

function Snake({ snakeDots }) {
    return (
        <>
            {snakeDots?.map((snakeDot, index, allDots) => (
                <React.Fragment key={index}>
                    <SnakeTail
                        index={index}
                        snakeDot={snakeDot}
                        snakeDotAdjacent={allDots[1]}
                    />
                    <SnakeBodyItem index={index} lastDotIndex={allDots.length - 1} snakeDot={snakeDot} />
                    <SnakeHead index={index} lastDotIndex={allDots.length - 1} x={snakeDot[1]} y={snakeDot[0]} />
                </React.Fragment>
            ))}
        </>
    );
}

export default React.memo(Snake);
