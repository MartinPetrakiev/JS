import React from "react";

function Snake(props) {
  return props.snakeDots.map((snakeDot, i) => (
    <div
      className="snake-item"
      key={i}
      style={{top: `${snakeDot[0]}rem`, left: `${snakeDot[1]}rem`}}
    />
  ));
}

export default Snake;
