import React from "react";

function Snake({ snakeDots }) {
  return (
    <>
      {snakeDots.map((snakeDot, index) => {
        if (index === 0) {
          return (
            <rect
            className="snake-item snake-tail"
            key={index}
            x={`${snakeDot[1]}rem`}
            y={`${snakeDot[0]}rem`}
          />
          );
        } else if (index === snakeDots.length - 1) {
          return (
            <circle
              className="snake-item snake-head"
              key={index}
              cx={`${snakeDot[1] + 1}rem`}
              cy={`${snakeDot[0] + 1}rem`}
              r={"21px"}
            />
          );
        } else {
          return (
            <rect
            className="snake-item snake-body"
            key={index}
            x={`${snakeDot[1]}rem`}
            y={`${snakeDot[0]}rem`}
          />
          );
        }
      })}
    </>
  );
}

export default Snake;
