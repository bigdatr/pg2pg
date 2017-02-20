'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _batchAndProcess = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(batchSize, rows, onResults) {
        var batches, i, j, chunk, b;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        batches = [];

                        // Chunk into batches

                        for (i = 0, j = rows.length; i < j; i += batchSize) {
                            chunk = rows.slice(i, i + batchSize);

                            batches.push(chunk);
                        }

                        b = 0;

                    case 3:
                        if (!(b < batches.length)) {
                            _context2.next = 9;
                            break;
                        }

                        _context2.next = 6;
                        return onResults(batches[b]);

                    case 6:
                        b++;
                        _context2.next = 3;
                        break;

                    case 9:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function _batchAndProcess(_x3, _x4, _x5) {
        return _ref2.apply(this, arguments);
    };
}();

exports.connect = connect;
exports.disconnect = disconnect;
exports.queryWithCursor = queryWithCursor;
exports.bulkInsert = bulkInsert;

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

var _pgCursor = require('pg-cursor');

var _pgCursor2 = _interopRequireDefault(_pgCursor);

var _cli = require('cli');

var _cli2 = _interopRequireDefault(_cli);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function connect(options) {
    return new _promise2.default(function (resolve, reject) {
        var client = new _pg2.default.Client(options);

        client.connect(function (err) {
            if (err) {
                return reject(err);
            }

            _cli2.default.debug('Connected DB: ' + options.host);

            return resolve(client);
        });
    });
}

function disconnect(client) {
    return new _promise2.default(function (resolve, reject) {
        client.end(function (err) {
            if (err) {
                return reject(err);
            }

            _cli2.default.debug('Disconnected DB: ' + client.host);

            return resolve();
        });
    });
}

function queryWithCursor(client, options) {
    return new _promise2.default(function (resolve, reject) {
        if (!client) {
            return reject(new Error('Missing client'));
        } else if (!options) {
            return reject(new Error('Missing options'));
        } else if (!options.query) {
            return reject(new Error('Missing `query` in options'));
        } else if (!options.onResults) {
            return reject(new Error('Missing `onResults` in options'));
        }

        var query = options.query,
            batchSize = options.batchSize,
            onResults = options.onResults;


        var cursor = client.query(new _pgCursor2.default(query));

        // Read in a function that can be called recursively
        function _readFromCursor() {
            var _this = this;

            cursor.read(batchSize, function () {
                var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(err, rows) {
                    var cursorIsSupportedByDB;
                    return _regenerator2.default.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _cli2.default.debug('Reading with cursor');

                                    if (!err) {
                                        _context.next = 6;
                                        break;
                                    }

                                    _cli2.default.fatal(err.message);
                                    return _context.abrupt('return', reject(err));

                                case 6:
                                    if (!(rows.length === 0)) {
                                        _context.next = 9;
                                        break;
                                    }

                                    _cli2.default.debug('No more rows to read');
                                    return _context.abrupt('return', resolve());

                                case 9:
                                    cursorIsSupportedByDB = rows.length <= batchSize;


                                    _cli2.default.debug('Processing results ' + rows.length);

                                    if (!cursorIsSupportedByDB) {
                                        _context.next = 17;
                                        break;
                                    }

                                    _context.next = 14;
                                    return onResults(rows);

                                case 14:
                                    _readFromCursor();
                                    _context.next = 20;
                                    break;

                                case 17:
                                    _context.next = 19;
                                    return _batchAndProcess(batchSize, rows, onResults);

                                case 19:
                                    return _context.abrupt('return', resolve());

                                case 20:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this);
                }));

                return function (_x, _x2) {
                    return _ref.apply(this, arguments);
                };
            }());
        }

        // Start reading
        _readFromCursor();
    });
}

function bulkInsert(client, table, rows) {
    return new _promise2.default(function (resolve, reject) {
        _cli2.default.debug('Bulk inserting ' + rows.length + ' rows to \'' + table + '\'');

        function buildStatement(insert) {
            var params = [];
            var chunks = [];

            rows.forEach(function (row) {
                var valueClause = [];

                (0, _keys2.default)(row).forEach(function (p) {
                    params.push(row[p]);
                    valueClause.push('$' + params.length);
                });

                chunks.push('(' + valueClause.join(', ') + ')');
            });

            return {
                query: insert + chunks.join(', '),
                values: params
            };
        }

        var fields_query = (0, _keys2.default)(rows[0]).join(', ');

        var _buildStatement = buildStatement('INSERT INTO ' + table + '(' + fields_query + ') VALUES '),
            query = _buildStatement.query,
            values = _buildStatement.values;

        client.query(query, values, function (err, result) {
            if (err) {
                _cli2.default.fatal(err.message);
                return reject(err);
            }

            return resolve(result);
        });
    });
}