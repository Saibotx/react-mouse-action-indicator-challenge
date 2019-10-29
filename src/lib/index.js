import React from "react";
import BlueCircle from "./components/BlueCircle";
import AnimateList from "./components/AnimateList";

class MouseActionIndicator extends React.Component {
  constructor(props) {
    super(props);
    this.setTouchOnly = this.setTouchOnly.bind(this);
    this.handlePointerEvent = this.handlePointerEvent.bind(this);
    this.state = {
      indicators: [],
      touchOnly: false,
    };
  }

  handlePointerEvent(event) {
    let indicators = this.state.indicators;
    switch (event.type) {
      case "mousemove":
      case "mousedown": //always fires before touchStart
      case "drag": //handle dragging of element
        if (!event.buttons || this.state.touchOnly) {
          return;
        }
        indicators = [{ key: "mouse", x: event.clientX, y: event.clientY }];
        break;
      case "dragend":
      case "mouseup":
        if (this.state.touchOnly) {
          return;
        }
        indicators = [];
        break;
      case "touchstart": //contains all the touches and positions on screen
      case "touchend":
      case "touchmove":
        indicators = [];
        let touches = event.touches;
        for (var i = 0; i < touches.length; i++) {
          indicators.push({
            key: touches[i].identifier,
            x: touches[i].clientX,
            y: touches[i].clientY
          });
        }
        this.setTouchOnly()
        break;
      default:
        return;
    }
    this.setState({
      indicators
     });
  }

  setTouchOnly(){
    this.setState({touchOnly:true})
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
