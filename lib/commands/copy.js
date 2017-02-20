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

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(command, connections) {
        var copyStatus, source_database, target_database;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _nodeStatus2.default.setPattern('  {spinner.line.magenta} {copy.custom.magenta}   {uptime.cyan} / {copy.count.cyan} ' + 'rows imported'.cyan);

                        copyStatus = _nodeStatus2.default.addItem('copy', {
                            custom: function custom() {
                                return command.description;
                            }
                        });


                        command._status = {};

                        source_database = connections[(0, _utils.getToken)(command.source_database)].connection;
                        target_database = connections[(0, _utils.getToken)(command.target_database)].connection;
                        _context2.next = 7;
                        return source_database.queryWithCursor({
                            query: command.source_query,
                            batchSize: command.batchSize,
                            onResults: function () {
                                var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(rows) {
                                    return _regenerator2.default.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    _context.next = 2;
                                                    return target_database.bulkInsert(command.target_table, rows);

                                                case 2:

                                                    copyStatus.inc(rows.length);
                                                    command._status.importedRows = (command._status.importedRows || 0) + rows.length;

                                                case 4:
                                                case 'end':
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, this);
                                }));

                                function onResults(_x3) {
                                    return _ref2.apply(this, arguments);
                                }

                                return onResults;
                            }()
                        });

                    case 7:

                        _nodeStatus2.default.setPattern('  ' + '\u2713 '.magenta + ' {copy.custom.magenta}   {uptime.cyan} / {copy.count.cyan} ' + 'rows imported'.cyan);
                        _nodeStatus2.default.stamp();
                        _nodeStatus2.default.removeItem(copyStatus);

                    case 10:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    function copy(_x, _x2) {
        return _ref.apply(this, arguments);
    }

    return copy;
}();