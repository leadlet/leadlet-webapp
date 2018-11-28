'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isSubclass = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.createTestModels = createTestModels;
exports.createTestORM = createTestORM;
exports.createTestSession = createTestSession;
exports.createTestSessionWithData = createTestSessionWithData;

var _ORM = require('../ORM');

var _ORM2 = _interopRequireDefault(_ORM);

var _Model6 = require('../Model');

var _Model7 = _interopRequireDefault(_Model6);

var _fields = require('../fields');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * These utils create a database schema for testing.
 * The schema is simple but covers most relational
 * cases: foreign keys, one-to-ones, many-to-many's,
 * named reverse relations.
 */

var AUTHORS_INITIAL = [{
    name: 'Tommi Kaikkonen'
}, {
    name: 'John Doe'
}, {
    name: 'Stephen King'
}];

var COVERS_INITIAL = [{
    src: 'cover.jpg'
}, {
    src: 'cover.jpg'
}, {
    src: 'cover.jpg'
}];

var GENRES_INITIAL = [{
    name: 'Biography'
}, {
    name: 'Autobiography'
}, {
    name: 'Software Development'
}, {
    name: 'Redux'
}];

var BOOKS_INITIAL = [{
    name: 'Tommi Kaikkonen - an Autobiography',
    author: 0,
    cover: 0,
    genres: [0, 1],
    releaseYear: 2050,
    publisher: 1
}, {
    name: 'Clean Code',
    author: 1,
    cover: 1,
    genres: [2],
    releaseYear: 2008,
    publisher: 0
}, {
    name: 'Getting Started with Redux',
    author: 2,
    cover: 2,
    genres: [2, 3],
    releaseYear: 2015,
    publisher: 0
}];

var PUBLISHERS_INITIAL = [{
    name: 'Technical Publishing'
}, {
    name: 'Autobiographies Inc'
}];

function createTestModels() {
    var Book = function (_Model) {
        (0, _inherits3.default)(BookModel, _Model);

        function BookModel() {
            (0, _classCallCheck3.default)(this, BookModel);
            return (0, _possibleConstructorReturn3.default)(this, _Model.apply(this, arguments));
        }

        (0, _createClass3.default)(BookModel, null, [{
            key: 'fields',
            get: function get() {
                return {
                    id: (0, _fields.attr)(),
                    name: (0, _fields.attr)(),
                    releaseYear: (0, _fields.attr)(),
                    author: (0, _fields.fk)('Author', 'books'),
                    cover: (0, _fields.oneToOne)('Cover'),
                    genres: (0, _fields.many)('Genre', 'books'),
                    publisher: (0, _fields.fk)('Publisher', 'books')
                };
            }
        }]);
        return BookModel;
    }(_Model7.default);

    Book.modelName = 'Book';

    var Author = function (_Model2) {
        (0, _inherits3.default)(AuthorModel, _Model2);

        function AuthorModel() {
            (0, _classCallCheck3.default)(this, AuthorModel);
            return (0, _possibleConstructorReturn3.default)(this, _Model2.apply(this, arguments));
        }

        (0, _createClass3.default)(AuthorModel, null, [{
            key: 'fields',
            get: function get() {
                return {
                    id: (0, _fields.attr)(),
                    name: (0, _fields.attr)(),
                    publishers: (0, _fields.many)({
                        to: 'Publisher',
                        through: 'Book',
                        relatedName: 'authors'
                    })
                };
            }
        }]);
        return AuthorModel;
    }(_Model7.default);
    Author.modelName = 'Author';

    var Cover = function (_Model3) {
        (0, _inherits3.default)(CoverModel, _Model3);

        function CoverModel() {
            (0, _classCallCheck3.default)(this, CoverModel);
            return (0, _possibleConstructorReturn3.default)(this, _Model3.apply(this, arguments));
        }

        return CoverModel;
    }(_Model7.default);
    Cover.modelName = 'Cover';
    Cover.fields = {
        id: (0, _fields.attr)(),
        src: (0, _fields.attr)()
    };

    var Genre = function (_Model4) {
        (0, _inherits3.default)(GenreModel, _Model4);

        function GenreModel() {
            (0, _classCallCheck3.default)(this, GenreModel);
            return (0, _possibleConstructorReturn3.default)(this, _Model4.apply(this, arguments));
        }

        return GenreModel;
    }(_Model7.default);
    Genre.modelName = 'Genre';
    Genre.fields = {
        id: (0, _fields.attr)(),
        name: (0, _fields.attr)()
    };

    var Publisher = function (_Model5) {
        (0, _inherits3.default)(PublisherModel, _Model5);

        function PublisherModel() {
            (0, _classCallCheck3.default)(this, PublisherModel);
            return (0, _possibleConstructorReturn3.default)(this, _Model5.apply(this, arguments));
        }

        return PublisherModel;
    }(_Model7.default);
    Publisher.modelName = 'Publisher';
    Publisher.fields = {
        id: (0, _fields.attr)(),
        name: (0, _fields.attr)()
    };

    return {
        Book: Book,
        Author: Author,
        Cover: Cover,
        Genre: Genre,
        Publisher: Publisher
    };
}

function createTestORM(customModels) {
    var models = customModels || createTestModels();
    var Book = models.Book,
        Author = models.Author,
        Cover = models.Cover,
        Genre = models.Genre,
        Publisher = models.Publisher;


    var orm = new _ORM2.default();
    orm.register(Book, Author, Cover, Genre, Publisher);
    return orm;
}

function createTestSession() {
    var orm = createTestORM();
    return orm.session(orm.getEmptytate());
}

function createTestSessionWithData(customORM) {
    var orm = customORM || createTestORM();
    var state = orm.getEmptyState();

    var _orm$mutableSession = orm.mutableSession(state),
        Author = _orm$mutableSession.Author,
        Cover = _orm$mutableSession.Cover,
        Genre = _orm$mutableSession.Genre,
        Book = _orm$mutableSession.Book,
        Publisher = _orm$mutableSession.Publisher;

    AUTHORS_INITIAL.forEach(function (props) {
        return Author.create(props);
    });
    COVERS_INITIAL.forEach(function (props) {
        return Cover.create(props);
    });
    GENRES_INITIAL.forEach(function (props) {
        return Genre.create(props);
    });
    BOOKS_INITIAL.forEach(function (props) {
        return Book.create(props);
    });
    PUBLISHERS_INITIAL.forEach(function (props) {
        return Publisher.create(props);
    });

    var normalSession = orm.session(state);
    return { session: normalSession, orm: orm, state: state };
}

var isSubclass = exports.isSubclass = function isSubclass(a, b) {
    return a.prototype instanceof b;
};