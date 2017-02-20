'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.disconnectAll = exports.connectAll = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var connectAll = exports.connectAll = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(config) {
        var refs, connections;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        refs = config.refs;
                        connections = (0, _keys2.default)(refs).filter(function (ref) {
                            // Ignore refs that don't have a connector defined
                            return !!(0, _keys2.default)(CONNECTORS).find(function (c) {
                                return c === refs[ref].type;
                            });
                        }).map(function (ref) {
                            var conf = refs[ref];

                            return (0, _defineProperty3.default)({}, ref, {
                                conf: conf,
                                connection: new CONNECTORS[conf.type](conf)
                            });
                        }).reduce(function (state, val) {
                            return (0, _assign2.default)(state, val);
                        }, {});
                        _context.next = 4;
                        return _promise2.default.all((0, _keys2.default)(connections).map(function (c) {
                            return connections[c].connection.connect();
                        }));

                    case 4:
                        return _context.abrupt('return', connections);

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function connectAll(_x) {
        return _ref.apply(this, arguments);
    };
}();

var disconnectAll = exports.disconnectAll = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(connections) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return _promise2.default.all((0, _keys2.default)(connections).map(function (c) {
                            return connections[c].connection.disconnect();
                        }));

                    case 2:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function disconnectAll(_x2) {
        return _ref3.apply(this, arguments);
    };
}();

var _PostgresConnector = require('./connectors/PostgresConnector');

var _PostgresConnector2 = _interopRequireDefault(_PostgresConnector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CONNECTORS = {
    postgres: _PostgresConnector2.default,
    redshift: _PostgresConnector2.default
};