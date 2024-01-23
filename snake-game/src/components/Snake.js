import React from "react";

function Snake(props) {
  return (
    <>
    {props.snakeDots.map((snakeDot, i) => (
      <rect 
        className="snake-item"
        key={i}
        x={`${snakeDot[1]}rem`}
        y={`${snakeDot[0]}rem`}
      />
    ))}
  </>
  )
}

export default Snake;
