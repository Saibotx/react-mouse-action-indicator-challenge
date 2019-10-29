"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var AnimateList =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AnimateList, _React$Component);

  function AnimateList(props) {
    var _this;

    _classCallCheck(this, AnimateList);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AnimateList).call(this, props));
    _this._getChildrenMapFromArray = _this._getChildrenMapFromArray.bind(_assertThisInitialized(_this));
    _this._getChildrenArrayFromMap = _this._getChildrenArrayFromMap.bind(_assertThisInitialized(_this));
    _this.state = {
      children: _this._getChildrenMapFromArray(_react["default"].Children.toArray(props.children)),
      mountingChildren: {},
      unmountingChildren: {}
    };
    _this.timers = {};
    return _this;
  }

  _createClass(AnimateList, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      var existingChildren = _objectSpread({}, this.state.children, {}, this.state.unmountingChildren, {}, this.state.mountingChildren);

      var nextChildren = _react["default"].Children.toArray(props.children);

      var nextChildrenKeys = nextChildren.map(function (child) {
        return child.key;
      });
      var existingChildrenKeys = Object.keys(existingChildren);
      var removedChildrenKeys = existingChildrenKeys.filter(function (key) {
        return nextChildrenKeys.indexOf(key) === -1;
      });
      var addedChildrenKeys = nextChildrenKeys.filter(function (nextChildKey) {
        return existingChildrenKeys.indexOf(nextChildKey) === -1;
      }); //get changedNodes

      var changedChildren = nextChildren.filter(function (nextChild) {
        var potentialChangedChild = existingChildren[nextChild.key];

        if (potentialChangedChild) {
          var nextPosition = (nextChild.props || {}).position;
          var oldPosition = (potentialChangedChild.props || {}).position;

          if (nextPosition && oldPosition) {
            return oldPosition.x !== nextPosition.x && oldPosition.y !== nextPosition.y;
          }
        }

        return false;
      }); //handle removing children

      if (removedChildrenKeys.length > 0) {
        var removedChildren = this._getChildrenArrayFromMap(existingChildren).filter(function (child) {
          return removedChildrenKeys.includes(child.key);
        });

        this._unmountChildrenNodes(removedChildren); // console.log("unmounting", removedChildrenKeys)

      } //handle adding children


      if (addedChildrenKeys.length > 0) {
        var addedChildren = nextChildren.filter(function (nextChild) {
          return addedChildrenKeys.includes(nextChild.key);
        });

        this._mountChildrenNodes(addedChildren); // console.log("mounting", addedChildrenKeys)

      }

      if (changedChildren.length > 0) {
        var existingChildrenMap = _objectSpread({}, this.state.children);

        changedChildren.forEach(function (Child) {
          existingChildrenMap[Child.key] = _react["default"].cloneElement(Child, {
            state: "mounted"
          });
        });
        this.setState({
          children: existingChildrenMap
        });
      }
    }
  }, {
    key: "_unmountChildrenNodes",
    value: function _unmountChildrenNodes(removedChildren) {
      var _this2 = this;

      var existingChildrenMap = _objectSpread({}, this.state.children);

      var unmountDelay = 0;

      var unmountingChildren = _objectSpread({}, this.state.unmountingChildren);

      removedChildren.forEach(function (Child) {
        unmountingChildren[Child.key] = _react["default"].cloneElement(Child, {
          state: "unmounting"
        }); //check if still being mounted. If so, delay unmount animation.

        unmountDelay = _this2.state.mountingChildren[Child.key] ? 100 : 0;
        delete existingChildrenMap[Child.key];
      }); //Perform unmount animation async.

      setTimeout(function () {
        _this2.setState({
          unmountingChildren: unmountingChildren,
          children: existingChildrenMap
        });
      }, unmountDelay); //Actually perform unmount

      setTimeout(function () {
        var futureUnmountingChildren = _objectSpread({}, _this2.state.unmountingChildren);

        var futureChildren = _objectSpread({}, _this2.state.children);

        removedChildren.forEach(function (Child) {
          delete futureUnmountingChildren[Child.key]; // delete futureChildren[Child.key];
        });

        _this2.setState({
          unmountingChildren: futureUnmountingChildren,
          children: futureChildren
        });
      }, unmountDelay + 100);
    }
  }, {
    key: "_mountChildrenNodes",
    value: function _mountChildrenNodes(addedChildren) {
      var _this3 = this;

      var mountingChildren = _objectSpread({}, this.state.mountingChildren);

      addedChildren.forEach(function (Child, i) {
        mountingChildren[Child.key] = _objectSpread({}, Child);
      }, addedChildren); //mount node and prepare for animation.

      this.setState({
        mountingChildren: mountingChildren
      }); //setTimeout to make async perform animation.

      setTimeout(function () {
        var futureMountingChildren = _objectSpread({}, _this3.state.mountingChildren);

        var futureChildren = _objectSpread({}, _this3.state.children);

        addedChildren.forEach(function (Child) {
          //need to make sure this is still not unmounting.
          futureChildren[Child.key] = _react["default"].cloneElement(Child, {
            state: "mounted"
          });
          delete futureMountingChildren[Child.key];
        });

        _this3.setState({
          mountingChildren: futureMountingChildren,
          children: futureChildren
        });
      }, 0);
    }
  }, {
    key: "_getChildrenMapFromArray",
    value: function _getChildrenMapFromArray() {
      var childrenArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var childrenMap = {};

      for (var child in childrenArray) {
        childrenMap[child.key] = child;
      }

      return childrenMap;
    }
  }, {
    key: "_getChildrenArrayFromMap",
    value: function _getChildrenArrayFromMap() {
      var childrenMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var childrenArray = [];

      for (var childKey in childrenMap) {
        childrenArray.push(childrenMap[childKey]);
      }

      return childrenArray;
    }
  }, {
    key: "render",
    value: function render() {
      var toRender = this._getChildrenArrayFromMap(_objectSpread({}, this.state.mountingChildren, {}, this.state.unmountingChildren, {}, this.state.children));

      return toRender;
    }
  }]);

  return AnimateList;
}(_react["default"].Component);

var _default = AnimateList;
exports["default"] = _default;