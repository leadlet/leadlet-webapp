'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.warnDeprecated = exports.getBatchToken = exports.arrayDiffActions = exports.includes = exports.ops = exports.objectShallowEquals = exports.reverseFieldErrorMessage = exports.normalizeEntity = exports.reverseFieldName = exports.m2mToFieldName = exports.m2mFromFieldName = exports.m2mName = exports.attachQuerySetMethods = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _forOwn = require('lodash/forOwn');

var _forOwn2 = _interopRequireDefault(_forOwn);

var _includes = require('lodash/includes');

var _includes2 = _interopRequireDefault(_includes);

var _immutableOps = require('immutable-ops');

var _immutableOps2 = _interopRequireDefault(_immutableOps);

var _intersection = require('lodash/intersection');

var _intersection2 = _interopRequireDefault(_intersection);

var _difference = require('lodash/difference');

var _difference2 = _interopRequireDefault(_difference);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function warnDeprecated(msg) {
    var logger = typeof console.warn === 'function' ? console.warn.bind(console) : console.log.bind(console);
    return logger(msg);
}

/**
 * @module utils
 */

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Returns the branch name for a many-to-many relation.
 * The name is the combination of the model name and the field name the relation
 * was declared. The field name's first letter is capitalized.
 *
 * Example: model `Author` has a many-to-many relation to the model `Book`, defined
 * in the `Author` field `books`. The many-to-many branch name will be `AuthorBooks`.
 *
 * @private
 * @param  {string} declarationModelName - the name of the model the many-to-many relation was declared on
 * @param  {string} fieldName            - the field name where the many-to-many relation was declared on
 * @return {string} The branch name for the many-to-many relation.
 */
function m2mName(declarationModelName, fieldName) {
    return declarationModelName + capitalize(fieldName);
}

/**
 * Returns the fieldname that saves a foreign key to the
 * model id where the many-to-many relation was declared.
 *
 * Example: `Author` => `fromAuthorId`
 *
 * @private
 * @param  {string} declarationModelName - the name of the model where the relation was declared
 * @return {string} the field name in the through model for `declarationModelName`'s foreign key.
 */
function m2mFromFieldName(declarationModelName) {
    return 'from' + declarationModelName + 'Id';
}

/**
 * Returns the fieldname that saves a foreign key in a many-to-many through model to the
 * model where the many-to-many relation was declared.
 *
 * Example: `Book` => `toBookId`
 *
 * @private
 * @param  {string} otherModelName - the name of the model that was the target of the many-to-many
 *                                   declaration.
 * @return {string} the field name in the through model for `otherModelName`'s foreign key..
 */
function m2mToFieldName(otherModelName) {
    return 'to' + otherModelName + 'Id';
}

function reverseFieldName(modelName) {
    return modelName.toLowerCase() + 'Set'; // eslint-disable-line prefer-template
}

function querySetDelegatorFactory(methodName) {
    return function querySetDelegator() {
        var _getQuerySet;

        return (_getQuerySet = this.getQuerySet())[methodName].apply(_getQuerySet, arguments);
    };
}

function querySetGetterDelegatorFactory(getterName) {
    return function querySetGetterDelegator() {
        var qs = this.getQuerySet();
        return qs[getterName];
    };
}

function forEachSuperClass(subClass, func) {
    var currClass = subClass;
    while (currClass !== Function.prototype) {
        func(currClass);
        currClass = (0, _getPrototypeOf2.default)(currClass);
    }
}

function attachQuerySetMethods(modelClass, querySetClass) {
    var leftToDefine = querySetClass.sharedMethods.slice();

    // There is no way to get a property descriptor for the whole prototype chain;
    // only from an objects own properties. Therefore we traverse the whole prototype
    // chain for querySet.
    forEachSuperClass(querySetClass, function (cls) {
        for (var i = 0; i < leftToDefine.length; i++) {
            var defined = false;
            var methodName = leftToDefine[i];
            var descriptor = (0, _getOwnPropertyDescriptor2.default)(cls.prototype, methodName);
            if (typeof descriptor !== 'undefined') {
                if (typeof descriptor.get !== 'undefined') {
                    descriptor.get = querySetGetterDelegatorFactory(methodName);
                    (0, _defineProperty2.default)(modelClass, methodName, descriptor);
                    defined = true;
                } else if (typeof descriptor.value === 'function') {
                    modelClass[methodName] = querySetDelegatorFactory(methodName);
                    defined = true;
                }
            }
            if (defined) {
                leftToDefine.splice(i--, 1);
            }
        }
    });
}

/**
 * Normalizes `entity` to an id, where `entity` can be an id
 * or a Model instance.
 *
 * @private
 * @param  {*} entity - either a Model instance or an id value
 * @return {*} the id value of `entity`
 */
function normalizeEntity(entity) {
    if (entity !== null && typeof entity !== 'undefined' && typeof entity.getId === 'function') {
        return entity.getId();
    }
    return entity;
}

function reverseFieldErrorMessage(modelName, fieldName, toModelName, backwardsFieldName) {
    return ['Reverse field ' + backwardsFieldName + ' already defined', ' on model ' + toModelName + '. To fix, set a custom related', ' name on ' + modelName + '.' + fieldName + '.'].join('');
}

function objectShallowEquals(a, b) {
    var keysInA = 0;

    // eslint-disable-next-line consistent-return
    (0, _forOwn2.default)(a, function (value, key) {
        if (!b.hasOwnProperty(key) || b[key] !== value) {
            return false;
        }
        keysInA++;
    });

    return keysInA === (0, _keys2.default)(b).length;
}

function arrayDiffActions(sourceArr, targetArr) {
    var itemsInBoth = (0, _intersection2.default)(sourceArr, targetArr);
    var deleteItems = (0, _difference2.default)(sourceArr, itemsInBoth);
    var addItems = (0, _difference2.default)(targetArr, itemsInBoth);

    if (deleteItems.length || addItems.length) {
        return {
            delete: deleteItems,
            add: addItems
        };
    }
    return null;
}

var getBatchToken = _immutableOps2.default.getBatchToken;
exports.attachQuerySetMethods = attachQuerySetMethods;
exports.m2mName = m2mName;
exports.m2mFromFieldName = m2mFromFieldName;
exports.m2mToFieldName = m2mToFieldName;
exports.reverseFieldName = reverseFieldName;
exports.normalizeEntity = normalizeEntity;
exports.reverseFieldErrorMessage = reverseFieldErrorMessage;
exports.objectShallowEquals = objectShallowEquals;
exports.ops = _immutableOps2.default;
exports.includes = _includes2.default;
exports.arrayDiffActions = arrayDiffActions;
exports.getBatchToken = getBatchToken;
exports.warnDeprecated = warnDeprecated;