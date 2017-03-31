'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var importAndRun = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(path) {
        var startTime, c, duration, seconds;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        startTime = new Date();


                        console.log('----------------------------------');
                        console.log(' PG2PG');
                        console.log('----------------------------------');

                        _context.prev = 4;
                        _context.next = 7;
                        return (0, _config_import2.default)(path);

                    case 7:
                        c = _context.sent;
                        _context.next = 10;
                        return (0, _run2.default)(c);

                    case 10:
                        duration = new Date() - startTime;
                        seconds = Math.round(duration / 100) / 10;


                        console.log('----------------------------------');
                        console.log('Total Duration: ' + seconds + 's');

                        process.exit(0);
                        _context.next = 20;
                        break;

                    case 17:
                        _context.prev = 17;
                        _context.t0 = _context['catch'](4);

                        _cli2.default.fatal(_context.t0.stack || _context.t0);

                    case 20:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[4, 17]]);
    }));

    return function importAndRun(_x) {
        return _ref.apply(this, arguments);
    };
}();

var _cli = require('cli');

var _cli2 = _interopRequireDefault(_cli);

var _config_import = require('./config_import');

var _config_import2 = _interopRequireDefault(_config_import);

var _run = require('./run');

var _run2 = _interopRequireDefault(_run);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_cli2.default.enable('status');

var _cli$parse = _cli2.default.parse({
    config: ['c', 'A config file with details', 'file']
}),
    config = _cli$parse.config;

if (!config) {
    _cli2.default.fatal('Config path is required. See `pg2pg --help`');
    process.exit(1);
}

importAndRun(config);