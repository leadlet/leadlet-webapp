"use strict";

exports.__esModule = true;
exports.default = _default;

function _default(fn) {
  var defer = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function () {
    return setTimeout(fn, 0);
  };

  return defer(fn);
}

module.exports = exports["default"];