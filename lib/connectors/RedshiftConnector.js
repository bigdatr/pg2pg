'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(batchSize, rows, onResults) {
        var batches, i, j, chunk, b;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
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
                            _context3.next = 9;
                            break;
                        }

                        _context3.next = 6;
                        return onResults(batches[b]);

                    case 6:
                        b++;
                        _context3.next = 3;
                        break;

                    case 9:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function _batchAndProcess(_x4, _x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

var _PostgresConnector2 = require('./PostgresConnector');

var _PostgresConnector3 = _interopRequireDefault(_PostgresConnector2);

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

var _pgCursor = require('pg-cursor');

var _pgCursor2 = _interopRequireDefault(_pgCursor);

var _cli = require('cli');

var _cli2 = _interopRequireDefault(_cli);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_BATCH_SIZE = 1000;

var RedshiftConnector = function (_PostgresConnector) {
    (0, _inherits3.default)(RedshiftConnector, _PostgresConnector);

    function RedshiftConnector() {
        (0, _classCallCheck3.default)(this, RedshiftConnector);
        return (0, _possibleConstructorReturn3.default)(this, (RedshiftConnector.__proto__ || (0, _getPrototypeOf2.default)(RedshiftConnector)).apply(this, arguments));
    }

    (0, _createClass3.default)(RedshiftConnector, [{
        key: 'queryWithCursor',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(options) {
                var _this2 = this;

                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                return _context2.abrupt('return', new _promise2.default(function () {
                                    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(resolve, reject) {
                                        var query, onResults, batchSize, rows;
                                        return _regenerator2.default.wrap(function _callee$(_context) {
                                            while (1) {
                                                switch (_context.prev = _context.next) {
                                                    case 0:
                                                        if (_this2._client) {
                                                            _context.next = 4;
                                                            break;
                                                        }

                                                        return _context.abrupt('return', reject(new Error('Missing client')));

                                                    case 4:
                                                        if (options) {
                                                            _context.next = 8;
                                                            break;
                                                        }

                                                        return _context.abrupt('return', reject(new Error('Missing options')));

                                                    case 8:
                                                        if (options.query) {
                                                            _context.next = 12;
                                                            break;
                                                        }

                                                        return _context.abrupt('return', reject(new Error('Missing `query` in options')));

                                                    case 12:
                                                        if (options.onResults) {
                                                            _context.next = 14;
                                                            break;
                                                        }

                                                        return _context.abrupt('return', reject(new Error('Missing `onResults` in options')));

                                                    case 14:
                                                        query = options.query, onResults = options.onResults;
                                                        batchSize = options.batchSize;


                                                        batchSize = batchSize || DEFAULT_BATCH_SIZE;

                                                        _context.next = 19;
                                                        return _this2.query(query);

                                                    case 19:
                                                        rows = _context.sent;
                                                        _context.next = 22;
                                                        return _batchAndProcess(batchSize, rows, onResults);

                                                    case 22:
                                                        resolve();

                                                    case 23:
                                                    case 'end':
                                                        return _context.stop();
                                                }
                                            }
                                        }, _callee, _this2);
                                    }));

                                    return function (_x2, _x3) {
                                        return _ref2.apply(this, arguments);
                                    };
                                }()));

                            case 1:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function queryWithCursor(_x) {
                return _ref.apply(this, arguments);
            }

            return queryWithCursor;
        }()
    }]);
    return RedshiftConnector;
}(_PostgresConnector3.default);

exports.default = RedshiftConnector;