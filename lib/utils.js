"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getToken = getToken;
function getToken(str) {
    // Assume that its only a variable in es6 token format eg. ${my_var_name}
    return str.substr(2, str.length - 3);
}