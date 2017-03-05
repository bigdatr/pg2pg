'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Notifications = function () {
    function Notifications(config, connections) {
        (0, _classCallCheck3.default)(this, Notifications);

        this._config = config;
        this._connections = connections;
        this.notifications = this._config.notifications || {};
    }

    (0, _createClass3.default)(Notifications, [{
        key: 'send',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(stage, context) {
                var n, service, nextNotification;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                n = this.notifications[stage];

                                if (n) {
                                    _context.next = 3;
                                    break;
                                }

                                return _context.abrupt('return', null);

                            case 3:
                                service = this.getService(n.service);

                                if (service) {
                                    _context.next = 6;
                                    break;
                                }

                                return _context.abrupt('return', null);

                            case 6:
                                _context.prev = 6;
                                nextNotification = (0, _assign2.default)({}, n, {
                                    message: this.tokenizeMessage(n.message, context)
                                });
                                _context.next = 10;
                                return service.send(nextNotification);

                            case 10:
                                _context.next = 15;
                                break;

                            case 12:
                                _context.prev = 12;
                                _context.t0 = _context['catch'](6);

                                console.log(_context.t0.stack);

                            case 15:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[6, 12]]);
            }));

            function send(_x, _x2) {
                return _ref.apply(this, arguments);
            }

            return send;
        }()
    }, {
        key: 'getService',
        value: function getService(name) {
            return this._connections[name].connection || null;
        }
    }, {
        key: 'tokenizeMessage',
        value: function tokenizeMessage(str, context) {
            if (!context) {
                return str;
            }

            var nextStr = str;

            (0, _keys2.default)(context).forEach(function (k) {
                (0, _keys2.default)(context[k]).forEach(function (prop) {
                    if (prop.startsWith('_')) {
                        return;
                    }
                    if ((0, _typeof3.default)(context[k][prop]) === 'object') {
                        return;
                    }

                    var commandKey = '${' + (k + '.' + prop) + '}';
                    nextStr = nextStr.replace(commandKey, context[k][prop]);
                });
            });

            return nextStr;
        }
    }]);
    return Notifications;
}();

exports.default = Notifications;