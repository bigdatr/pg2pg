'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

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
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(stage) {
                var n, service;
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
                                _context.next = 9;
                                return service.send(n);

                            case 9:
                                console.log('asdkjhasjdhakjsdhkjasd');
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

            function send(_x) {
                return _ref.apply(this, arguments);
            }

            return send;
        }()
    }, {
        key: 'getService',
        value: function getService(name) {
            return this._connections[name].connection || null;
        }
    }]);
    return Notifications;
}();

exports.default = Notifications;