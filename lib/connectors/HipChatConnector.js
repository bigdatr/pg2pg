'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseConnector2 = require('./BaseConnector');

var _BaseConnector3 = _interopRequireDefault(_BaseConnector2);

var _cli = require('cli');

var _cli2 = _interopRequireDefault(_cli);

var _hipchatter = require('hipchatter');

var _hipchatter2 = _interopRequireDefault(_hipchatter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HipChatConnector = function (_BaseConnector) {
    (0, _inherits3.default)(HipChatConnector, _BaseConnector);

    function HipChatConnector() {
        (0, _classCallCheck3.default)(this, HipChatConnector);
        return (0, _possibleConstructorReturn3.default)(this, (HipChatConnector.__proto__ || (0, _getPrototypeOf2.default)(HipChatConnector)).apply(this, arguments));
    }

    (0, _createClass3.default)(HipChatConnector, [{
        key: 'connect',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                this._client = new _hipchatter2.default(this.config.token);

                            case 1:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function connect() {
                return _ref.apply(this, arguments);
            }

            return connect;
        }()
    }, {
        key: 'disconnect',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                this._client = null;

                            case 1:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function disconnect() {
                return _ref2.apply(this, arguments);
            }

            return disconnect;
        }()
    }]);
    return HipChatConnector;
}(_BaseConnector3.default);

exports.default = HipChatConnector;