'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _nodeStatus = require('node-status');

var _nodeStatus2 = _interopRequireDefault(_nodeStatus);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(command, connections) {
        var STATUS_MESSAGE, commandStatus, database, result, STATUS_MESSAGE_SUFFIX;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        STATUS_MESSAGE = '{command.custom.magenta}   {uptime.cyan}';

                        _nodeStatus2.default.setPattern('  {spinner.line.magenta} ' + STATUS_MESSAGE);

                        commandStatus = _nodeStatus2.default.addItem('command', {
                            custom: function custom() {
                                return command.description;
                            }
                        });


                        command._status = {};

                        if (connections[command.database]) {
                            _context.next = 6;
                            break;
                        }

                        throw new Error('Could not find database \'' + command.database + '\' in refs. Please check command \'' + command.description + '\'');

                    case 6:
                        database = connections[command.database].connection;
                        _context.next = 9;
                        return database.query(command.query);

                    case 9:
                        result = _context.sent;
                        STATUS_MESSAGE_SUFFIX = '';


                        if (result.command === 'DELETE') {
                            STATUS_MESSAGE_SUFFIX = (' DELETED ' + result.rowCount + ' rows').cyan;
                        }

                        _nodeStatus2.default.setPattern('  ' + '\u2713 '.magenta + ' ' + STATUS_MESSAGE + '    ' + STATUS_MESSAGE_SUFFIX);
                        _nodeStatus2.default.stamp();
                        _nodeStatus2.default.removeItem(commandStatus);

                    case 15:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    function query(_x, _x2) {
        return _ref.apply(this, arguments);
    }

    return query;
}();