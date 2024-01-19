import React from "react";

function DangerItem(props) {
  return (
    <div
      className="danger-item"
      style={{ top: `${props.dangerDot[0]}rem`, left: `${props.dangerDot[1]}rem` }}
    />
  );
}

export default DangerItem;