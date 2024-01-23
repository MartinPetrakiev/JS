import React from "react";

function DangerItem(props) {
  return (
    <circle
      className="danger-item"
      cx={`${props.dangerDot[1] + 1}rem`}
      cy={`${props.dangerDot[0] + 1}rem`}
      r="1rem"
    />
  );
}

export default DangerItem;
