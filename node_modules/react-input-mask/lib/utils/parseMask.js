"use strict";

exports.__esModule = true;
exports.default = _default;

var _constants = require("../constants");

function _default(mask, maskChar, charsRules) {
  if (maskChar === undefined) {
    maskChar = _constants.defaultMaskChar;
  }

  if (charsRules == null) {
    charsRules = _constants.defaultCharsRules;
  }

  if (!mask || typeof mask !== 'string') {
    return {
      maskChar: maskChar,
      charsRules: charsRules,
      mask: null,
      prefix: null,
      lastEditablePos: null,
      permanents: []
    };
  }

  var str = '';
  var prefix = '';
  var permanents = [];
  var isPermanent = false;
  var lastEditablePos = null;
  mask.split('').forEach(function (character) {
    if (!isPermanent && character === '\\') {
      isPermanent = true;
    } else {
      if (isPermanent || !charsRules[character]) {
        permanents.push(str.length);

        if (str.length === permanents.length - 1) {
          prefix += character;
        }
      } else {
        lastEditablePos = str.length + 1;
      }

      str += character;
      isPermanent = false;
    }
  });
  return {
    maskChar: maskChar,
    charsRules: charsRules,
    prefix: prefix,
    mask: str,
    lastEditablePos: lastEditablePos,
    permanents: permanents
  };
}

module.exports = exports["default"];