"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MemoryRouterControllerProvider = exports.HashRouterControllerProvider = exports.BrowserRouterControllerProvider = exports.RouterControllerProvider = exports.RouterController = exports.RouterType = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _reduxSagaModel = require("redux-saga-model");

var _reactRouterRedux = require("react-router-redux");

var _createBrowserHistory = require("history/createBrowserHistory");

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _createHashHistory = require("history/createHashHistory");

var _createHashHistory2 = _interopRequireDefault(_createHashHistory);

var _createMemoryHistory = require("history/createMemoryHistory");

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var RouterType = {
  Browser: "browser",
  Hash: "hash",
  Memory: "memory"
};

// see https://github.com/ReactTraining/history
var getHistoryByType = function getHistoryByType(type, props) {
  switch (type) {
    case RouterType.Browser:
      return (0, _createBrowserHistory2.default)({ basename: props.basename, forceRefresh: props.forceRefresh, keyLength: props.keyLength, getUserConfirmation: props.getUserConfirmation });

    case RouterType.Memory:
      return (0, _createMemoryHistory2.default)({ initialEntries: props.initialEntries, initialIndex: props.initialIndex, keyLength: props.keyLength, getUserConfirmation: props.getUserConfirmation });

    case RouterType.Hash:
    default:
      return (0, _createHashHistory2.default)({ basename: props.basename, hashType: props.hashType, getUserConfirmation: props.getUserConfirmation });
  }
};

// see https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux
var RouterController = function RouterController(_ref) {
  var children = _ref.children,
      history = _ref.history;

  return _react2.default.createElement(
    _reactRouterRedux.ConnectedRouter,
    { history: history },
    children
  );
};

var needChildren = function needChildren() {
  throw new Error('RouterControllerProvider \'children can not be null or undefined ');
};

var RouterControllerProvider = function RouterControllerProvider(props) {
  var _props$children = props.children,
      children = _props$children === undefined ? needChildren() : _props$children,
      _props$type = props.type,
      type = _props$type === undefined ? RouterType.Hash : _props$type,
      _props$modles = props.modles,
      modles = _props$modles === undefined ? [] : _props$modles,
      _props$state = props.state,
      state = _props$state === undefined ? {} : _props$state,
      _props$middleware = props.middleware,
      middleware = _props$middleware === undefined ? [] : _props$middleware,
      ops = _objectWithoutProperties(props, ["children", "type", "modles", "state", "middleware"]);

  var initialState = state;
  var initialReducer = {
    routing: _reactRouterRedux.routerReducer
  };
  var history = getHistoryByType(type, ops);
  var initialMiddleware = [(0, _reactRouterRedux.routerMiddleware)(history)];
  var initialModles = modles;
  var modelManager = (0, _reduxSagaModel.sagaModelManagerFactory)({ initialState: initialState, initialReducer: initialReducer, initialMiddleware: initialMiddleware, initialModles: initialModles });

  return _react2.default.createElement(
    _reactRedux.Provider,
    { store: modelManager.getStore() },
    _react2.default.createElement(RouterController, { children: children, history: history })
  );
};

var BrowserRouterControllerProvider = function BrowserRouterControllerProvider(props) {
  return _react2.default.createElement(RouterControllerProvider, _extends({}, props, { type: RouterType.Browser }));
};

var HashRouterControllerProvider = function HashRouterControllerProvider(props) {
  return _react2.default.createElement(RouterControllerProvider, _extends({}, props, { type: RouterType.Hash }));
};

var MemoryRouterControllerProvider = function MemoryRouterControllerProvider(props) {
  return _react2.default.createElement(RouterControllerProvider, _extends({}, props, { type: RouterType.Memory }));
};

exports.RouterType = RouterType;
exports.RouterController = RouterController;
exports.RouterControllerProvider = RouterControllerProvider;
exports.BrowserRouterControllerProvider = BrowserRouterControllerProvider;
exports.HashRouterControllerProvider = HashRouterControllerProvider;
exports.MemoryRouterControllerProvider = MemoryRouterControllerProvider;
exports.default = HashRouterControllerProvider;