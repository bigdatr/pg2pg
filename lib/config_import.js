'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getFile = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(path) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        return _context2.abrupt('return', new _promise2.default(function (resolve, reject) {
                            _fs2.default.readFile(path, 'utf8', function (err, data) {
                                if (err) {
                                    return reject(err);
                                }

                                return resolve(data);
                            });
                        }));

                    case 1:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function getFile(_x2) {
        return _ref2.apply(this, arguments);
    };
}();

var parse = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(text) {
        var config, i, c;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        config = JSON.parse(text);

                        // Import Queries from sql files

                        i = 0;

                    case 2:
                        if (!(i < config.commands.length)) {
                            _context3.next = 19;
                            break;
                        }

                        c = config.commands[i];

                        if (!c.source_query_file) {
                            _context3.next = 10;
                            break;
                        }

                        _context3.next = 7;
                        return getFile(c.source_query_file);

                    case 7:
                        c.source_query = _context3.sent;
                        _context3.next = 14;
                        break;

                    case 10:
                        if (!c.query_file) {
                            _context3.next = 14;
                            break;
                        }

                        _context3.next = 13;
                        return getFile(c.query_file);

                    case 13:
                        c.query = _context3.sent;

                    case 14:

                        if (!c.description) {
                            c.description = 'Command ' + (i + 1);
                        }

                        config.commands[i] = c;

                    case 16:
                        i++;
                        _context3.next = 2;
                        break;

                    case 19:
                        return _context3.abrupt('return', config);

                    case 20:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function parse(_x3) {
        return _ref3.apply(this, arguments);
    };
}();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(path) {
        var raw, config;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return getFile(path);

                    case 2:
                        raw = _context.sent;
                        _context.next = 5;
                        return parse(raw);

                    case 5:
                        config = _context.sent;
                        return _context.abrupt('return', config);

                    case 7:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    function config_import(_x) {
        return _ref.apply(this, arguments);
    }

    return config_import;
}();