'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var runCommands = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(commands, connections) {
        var i, c, fn;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        // Init status bar
                        _nodeStatus2.default.start({ pattern: '.' });

                        i = 0;

                    case 2:
                        if (!(i < commands.length)) {
                            _context2.next = 10;
                            break;
                        }

                        c = commands[i];
                        fn = COMMANDS[c.type].default;
                        _context2.next = 7;
                        return fn(c, connections);

                    case 7:
                        i++;
                        _context2.next = 2;
                        break;

                    case 10:

                        _nodeStatus2.default.clear();
                        _nodeStatus2.default.removeAll();
                        _nodeStatus2.default.stop();

                    case 13:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function runCommands(_x2, _x3) {
        return _ref2.apply(this, arguments);
    };
}();

var _cli = require('cli');

var _cli2 = _interopRequireDefault(_cli);

var _nodeStatus = require('node-status');

var _nodeStatus2 = _interopRequireDefault(_nodeStatus);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _config_validate = require('./config_validate');

var _config_validate2 = _interopRequireDefault(_config_validate);

var _config_connections = require('./config_connections');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Commands
var COMMANDS = {
    copy: require('./commands/copy')
};

exports.default = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(config) {
        var connections;
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
                        _context.next = 8;
                        return runCommands(config.commands, connections);

                    case 8:
                        _context.next = 10;
                        return (0, _config_connections.disconnectAll)(connections);

                    case 10:
                        _context.next = 16;
                        break;

                    case 12:
                        _context.prev = 12;
                        _context.t0 = _context['catch'](0);

                        _cli2.default.fatal(_context.t0.message || _context.t0);
                        process.exit(1);

                    case 16:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 12]]);
    }));

    function run(_x) {
        return _ref.apply(this, arguments);
    }

    return run;
}();