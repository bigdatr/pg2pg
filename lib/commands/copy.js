"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(command, connections, queryParams) {
        var source_database, target_database;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        if (connections[command.source_database]) {
                            _context2.next = 4;
                            break;
                        }

                        throw new Error("Cannot find connection for " + command.source_database);

                    case 4:
                        if (connections[command.target_database]) {
                            _context2.next = 6;
                            break;
                        }

                        throw new Error("Cannot find connection for " + command.target_database);

                    case 6:
                        source_database = connections[command.source_database].connection;
                        target_database = connections[command.target_database].connection;
                        _context2.next = 10;
                        return source_database.queryWithCursor({
                            query: command.source_query,
                            batchSize: command.batchSize,
                            params: queryParams,
                            onResults: function () {
                                var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(rows) {
                                    return _regenerator2.default.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    _context.next = 2;
                                                    return target_database.bulkInsert(command.target_table, rows);

                                                case 2:
                                                case "end":
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

                    case 10:
                    case "end":
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