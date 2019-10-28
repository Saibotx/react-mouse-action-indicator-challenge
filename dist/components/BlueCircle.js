import React from "react";
import "./BlueCircle.css";

const BlueCircle = ({ position = [0, 0] }) => React.createElement("div", {
  className: "circle",
  style: {
    left: position[0],
    top: position[1]
  }
});

export default BlueCircle;