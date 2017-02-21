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
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(command, connections, config) {
        var STATUS_MESSAGE, commandStatus, source_database, target_database;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        STATUS_MESSAGE = '{command.custom.magenta}   {uptime.cyan}    ' + 'COPIED'.cyan + ' {command.count.cyan} ' + 'rows'.cyan;

                        _nodeStatus2.default.setPattern('  {spinner.line.magenta} ' + STATUS_MESSAGE);

                        commandStatus = _nodeStatus2.default.addItem('command', {
                            custom: function custom() {
                                return command.description;
                            }
                        });


                        command._status = {};

                        if (connections[command.source_database]) {
                            _context2.next = 8;
                            break;
                        }

                        throw new Error('Cannot find connection for ' + command.source_database);

                    case 8:
                        if (connections[command.target_database]) {
                            _context2.next = 10;
                            break;
                        }

                        throw new Error('Cannot find connection for ' + command.target_database);

                    case 10:
                        source_database = connections[command.source_database].connection;
                        target_database = connections[command.target_database].connection;
                        _context2.next = 14;
                        return source_database.queryWithCursor({
                            query: command.source_query,
                            batchSize: command.batchSize,
                            params: config.queryParams,
                            onResults: function () {
                                var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(rows) {
                                    return _regenerator2.default.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    _context.next = 2;
                                                    return target_database.bulkInsert(command.target_table, rows);

                                                case 2:

                                                    commandStatus.inc(rows.length);
                                                    command._status.importedRows = (command._status.importedRows || 0) + rows.length;

                                                case 4:
                                                case 'end':
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, this);
                                }));

                                function onResults(_x4) {
                                    return _ref2.apply(this, arguments);
                                }

                                return onResults;
                            }()
                        });

                    case 14:

                        _nodeStatus2.default.setPattern('  ' + '\u2713 '.magenta + ' ' + STATUS_MESSAGE);
                        _nodeStatus2.default.stamp();
                        _nodeStatus2.default.removeItem(commandStatus);

                    case 17:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    function copy(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    }

    return copy;
}();