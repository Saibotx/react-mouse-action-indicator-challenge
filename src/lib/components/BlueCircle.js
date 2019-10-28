import React from "react";
import "./BlueCircle.css";

const BlueCircle = ({ position, state }) => (
  <div
    className={`circle ${state}`}
    style={{
      left: position.x,
      top: position.y
    }}
  />
);

export default BlueCircle;
