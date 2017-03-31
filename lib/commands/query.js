'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(command, connections, queryParams) {
        var database, result;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (connections[command.database]) {
                            _context.next = 2;
                            break;
                        }

                        throw new Error('Could not find database \'' + command.database + '\' in refs. Please check command \'' + command.description + '\'');

                    case 2:
                        database = connections[command.database].connection;
                        _context.next = 5;
                        return database.query(command.query, queryParams);

                    case 5:
                        result = _context.sent;


                        console.log(_chalk2.default.green('COMPLETE:'), command.query);

                        // let STATUS_MESSAGE_SUFFIX = '';
                        //
                        // if (result.command === 'DELETE') {
                        //     STATUS_MESSAGE_SUFFIX = ` DELETED ${result.rowCount} rows`.cyan;
                        // }

                        // status.setPattern(
                        //     `  ${'\u2713 '.magenta} ${STATUS_MESSAGE}    ${STATUS_MESSAGE_SUFFIX}`
                        // );
                        // status.stamp();
                        // status.removeItem(commandStatus);

                    case 7:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    function query(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    }

    return query;
}();