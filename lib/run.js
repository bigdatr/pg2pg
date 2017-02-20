'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var runCommands = function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(source_client, target_client, commands) {
        var _this = this;

        var _loop, i;

        return _regenerator2.default.wrap(function _callee3$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        // Init status bar
                        _nodeStatus2.default.start({
                            pattern: '  {spinner.line.magenta} {rows.custom.magenta}   {uptime.cyan} / {rows.count.cyan} ' + 'rows imported'.cyan
                        });

                        _loop = _regenerator2.default.mark(function _loop() {
                            var c, rowCounter;
                            return _regenerator2.default.wrap(function _loop$(_context3) {
                                while (1) {
                                    switch (_context3.prev = _context3.next) {
                                        case 0:
                                            c = commands[i];
                                            rowCounter = _nodeStatus2.default.addItem('rows', {
                                                custom: function custom() {
                                                    return c.description;
                                                }
                                            });
                                            _context3.next = 4;
                                            return (0, _db.queryWithCursor)(source_client, {
                                                query: c.source_query,
                                                batchSize: c.batchSize || 1000,
                                                onResults: function () {
                                                    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(rows) {
                                                        return _regenerator2.default.wrap(function _callee2$(_context2) {
                                                            while (1) {
                                                                switch (_context2.prev = _context2.next) {
                                                                    case 0:
                                                                        _context2.next = 2;
                                                                        return (0, _db.bulkInsert)(target_client, c.target_table, rows);

                                                                    case 2:

                                                                        rowCounter.inc(rows.length);
                                                                        c.importedRows = (c.importedRows || 0) + rows.length;

                                                                    case 4:
                                                                    case 'end':
                                                                        return _context2.stop();
                                                                }
                                                            }
                                                        }, _callee2, this);
                                                    }));

                                                    function onResults(_x5) {
                                                        return _ref5.apply(this, arguments);
                                                    }

                                                    return onResults;
                                                }()
                                            });

                                        case 4:

                                            _nodeStatus2.default.console().log('  \u2713 '.magenta + c.description.magenta + (' (' + c.importedRows + ' rows)').magenta);
                                            _nodeStatus2.default.removeAll();
                                            _nodeStatus2.default.clear();

                                        case 7:
                                        case 'end':
                                            return _context3.stop();
                                    }
                                }
                            }, _loop, _this);
                        });
                        i = 0;

                    case 3:
                        if (!(i < commands.length)) {
                            _context4.next = 8;
                            break;
                        }

                        return _context4.delegateYield(_loop(), 't0', 5);

                    case 5:
                        i++;
                        _context4.next = 3;
                        break;

                    case 8:

                        _nodeStatus2.default.stop();

                    case 9:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee3, this);
    }));

    return function runCommands(_x2, _x3, _x4) {
        return _ref4.apply(this, arguments);
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

var _db = require('./db');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(config) {
        var _ref2, _ref3, source_client, target_client;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return (0, _config_validate2.default)(config);

                    case 3:
                        _context.next = 5;
                        return _promise2.default.all([(0, _db.connect)(config.source), (0, _db.connect)(config.target)]);

                    case 5:
                        _ref2 = _context.sent;
                        _ref3 = (0, _slicedToArray3.default)(_ref2, 2);
                        source_client = _ref3[0];
                        target_client = _ref3[1];
                        _context.next = 11;
                        return runCommands(source_client, target_client, config.commands);

                    case 11:
                        _context.next = 13;
                        return _promise2.default.all([(0, _db.disconnect)(source_client), (0, _db.disconnect)(target_client)]);

                    case 13:
                        _context.next = 19;
                        break;

                    case 15:
                        _context.prev = 15;
                        _context.t0 = _context['catch'](0);

                        _cli2.default.fatal(_context.t0.message || _context.t0);
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