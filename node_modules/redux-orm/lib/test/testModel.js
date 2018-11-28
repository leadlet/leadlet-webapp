'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _ = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Model', function () {
    describe('static method', function () {
        var Model = void 0;
        var sessionMock = void 0;
        beforeEach(function () {
            // Get a fresh copy
            // of Model, so our manipulations
            // won't survive longer than each test.
            Model = function (_BaseModel) {
                (0, _inherits3.default)(TestModel, _BaseModel);

                function TestModel() {
                    (0, _classCallCheck3.default)(this, TestModel);
                    return (0, _possibleConstructorReturn3.default)(this, _BaseModel.apply(this, arguments));
                }

                return TestModel;
            }(_.Model);
            Model.modelName = 'Model';

            var orm = new _.ORM();
            orm.register(Model);
            sessionMock = orm.session();
        });

        it('make sure instance methods are enumerable', function () {
            // See #29.

            var enumerableProps = {};
            for (var propName in Model) {
                // eslint-disable-line
                enumerableProps[propName] = true;
            }

            expect(enumerableProps.create).toBe(true);
        });

        it('session getter works correctly', function () {
            expect(Model.session).toBeUndefined();
            Model._session = sessionMock;
            expect(Model.session).toBe(sessionMock);
        });

        it('connect works correctly', function () {
            expect(Model.session).toBeUndefined();
            Model.connect(sessionMock);
            expect(Model.session).toBe(sessionMock);
        });
    });

    describe('Instance methods', function () {
        var Model = void 0;
        var instance = void 0;

        beforeEach(function () {
            Model = function (_BaseModel2) {
                (0, _inherits3.default)(TestModel, _BaseModel2);

                function TestModel() {
                    (0, _classCallCheck3.default)(this, TestModel);
                    return (0, _possibleConstructorReturn3.default)(this, _BaseModel2.apply(this, arguments));
                }

                return TestModel;
            }(_.Model);
            Model.modelName = 'Model';
            Model.fields = {
                id: (0, _.attr)(),
                name: (0, _.attr)(),
                tags: new _.ManyToMany('_')
            };

            instance = new Model({ id: 0, name: 'Tommi' });
        });

        it('equals works correctly', function () {
            var anotherInstance = new Model({ id: 0, name: 'Tommi' });
            expect(instance.equals(anotherInstance)).toBeTruthy();
        });

        it('getClass works correctly', function () {
            expect(instance.getClass()).toBe(Model);
        });
    });
});