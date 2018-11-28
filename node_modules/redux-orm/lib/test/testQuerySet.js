'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _ = require('../');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('QuerySet tests', function () {
    var session = void 0;
    var bookQs = void 0;
    var genreQs = void 0;
    beforeEach(function () {
        var _createTestSessionWit = (0, _utils.createTestSessionWithData)();

        session = _createTestSessionWit.session;

        bookQs = session.Book.getQuerySet();
        genreQs = session.Genre.getQuerySet();
    });

    it('count works correctly', function () {
        expect(bookQs.count()).toBe(3);
        expect(genreQs.count()).toBe(4);
    });

    it('exists works correctly', function () {
        expect(bookQs.exists()).toBe(true);

        var emptyQs = new _.QuerySet(session.Book, []).filter(function () {
            return false;
        });

        expect(emptyQs.exists()).toBe(false);
    });

    it('at works correctly', function () {
        expect(bookQs.at(0)).toBeInstanceOf(_.Model);
        expect(bookQs.toRefArray()[0]).toBe(session.Book.withId(0).ref);
    });

    it('at doesn\'t return a Model instance if index is out of bounds', function () {
        expect(bookQs.at(-1)).toBeUndefined();
        var len = bookQs.count();
        expect(bookQs.at(len)).toBeUndefined();
    });

    it('first works correctly', function () {
        expect(bookQs.first()).toEqual(bookQs.at(0));
    });

    it('last works correctly', function () {
        var lastIndex = bookQs.count() - 1;
        expect(bookQs.last()).toEqual(bookQs.at(lastIndex));
    });

    it('all works correctly', function () {
        var all = bookQs.all();

        // Force evaluation of QuerySets
        bookQs.toRefArray();
        all.toRefArray();

        expect(all).not.toBe(bookQs);
        expect(all.rows.length).toBe(bookQs.rows.length);

        for (var i = 0; i < all.rows.length; i++) {
            expect(all.rows[i]).toBe(bookQs.rows[i]);
        }
    });

    it('filter works correctly with object argument', function () {
        var filtered = bookQs.filter({ name: 'Clean Code' });
        expect(filtered.count()).toBe(1);
        expect(filtered.first().ref).toBe(session.Book.withId(1).ref);
    });

    it('filter works correctly with object argument, with model instance value', function () {
        var filtered = bookQs.filter({
            author: session.Author.withId(0)
        });
        expect(filtered.count()).toBe(1);
        expect(filtered.first().ref).toBe(session.Book.withId(0).ref);
    });

    it('orderBy works correctly with prop argument', function () {
        var ordered = bookQs.orderBy(['releaseYear']);
        var idArr = ordered.toRefArray().map(function (row) {
            return row.id;
        });
        expect(idArr).toEqual([1, 2, 0]);
    });

    it('orderBy works correctly with function argument', function () {
        var ordered = bookQs.orderBy([function (book) {
            return book.releaseYear;
        }]);
        var idArr = ordered.toRefArray().map(function (row) {
            return row.id;
        });
        expect(idArr).toEqual([1, 2, 0]);
    });

    it('exclude works correctly with object argument', function () {
        var excluded = bookQs.exclude({ name: 'Clean Code' });
        expect(excluded.count()).toBe(2);

        var idArr = excluded.toRefArray().map(function (row) {
            return row.id;
        });
        expect(idArr).toEqual([0, 2]);
    });

    it('update records a update', function () {
        var mergeObj = { name: 'Updated Book Name' };
        bookQs.update(mergeObj);

        bookQs.toRefArray().forEach(function (row) {
            return expect(row.name).toBe('Updated Book Name');
        });
    });

    it('delete records a update', function () {
        bookQs.delete();
        expect(bookQs.count()).toBe(0);
    });

    it('custom methods works', function () {
        var _createTestModels = (0, _utils.createTestModels)(),
            Book = _createTestModels.Book,
            Genre = _createTestModels.Genre,
            Cover = _createTestModels.Cover,
            Author = _createTestModels.Author,
            Publisher = _createTestModels.Publisher;

        var currentYear = 2015;

        var CustomQuerySet = function (_QuerySet) {
            (0, _inherits3.default)(CustomQuerySet, _QuerySet);

            function CustomQuerySet() {
                (0, _classCallCheck3.default)(this, CustomQuerySet);
                return (0, _possibleConstructorReturn3.default)(this, _QuerySet.apply(this, arguments));
            }

            CustomQuerySet.prototype.unreleased = function unreleased() {
                return this.filter(function (book) {
                    return book.releaseYear > currentYear;
                });
            };

            return CustomQuerySet;
        }(_.QuerySet);

        CustomQuerySet.addSharedMethod('unreleased');

        Book.querySetClass = CustomQuerySet;

        var orm = new _.ORM();
        orm.register(Book, Genre, Cover, Author, Publisher);

        var _createTestSessionWit2 = (0, _utils.createTestSessionWithData)(orm),
            sess = _createTestSessionWit2.session;

        var customQs = sess.Book.getQuerySet();

        expect(customQs).toBeInstanceOf(CustomQuerySet);

        var unreleased = customQs.unreleased();
        expect(unreleased.count()).toBe(1);

        expect(unreleased.first().ref).toEqual({
            id: 0,
            name: 'Tommi Kaikkonen - an Autobiography',
            author: 0,
            cover: 0,
            releaseYear: 2050,
            publisher: 1
        });
        expect(sess.Book.unreleased().count()).toBe(1);
        expect(sess.Book.filter({ name: 'Clean Code' }).count()).toBe(1);
    });
});