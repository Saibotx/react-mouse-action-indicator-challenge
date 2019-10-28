//TODO:
// seperate style into css file. (Y)
// write tests maybe?
// release as package (Y)
// test mobile for multitouch
// test reject simulated events
import React from "react";
import BlueCircle from "./components/BlueCircle";
import AnimateList from "./components/AnimateList";

class MouseActionIndicator extends React.Component {
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
      case "mousemove":
      case "mousedown": //always fires before touchStart
      case "drag": //handle dragging of element
        if (!event.buttons) {
          return;
        }
        console.log("event is", event);
        indicators = [{ key: "mouse", x: event.clientX, y: event.clientY }];
        break;
      case "dragend":
      case "mouseup":
        indicators = [];
        break;
      case "touchstart": //contains all the touches and positions on screen
      case "touchend":
      case "touchmove":
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
    return (
      <div
        onMouseDown={this.handlePointerEvent}
        onTouchStart={this.handlePointerEvent}
        onTouchMove={this.handlePointerEvent}
        onDrag={this.handlePointerEvent}
        onMouseMove={this.handlePointerEvent}
        onMouseUp={this.handlePointerEvent}
        onTouchEnd={this.handlePointerEvent}
        onDragEnd={this.handlePointerEvent}
        className="asshole"
      >
        <AnimateList>
          {this.state.indicators.map(indicator => {
            return (
              <BlueCircle
                key={indicator.key}
                position={{ x: indicator.x, y: indicator.y }}
              />
            );
          })}
        </AnimateList>

        {this.props.children}
      </div>
    );
  }
}

export default MouseActionIndicator;
