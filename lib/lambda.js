'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _cli = require('cli');

var _cli2 = _interopRequireDefault(_cli);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _config_import = require('./config_import');

var _config_import2 = _interopRequireDefault(_config_import);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_cli2.default.enable('status');

var _cli$parse = _cli2.default.parse({
    config: ['c', 'A config file with details', 'file'],
    hostname: ['h', 'Hostname for the lamda (https://...)', 'string']
}),
    config = _cli$parse.config,
    hostname = _cli$parse.hostname;

if (!config) {
    _cli2.default.fatal('Config path is required. See `pg2pg --help`');
    process.exit(1);
} else if (!hostname) {
    _cli2.default.fatal('Config path is required. See `pg2pg --help`');
    process.exit(1);
}

console.log('----------------------------------');
console.log(' PG2PG Lambda');
console.log('----------------------------------');

(0, _config_import2.default)(config).then(function (c) {
    return send(c);
}).then(function (resp) {
    return console.log(JSON.parse(resp));
}).catch(function (err) {
    console.log(err);
});

function send(conf) {
    return new _promise2.default(function (resolve, reject) {
        var uri = hostname + '?query=' + encodeURIComponent((0, _stringify2.default)(conf));

        (0, _request2.default)(uri, function (err, res, body) {
            if (err) {
                return reject(err);
            } else if (res.statusCode >= 400) {
                var b = body ? JSON.parse(body) : { message: body };
                return reject(new Error('[' + res.statusCode + '] ' + res.statusMessage + ' - ' + b.message));
            }

            return resolve(body);
        });
    });
}