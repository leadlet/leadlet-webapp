'use strict';

var _ = require('../');

var _utils = require('./utils');

var _constants = require('../constants');

describe('Session', function () {
    var orm = void 0;
    var Book = void 0;
    var Cover = void 0;
    var Genre = void 0;
    var Author = void 0;
    var Publisher = void 0;
    var emptyState = void 0;
    beforeEach(function () {
        var _createTestModels = (0, _utils.createTestModels)();

        Book = _createTestModels.Book;
        Cover = _createTestModels.Cover;
        Genre = _createTestModels.Genre;
        Author = _createTestModels.Author;
        Publisher = _createTestModels.Publisher;

        orm = new _.ORM();
        orm.register(Book, Cover, Genre, Author, Publisher);
        emptyState = orm.getEmptyState();
    });

    it('connects models', function () {
        expect(Book.session).toBeUndefined();
        expect(Cover.session).toBeUndefined();
        expect(Genre.session).toBeUndefined();
        expect(Cover.session).toBeUndefined();
        expect(Publisher.session).toBeUndefined();

        var session = orm.session(emptyState);

        expect(session.Book.session).toBe(session);
        expect(session.Cover.session).toBe(session);
        expect(session.Genre.session).toBe(session);
        expect(session.Cover.session).toBe(session);
        expect(session.Publisher.session).toBe(session);
    });

    it('exposes models as getter properties', function () {
        var session = orm.session(emptyState);
        expect((0, _utils.isSubclass)(session.Book, Book)).toBe(true);
        expect((0, _utils.isSubclass)(session.Author, Author)).toBe(true);
        expect((0, _utils.isSubclass)(session.Cover, Cover)).toBe(true);
        expect((0, _utils.isSubclass)(session.Genre, Genre)).toBe(true);
        expect((0, _utils.isSubclass)(session.Publisher, Publisher)).toBe(true);
    });

    it('marks accessed models', function () {
        var session = orm.session(emptyState);
        expect(session.accessedModels).toHaveLength(0);

        session.markAccessed(Book.modelName);
        expect(session.accessedModels).toHaveLength(1);
        expect(session.accessedModels[0]).toBe('Book');

        session.markAccessed(Book.modelName);

        expect(session.accessedModels[0]).toBe('Book');
    });

    describe('gets the next state', function () {
        it('without any updates, the same state is returned', function () {
            var session = orm.session(emptyState);
            expect(session.state).toBe(emptyState);
        });

        it('with updates, a new state is returned', function () {
            var session = orm.session(emptyState);

            session.applyUpdate({
                table: Author.modelName,
                action: _constants.CREATE,
                payload: {
                    id: 0,
                    name: 'Caesar'
                }
            });

            var nextState = session.state;

            expect(nextState).not.toBe(emptyState);

            expect(nextState[Author.modelName]).not.toBe(emptyState[Author.modelName]);

            // All other model states should stay equal.
            expect(nextState[Book.modelName]).toBe(emptyState[Book.modelName]);
            expect(nextState[Cover.modelName]).toBe(emptyState[Cover.modelName]);
            expect(nextState[Genre.modelName]).toBe(emptyState[Genre.modelName]);
            expect(nextState[Publisher.modelName]).toBe(emptyState[Publisher.modelName]);
        });
    });

    it('two concurrent sessions', function () {
        var otherState = orm.getEmptyState();

        var firstSession = orm.session(emptyState);
        var secondSession = orm.session(otherState);

        expect(firstSession.sessionBoundModels).toHaveLength(6);

        expect(firstSession.Book).not.toBe(secondSession.Book);
        expect(firstSession.Author).not.toBe(secondSession.Author);
        expect(firstSession.Genre).not.toBe(secondSession.Genre);
        expect(firstSession.Cover).not.toBe(secondSession.Cover);
        expect(firstSession.Publisher).not.toBe(secondSession.Publisher);
    });
});