'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _ = require('../');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ORM', function () {
    it('constructor works', function () {
        new _.ORM(); // eslint-disable-line no-new
    });

    describe('throws on invalid model declarations', function () {
        it('with multiple one-to-one fields to the same model without related name', function () {
            var A = function (_Model) {
                (0, _inherits3.default)(A, _Model);

                function A() {
                    (0, _classCallCheck3.default)(this, A);
                    return (0, _possibleConstructorReturn3.default)(this, _Model.apply(this, arguments));
                }

                return A;
            }(_.Model);

            A.modelName = 'A';

            var B = function (_Model2) {
                (0, _inherits3.default)(B, _Model2);

                function B() {
                    (0, _classCallCheck3.default)(this, B);
                    return (0, _possibleConstructorReturn3.default)(this, _Model2.apply(this, arguments));
                }

                return B;
            }(_.Model);

            B.modelName = 'B';
            B.fields = {
                field1: (0, _.oneToOne)('A'),
                field2: (0, _.oneToOne)('A')
            };
            var orm = new _.ORM();
            orm.register(A, B);
            expect(function () {
                return orm.getModelClasses();
            }).toThrowError(/field/);
        });

        it('with multiple foreign keys to the same model without related name', function () {
            var A = function (_Model3) {
                (0, _inherits3.default)(A, _Model3);

                function A() {
                    (0, _classCallCheck3.default)(this, A);
                    return (0, _possibleConstructorReturn3.default)(this, _Model3.apply(this, arguments));
                }

                return A;
            }(_.Model);

            A.modelName = 'A';

            var B = function (_Model4) {
                (0, _inherits3.default)(B, _Model4);

                function B() {
                    (0, _classCallCheck3.default)(this, B);
                    return (0, _possibleConstructorReturn3.default)(this, _Model4.apply(this, arguments));
                }

                return B;
            }(_.Model);

            B.modelName = 'B';
            B.fields = {
                field1: (0, _.fk)('A'),
                field2: (0, _.fk)('A')
            };
            var orm = new _.ORM();
            orm.register(A, B);
            expect(function () {
                return orm.getModelClasses();
            }).toThrowError(/field/);
        });

        it('with multiple many-to-manys to the same model without related name', function () {
            var A = function (_Model5) {
                (0, _inherits3.default)(A, _Model5);

                function A() {
                    (0, _classCallCheck3.default)(this, A);
                    return (0, _possibleConstructorReturn3.default)(this, _Model5.apply(this, arguments));
                }

                return A;
            }(_.Model);

            A.modelName = 'A';

            var B = function (_Model6) {
                (0, _inherits3.default)(B, _Model6);

                function B() {
                    (0, _classCallCheck3.default)(this, B);
                    return (0, _possibleConstructorReturn3.default)(this, _Model6.apply(this, arguments));
                }

                return B;
            }(_.Model);

            B.modelName = 'B';
            B.fields = {
                field1: (0, _.many)('A'),
                field2: (0, _.many)('A')
            };
            var orm = new _.ORM();
            orm.register(A, B);
            expect(function () {
                return orm.getModelClasses();
            }).toThrowError(/field/);
        });
    });

    describe('simple orm', function () {
        var orm = void 0;
        var Book = void 0;
        var Author = void 0;
        var Cover = void 0;
        var Genre = void 0;
        var Publisher = void 0;
        beforeEach(function () {
            var _createTestModels = (0, _utils.createTestModels)();

            Book = _createTestModels.Book;
            Author = _createTestModels.Author;
            Cover = _createTestModels.Cover;
            Genre = _createTestModels.Genre;
            Publisher = _createTestModels.Publisher;


            orm = new _.ORM();
        });

        it('correctly registers a single model at a time', function () {
            expect(orm.registry).toHaveLength(0);
            orm.register(Book);
            expect(orm.registry).toHaveLength(1);
            orm.register(Author);
            expect(orm.registry).toHaveLength(2);
        });

        it('correctly registers multiple models', function () {
            expect(orm.registry).toHaveLength(0);
            orm.register(Book, Author);
            expect(orm.registry).toHaveLength(2);
        });

        it('correctly starts session', function () {
            var initialState = {};
            var session = orm.session(initialState);
            expect(session).toBeInstanceOf(_.Session);
        });

        it('correctly gets models from registry', function () {
            orm.register(Book);
            expect(orm.get('Book')).toBe(Book);
        });

        it('correctly sets model prototypes', function () {
            orm.register(Book, Author, Cover, Genre, Publisher);
            expect(Book.isSetUp).toBeFalsy();

            var coverDescriptor = (0, _getOwnPropertyDescriptor2.default)(Book.prototype, 'cover');
            expect(coverDescriptor).toBeUndefined();
            var authorDescriptor = (0, _getOwnPropertyDescriptor2.default)(Book.prototype, 'author');
            expect(authorDescriptor).toBeUndefined();
            var genresDescriptor = (0, _getOwnPropertyDescriptor2.default)(Book.prototype, 'genres');
            expect(genresDescriptor).toBeUndefined();

            var publisherDescriptor = (0, _getOwnPropertyDescriptor2.default)(Book.prototype, 'publisher');
            expect(publisherDescriptor).toBeUndefined();

            orm._setupModelPrototypes(orm.registry);
            orm._setupModelPrototypes(orm.implicitThroughModels);

            expect(Book.isSetUp).toBeTruthy();

            coverDescriptor = (0, _getOwnPropertyDescriptor2.default)(Book.prototype, 'cover');
            expect((0, _typeof3.default)(coverDescriptor.get)).toBe('function');
            expect((0, _typeof3.default)(coverDescriptor.set)).toBe('function');

            authorDescriptor = (0, _getOwnPropertyDescriptor2.default)(Book.prototype, 'author');
            expect((0, _typeof3.default)(authorDescriptor.get)).toBe('function');
            expect((0, _typeof3.default)(authorDescriptor.set)).toBe('function');

            genresDescriptor = (0, _getOwnPropertyDescriptor2.default)(Book.prototype, 'genres');
            expect((0, _typeof3.default)(genresDescriptor.get)).toBe('function');
            expect((0, _typeof3.default)(genresDescriptor.set)).toBe('function');

            publisherDescriptor = (0, _getOwnPropertyDescriptor2.default)(Book.prototype, 'publisher');
            expect((0, _typeof3.default)(publisherDescriptor.get)).toBe('function');
            expect((0, _typeof3.default)(publisherDescriptor.set)).toBe('function');
        });

        it('correctly gets the default state', function () {
            orm.register(Book, Author, Cover, Genre, Publisher);
            var defaultState = orm.getEmptyState();

            expect(defaultState).toEqual({
                Book: {
                    items: [],
                    itemsById: {},
                    meta: {}
                },
                BookGenres: {
                    items: [],
                    itemsById: {},
                    meta: {}
                },
                Author: {
                    items: [],
                    itemsById: {},
                    meta: {}
                },
                Cover: {
                    items: [],
                    itemsById: {},
                    meta: {}
                },
                Genre: {
                    items: [],
                    itemsById: {},
                    meta: {}
                },
                Publisher: {
                    items: [],
                    itemsById: {},
                    meta: {}
                }
            });
        });

        it('correctly starts a mutating session', function () {
            orm.register(Book, Author, Cover, Genre, Publisher);
            var initialState = orm.getEmptyState();
            var session = orm.mutableSession(initialState);
            expect(session).toBeInstanceOf(_.Session);
            expect(session.withMutations).toBe(true);
        });
    });
});