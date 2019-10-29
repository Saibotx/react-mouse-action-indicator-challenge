"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

require("./BlueCircle.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BlueCircle = function BlueCircle(_ref) {
  var position = _ref.position,
      state = _ref.state;
  return _react["default"].createElement("div", {
    className: "circle ".concat(state),
    style: {
      left: position.x,
      top: position.y
    }
  });
};

var _default = BlueCircle;
exports["default"] = _default;