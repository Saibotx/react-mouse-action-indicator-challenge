//TODO:
// seperate style into css file.
// write tests maybe?
// release as package
// test mobile for multitouch
// test reject simulated events
import React from "react";
import BlueCircle from "./components/BlueCircle";

class MouseDownContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseEvent = this.handleMouseEvent.bind(this);
    this.handleMousePosition = this.handleMousePosition.bind(this);
    this.state = {
      hiddenMouseIndicator: true,
      position: [0, 0]
    };
  }
  handleMouseEvent(event) {
    let hiddenMouseIndicator;
    switch (event.type) {
      case "mousedown":
        hiddenMouseIndicator = false;
        break;
      case "dragend":
      case "mouseup":
        hiddenMouseIndicator = true;
        break;
      default:
        return;
    }
    if (hiddenMouseIndicator !== undefined) {
      this.setState({ hiddenMouseIndicator });
    }
  }
  handleMousePosition(event) {
    if (!this.state.hiddenMouseIndicator) {
      let position = [event.clientX, event.clientY];
      this.setState({
        position
      });
    }
  }
  render() {
    return React.createElement(
      "div",
      {
        onMouseDown: this.handleMouseEvent,
        onMouseUp: this.handleMouseEvent,
        onMouseMove: this.handleMousePosition,
        onDrag: this.handleMousePosition,
        onDragEnd: this.handleMouseEvent,
        className: "asshole"
      },
      React.createElement(BlueCircle, {
        hidden: this.state.hiddenMouseIndicator,
        position: this.state.position
      }),
      this.props.children
    );
  }
}

export default MouseDownContainer;