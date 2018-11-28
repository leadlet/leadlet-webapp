'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _ = require('../');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Redux integration', function () {
    var orm = void 0;
    var Book = void 0;
    var Cover = void 0;
    var Genre = void 0;
    var Author = void 0;
    var Publisher = void 0;
    var defaultState = void 0;
    beforeEach(function () {
        var _createTestModels = (0, _utils.createTestModels)();

        Book = _createTestModels.Book;
        Cover = _createTestModels.Cover;
        Genre = _createTestModels.Genre;
        Author = _createTestModels.Author;
        Publisher = _createTestModels.Publisher;

        orm = new _.ORM();
        orm.register(Book, Cover, Genre, Author, Publisher);
        defaultState = orm.getEmptyState();
    });

    it('runs reducers if explicitly specified', function () {
        Author.reducer = jest.fn();
        Book.reducer = jest.fn();
        Cover.reducer = jest.fn();
        Genre.reducer = jest.fn();
        Publisher.reducer = jest.fn();

        var reducer = (0, _.createReducer)(orm);
        var mockAction = {};
        var nextState = reducer(defaultState, mockAction);

        expect(nextState).not.toBeUndefined();

        expect(Author.reducer).toHaveBeenCalledTimes(1);
        expect(Book.reducer).toHaveBeenCalledTimes(1);
        expect(Cover.reducer).toHaveBeenCalledTimes(1);
        expect(Genre.reducer).toHaveBeenCalledTimes(1);
        expect(Publisher.reducer).toHaveBeenCalledTimes(1);
    });

    it('correctly creates a selector', function () {
        var selectorTimesRun = 0;
        var selector = (0, _.createSelector)(orm, function () {
            return selectorTimesRun++;
        });
        expect(typeof selector === 'undefined' ? 'undefined' : (0, _typeof3.default)(selector)).toBe('function');

        var state = orm.getEmptyState();

        selector(state);
        expect(selectorTimesRun).toBe(1);
        selector(state);
        expect(selectorTimesRun).toBe(1);
        selector(orm.getEmptyState());
        expect(selectorTimesRun).toBe(1);
    });

    it('correctly creates a selector with input selectors', function () {
        var _selectorFunc = jest.fn();

        var selector = (0, _.createSelector)(orm, function (state) {
            return state.orm;
        }, function (state) {
            return state.selectedUser;
        }, _selectorFunc);

        var _state = orm.getEmptyState();

        var appState = {
            orm: _state,
            selectedUser: 5
        };

        expect(typeof selector === 'undefined' ? 'undefined' : (0, _typeof3.default)(selector)).toBe('function');

        selector(appState);
        expect(_selectorFunc.mock.calls.length).toBe(1);

        var lastCall = _selectorFunc.mock.calls[_selectorFunc.mock.calls.length - 1];
        expect(lastCall[0]).toBeInstanceOf(_.Session);
        expect(lastCall[0].state).toBe(_state);
        expect(lastCall[1]).toBe(5);

        selector(appState);
        expect(_selectorFunc.mock.calls.length).toBe(1);

        var otherUserState = (0, _assign2.default)({}, appState, { selectedUser: 0 });

        selector(otherUserState);
        expect(_selectorFunc.mock.calls.length).toBe(2);
    });

    it('calling reducer with undefined state doesn\'t throw', function () {
        var reducer = (0, _.createReducer)(orm);
        reducer(undefined, { type: '______init' });
    });
});