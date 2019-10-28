//TODO:
// seperate style into css file. (Y)
// write tests maybe?
// release as package (Y)
// test mobile for multitouch
// test reject simulated events
import React from "react";
import BlueCircle from "./components/BlueCircle";

class pointerDownContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handlePointerEvent = this.handlePointerEvent.bind(this);
    this.state = {
      indicators: []
    };
  }

  handlePointerEvent(event) {
    let indicators = this.state.indicators;
    switch (event.type) {
      case "mousedown": //always fires before touchStart
      case "mousemove":
        if (!event.buttons) {
          //check if mouse is pressed
          return;
        }
      case "drag":
        //handle dragging of element
        indicators = [[event.clientX, event.clientY]];
        break;
      case "dragend":
      case "mouseup":
        indicators = [];
        break;
      case "touchstart": //contains all the touches and positions on screen
      case "touchend":
      case 'touchmove':
        indicators = [];
        let touches = event.touches;
        for (var i = 0; i < touches.length; i++) {
          indicators.push([touches[i].clientX, touches[i].clientY]);
        }
        break;
      default:
        return;
    }
    this.setState({ indicators });
  }

  render() {
    return React.createElement(
      "div",
      {
        onMouseDown: this.handlePointerEvent,
        onTouchStart: this.handlePointerEvent,

        onTouchMove: this.handlePointerEvent,
        onDrag: this.handlePointerEvent,
        onMouseMove: this.handlePointerEvent,

        onMouseUp: this.handlePointerEvent,
        onTouchEnd: this.handlePointerEvent,
        onDragEnd: this.handlePointerEvent,

        className: "asshole"
      },
      this.state.indicators.map((indicator, i) => {
        return React.createElement(BlueCircle, { key: i, position: indicator });
      }),
      this.props.children
    );
  }
}

export default pointerDownContainer;