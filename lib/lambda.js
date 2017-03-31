'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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

console.time('pg2pg');
(0, _config_import2.default)(config).then(function (c) {
    return send(c);
}).then(function (resp) {
    if ((typeof resp === 'undefined' ? 'undefined' : (0, _typeof3.default)(resp)) === 'object') {
        console.log((0, _stringify2.default)(resp, null, 4));
        console.timeEnd('pg2pg');
    } else {
        console.log(resp);
    }
}).catch(function (err) {
    console.log(err);
});

function send(conf) {
    return new _promise2.default(function (resolve, reject) {
        var options = {
            // uri: `${hostname}?query=${encodeURIComponent(JSON.stringify(conf))}`,
            uri: hostname,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            json: true,
            body: {
                query: conf
            },
            timeout: 6 * 60 * 1000
        };

        (0, _request2.default)(options, function (err, res, body) {
            if (err) {
                return reject(err);
            } else if (res.statusCode >= 400) {
                console.log(body);

                return reject(new Error('[' + res.statusCode + '] ' + res.statusMessage));
            }

            return resolve(body);
        });
    });
}