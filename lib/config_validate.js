'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = config_validate;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function config_validate(config) {
    if (!config || (typeof config === 'undefined' ? 'undefined' : (0, _typeof3.default)(config)) !== 'object') {
        throw new Error('Invalid config');
    }

    ensureProps(config);

    // More validation here
}

function ensureProps(obj) {
    var requiredProps = ['schema_version', 'refs', 'commands'];

    var missingProps = requiredProps.filter(function (p) {
        return !obj[p];
    });

    if (missingProps.length > 0) {
        throw new Error('Config is missing \'' + missingProps.join(', ') + '\'');
    } else if (obj.schema_version !== 1.1) {
        throw new Error('This version of pg2pg only supports schema_version 1.1. Your schema_version is ' + obj.schema_version);
    }
}