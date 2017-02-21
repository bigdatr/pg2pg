'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _batchAndProcess = function () {
    var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(batchSize, rows, onResults) {
        var batches, i, j, chunk, b;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
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
                            _context7.next = 9;
                            break;
                        }

                        _context7.next = 6;
                        return onResults(batches[b]);

                    case 6:
                        b++;
                        _context7.next = 3;
                        break;

                    case 9:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, this);
    }));

    return function _batchAndProcess(_x8, _x9, _x10) {
        return _ref7.apply(this, arguments);
    };
}();

var _BaseConnector2 = require('./BaseConnector');

var _BaseConnector3 = _interopRequireDefault(_BaseConnector2);

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

var _pgCursor = require('pg-cursor');

var _pgCursor2 = _interopRequireDefault(_pgCursor);

var _cli = require('cli');

var _cli2 = _interopRequireDefault(_cli);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_BATCH_SIZE = 1000;

var PostgresConnector = function (_BaseConnector) {
    (0, _inherits3.default)(PostgresConnector, _BaseConnector);

    function PostgresConnector() {
        (0, _classCallCheck3.default)(this, PostgresConnector);
        return (0, _possibleConstructorReturn3.default)(this, (PostgresConnector.__proto__ || (0, _getPrototypeOf2.default)(PostgresConnector)).apply(this, arguments));
    }

    (0, _createClass3.default)(PostgresConnector, [{
        key: 'connect',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
                var _this2 = this;

                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                return _context.abrupt('return', new _promise2.default(function (resolve, reject) {
                                    _this2._client = new _pg2.default.Client(_this2.config);

                                    _this2._client.connect(function (err) {
                                        if (err) {
                                            return reject(err);
                                        }

                                        _cli2.default.debug('Connected DB: ' + _this2.config.host);

                                        return resolve();
                                    });
                                }));

                            case 1:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function connect() {
                return _ref.apply(this, arguments);
            }

            return connect;
        }()
    }, {
        key: 'disconnect',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
                var _this3 = this;

                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                return _context2.abrupt('return', new _promise2.default(function (resolve, reject) {
                                    _this3._client.end(function (err) {
                                        if (err) {
                                            return reject(err);
                                        }

                                        _cli2.default.debug('Disconnected DB: ' + _this3.config.host);

                                        return resolve();
                                    });
                                }));

                            case 1:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function disconnect() {
                return _ref2.apply(this, arguments);
            }

            return disconnect;
        }()
    }, {
        key: 'query',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(sql, params) {
                var _this4 = this;

                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                return _context3.abrupt('return', new _promise2.default(function (resolve, reject) {
                                    _this4._client.query(sql, params || [], function (err, result) {
                                        if (err) {
                                            return reject(err);
                                        }

                                        return resolve(result);
                                    });
                                }));

                            case 1:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function query(_x, _x2) {
                return _ref3.apply(this, arguments);
            }

            return query;
        }()
    }, {
        key: 'queryWithCursor',
        value: function () {
            var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(options) {
                var _this5 = this;

                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                return _context5.abrupt('return', new _promise2.default(function (resolve, reject) {
                                    if (!_this5._client) {
                                        return reject(new Error('Missing client'));
                                    } else if (!options) {
                                        return reject(new Error('Missing options'));
                                    } else if (!options.query) {
                                        return reject(new Error('Missing `query` in options'));
                                    } else if (!options.onResults) {
                                        return reject(new Error('Missing `onResults` in options'));
                                    }

                                    var query = options.query,
                                        onResults = options.onResults;
                                    var batchSize = options.batchSize;


                                    batchSize = batchSize || DEFAULT_BATCH_SIZE;

                                    var cursor = _this5._client.query(new _pgCursor2.default(query));

                                    // Read in a function that can be called recursively
                                    function _readFromCursor() {
                                        var _this6 = this;

                                        cursor.read(batchSize, function () {
                                            var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(err, rows) {
                                                return _regenerator2.default.wrap(function _callee4$(_context4) {
                                                    while (1) {
                                                        switch (_context4.prev = _context4.next) {
                                                            case 0:
                                                                _cli2.default.debug('Reading with cursor');

                                                                if (!err) {
                                                                    _context4.next = 6;
                                                                    break;
                                                                }

                                                                _cli2.default.fatal(err.message);
                                                                return _context4.abrupt('return', reject(err));

                                                            case 6:
                                                                if (!(rows.length === 0)) {
                                                                    _context4.next = 10;
                                                                    break;
                                                                }

                                                                _cli2.default.debug('No more rows to read');
                                                                cursor.close();
                                                                return _context4.abrupt('return', resolve());

                                                            case 10:

                                                                _cli2.default.debug('Using Postgres cursor to batch copy ' + rows.length);

                                                                _context4.prev = 11;
                                                                _context4.next = 14;
                                                                return onResults(rows);

                                                            case 14:
                                                                _readFromCursor();
                                                                _context4.next = 20;
                                                                break;

                                                            case 17:
                                                                _context4.prev = 17;
                                                                _context4.t0 = _context4['catch'](11);

                                                                _cli2.default.fatal(_context4.t0.message);

                                                            case 20:
                                                            case 'end':
                                                                return _context4.stop();
                                                        }
                                                    }
                                                }, _callee4, _this6, [[11, 17]]);
                                            }));

                                            return function (_x4, _x5) {
                                                return _ref5.apply(this, arguments);
                                            };
                                        }());
                                    }

                                    // Start reading
                                    _readFromCursor();
                                }));

                            case 1:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function queryWithCursor(_x3) {
                return _ref4.apply(this, arguments);
            }

            return queryWithCursor;
        }()
    }, {
        key: 'bulkInsert',
        value: function () {
            var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(table, rows) {
                var _this7 = this;

                return _regenerator2.default.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                return _context6.abrupt('return', new _promise2.default(function (resolve, reject) {
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

                                    _this7._client.query(query, values, function (err, result) {
                                        if (err) {
                                            _cli2.default.fatal(err.message);
                                            return reject(err);
                                        }

                                        return resolve();
                                    });
                                }));

                            case 1:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function bulkInsert(_x6, _x7) {
                return _ref6.apply(this, arguments);
            }

            return bulkInsert;
        }()
    }]);
    return PostgresConnector;
}(_BaseConnector3.default);

exports.default = PostgresConnector;