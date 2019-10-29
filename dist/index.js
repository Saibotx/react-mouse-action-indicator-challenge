"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _BlueCircle = _interopRequireDefault(require("./components/BlueCircle"));

var _AnimateList = _interopRequireDefault(require("./components/AnimateList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var MouseActionIndicator =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MouseActionIndicator, _React$Component);

  function MouseActionIndicator(props) {
    var _this;

    _classCallCheck(this, MouseActionIndicator);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MouseActionIndicator).call(this, props));
    _this.setTouchOnly = _this.setTouchOnly.bind(_assertThisInitialized(_this));
    _this.handlePointerEvent = _this.handlePointerEvent.bind(_assertThisInitialized(_this));
    _this.state = {
      indicators: [],
      touchOnly: false
    };
    return _this;
  }

  _createClass(MouseActionIndicator, [{
    key: "handlePointerEvent",
    value: function handlePointerEvent(event) {
      var indicators = this.state.indicators;

      switch (event.type) {
        case "mousemove":
        case "mousedown": //always fires before touchStart

        case "drag":
          //handle dragging of element
          if (!event.buttons || this.state.touchOnly) {
            return;
          }

          indicators = [{
            key: "mouse",
            x: event.clientX,
            y: event.clientY
          }];
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
          var touches = event.touches;

          for (var i = 0; i < touches.length; i++) {
            indicators.push({
              key: touches[i].identifier,
              x: touches[i].clientX,
              y: touches[i].clientY
            });
          }

          this.setTouchOnly();
          break;

        default:
          return;
      }

      this.setState({
        indicators: indicators
      });
    }
  }, {
    key: "setTouchOnly",
    value: function setTouchOnly() {
      this.setState({
        touchOnly: true
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", {
        onMouseDown: this.handlePointerEvent,
        onTouchStart: this.handlePointerEvent,
        onTouchMove: this.handlePointerEvent,
        onDrag: this.handlePointerEvent,
        onMouseMove: this.handlePointerEvent,
        onMouseUp: this.handlePointerEvent,
        onTouchEnd: this.handlePointerEvent,
        onDragEnd: this.handlePointerEvent
      }, _react["default"].createElement(_AnimateList["default"], null, this.state.indicators.map(function (indicator) {
        return _react["default"].createElement(_BlueCircle["default"], {
          key: indicator.key,
          position: {
            x: indicator.x,
            y: indicator.y
          }
        });
      })), this.props.children);
    }
  }]);

  return MouseActionIndicator;
}(_react["default"].Component);

var _default = MouseActionIndicator;
exports["default"] = _default;