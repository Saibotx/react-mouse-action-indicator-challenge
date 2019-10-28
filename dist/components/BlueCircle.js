import React from "react";
import "./BlueCircle.css";

const BlueCircle = ({ position = [0, 0], hidden = true }) => React.createElement("div", {
  hidden: hidden,
  className: "circle",
  style: {
    left: position[0],
    top: position[1]
  }
});

export default BlueCircle;