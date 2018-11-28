'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createReducer = undefined;
exports.defaultUpdater = defaultUpdater;
exports.createSelector = createSelector;

var _reselect = require('reselect');

var _memoize = require('./memoize');

function defaultUpdater(session, action) {
    session.sessionBoundModels.forEach(function (modelClass) {
        if (typeof modelClass.reducer === 'function') {
            // This calls this.applyUpdate to update this.state
            modelClass.reducer(action, modelClass, session);
        }
    });
}

var createReducer = exports.createReducer = function createReducer(orm) {
    var updater = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultUpdater;
    return function (state, action) {
        var session = orm.session(state || orm.getEmptyState());
        updater(session, action);
        return session.state;
    };
};

/**
 * Returns a memoized selector based on passed arguments.
 * This is similar to `reselect`'s `createSelector`,
 * except you can also pass a single function to be memoized.
 *
 * If you pass multiple functions, the format will be the
 * same as in `reselect`. The last argument is the selector
 * function and the previous are input selectors.
 *
 * When you use this method to create a selector, the returned selector
 * expects the whole `redux-orm` state branch as input. In the selector
 * function that you pass as the last argument, you will receive
 * `session` argument (a `Session` instance) followed by any
 * input arguments, like in `reselect`.
 *
 * This is an example selector:
 *
 * ```javascript
 * // orm is an instance of ORM
 * const bookSelector = createSelector(orm, session => {
 *     return session.Book.map(book => {
 *         return Object.assign({}, book.ref, {
 *             authors: book.authors.map(author => author.name),
 *             genres: book.genres.map(genre => genre.name),
 *         });
 *     });
 * });
 * ```
 *
 * redux-orm uses a special memoization function to avoid recomputations.
 * When a selector runs for the first time, it checks which Models' state
 * branches were accessed. On subsequent runs, the selector first checks
 * if those branches have changed -- if not, it just returns the previous
 * result. This way you can use the `PureRenderMixin` in your React
 * components for performance gains.
 *
 * @param {ORM} orm - the ORM instance
 * @param  {...Function} args - zero or more input selectors
 *                              and the selector function.
 * @return {Function} memoized selector
 */
function createSelector(orm) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    if (args.length === 1) {
        return (0, _memoize.memoize)(args[0], _memoize.eqCheck, orm);
    }

    return (0, _reselect.createSelectorCreator)(_memoize.memoize, _memoize.eqCheck, orm).apply(undefined, args);
}