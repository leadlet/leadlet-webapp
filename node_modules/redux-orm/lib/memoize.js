'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.eqCheck = eqCheck;
exports.memoize = memoize;

var _values = require('lodash/values');

var _values2 = _interopRequireDefault(_values);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function eqCheck(a, b) {
    return a === b;
}

function shouldRun(invalidatorMap, state) {
    return (0, _values2.default)(invalidatorMap).some(function (invalidate) {
        return invalidate(state);
    });
}

/**
 * A memoizer to use with redux-orm
 * selectors. When the memoized function is first run,
 * the memoizer will remember the models that are accessed
 * during that function run.
 *
 * On subsequent runs, the memoizer will check if those
 * models' states have changed compared to the previous run.
 *
 * Memoization algorithm operates like this:
 *
 * 1. Has the selector been run before? If not, go to 5.
 *
 * 2. If the selector has other input selectors in addition to the
 *    ORM state selector, check their results for equality with the previous results.
 *    If they aren't equal, go to 5.
 *
 * 3. Is the ORM state referentially equal to the previous ORM state the selector
 *    was called with? If yes, return the previous result.
 *
 * 4. Check which Model's states the selector has accessed on previous runs.
 *    Check for equality with each of those states versus their states in the
 *    previous ORM state. If all of them are equal, return the previous result.
 *
 * 5. Run the selector. Check the Session object used by the selector for
 *    which Model's states were accessed, and merge them with the previously
 *    saved information about accessed models (if-else branching can change
 *    which models are accessed on different inputs). Save the ORM state and
 *    other arguments the selector was called with, overriding previously
 *    saved values. Save the selector result. Return the selector result.
 *
 * @private
 * @param  {Function} func - function to memoize
 * @param  {Function} equalityCheck - equality check function to use with normal
 *                                  selector args
 * @param  {ORM} orm - a redux-orm ORM instance
 * @return {Function} `func` memoized.
 */
function memoize(func) {
    var equalityCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : eqCheck;
    var orm = arguments[2];

    var lastOrmState = null;
    var lastResult = null;
    var lastArgs = null;
    var modelNameToInvalidatorMap = {};

    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var dbState = args[0],
            otherArgs = args.slice(1);


        var dbIsEqual = lastOrmState === dbState || !shouldRun(modelNameToInvalidatorMap, dbState);

        var argsAreEqual = lastArgs && otherArgs.every(function (value, index) {
            return equalityCheck(value, lastArgs[index]);
        });

        if (dbIsEqual && argsAreEqual) {
            return lastResult;
        }

        var session = orm.session(dbState);
        var newArgs = [session].concat((0, _toConsumableArray3.default)(otherArgs));
        var result = func.apply(undefined, (0, _toConsumableArray3.default)(newArgs));

        // If a selector has control flow branching, different
        // input arguments might result in a different set of
        // accessed models. On each run, we check if any new
        // models are accessed and add their invalidator functions.
        session.accessedModels.forEach(function (modelName) {
            if (!modelNameToInvalidatorMap.hasOwnProperty(modelName)) {
                modelNameToInvalidatorMap[modelName] = function (nextState) {
                    return lastOrmState[modelName] !== nextState[modelName];
                };
            }
        });

        lastResult = result;
        lastOrmState = dbState;
        lastArgs = otherArgs;

        return lastResult;
    };
}