'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var runCommandsForEachQueryParamsObject = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(config, connections, notifications) {
        var queryParams, i;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        queryParams = config.queryParams;


                        if (!queryParams || queryParams.length === 0) {
                            queryParams = [{}];
                            _cli2.default.debug('Found no queryParams');
                        } else {
                            _cli2.default.debug('Found ' + queryParams.length + ' queryParams to execute');
                        }

                        i = 0;

                    case 3:
                        if (!(i < queryParams.length)) {
                            _context2.next = 9;
                            break;
                        }

                        _context2.next = 6;
                        return runCommands(config.commands, connections, queryParams[i], notifications);

                    case 6:
                        i++;
                        _context2.next = 3;
                        break;

                    case 9:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function runCommandsForEachQueryParamsObject(_x2, _x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

var runCommands = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(commands, connections, queryParams, notifications) {
        var i, c, fn;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        i = 0;

                    case 1:
                        if (!(i < commands.length)) {
                            _context3.next = 13;
                            break;
                        }

                        c = commands[i];


                        if (!COMMANDS[c.type]) {
                            _cli2.default.fatal('Command type `' + c.type + '` is not supported');
                        }

                        fn = COMMANDS[c.type].default;

                        // Run command

                        _cli2.default.debug('Running Command ' + (i + 1));
                        _context3.next = 8;
                        return fn(c, connections, queryParams);

                    case 8:

                        // Run success notification
                        notifications.send('successCommand' + (i + 1), { command: c });
                        notifications.send('successAfterEachCommand', { command: c });

                    case 10:
                        i++;
                        _context3.next = 1;
                        break;

                    case 13:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function runCommands(_x5, _x6, _x7, _x8) {
        return _ref3.apply(this, arguments);
    };
}();

var successNotification = function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));

    return function successNotification() {
        return _ref4.apply(this, arguments);
    };
}();

var _cli = require('cli');

var _cli2 = _interopRequireDefault(_cli);

var _config_validate = require('./config_validate');

var _config_validate2 = _interopRequireDefault(_config_validate);

var _config_connections = require('./config_connections');

var _Notifications = require('./classes/Notifications');

var _Notifications2 = _interopRequireDefault(_Notifications);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Commands
var COMMANDS = {
    copy: require('./commands/copy'),
    query: require('./commands/query')
};

exports.default = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(config) {
        var connections, notifications;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return (0, _config_validate2.default)(config);

                    case 3:
                        _context.next = 5;
                        return (0, _config_connections.connectAll)(config);

                    case 5:
                        connections = _context.sent;
                        notifications = new _Notifications2.default(config, connections);
                        _context.next = 9;
                        return runCommandsForEachQueryParamsObject(config, connections, notifications);

                    case 9:
                        _context.next = 11;
                        return notifications.send('success');

                    case 11:
                        _context.next = 13;
                        return (0, _config_connections.disconnectAll)(connections);

                    case 13:
                        _context.next = 19;
                        break;

                    case 15:
                        _context.prev = 15;
                        _context.t0 = _context['catch'](0);

                        // await notifications.send('fail');
                        _cli2.default.fatal(_context.t0.stack || _context.t0);
                        process.exit(1);

                    case 19:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 15]]);
    }));

    function run(_x) {
        return _ref.apply(this, arguments);
    }

    return run;
}();