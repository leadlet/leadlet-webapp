'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OneToOne = exports.ManyToMany = exports.ForeignKey = exports.Attribute = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

exports.attr = attr;
exports.fk = fk;
exports.many = many;
exports.oneToOne = oneToOne;

var _findKey = require('lodash/findKey');

var _findKey2 = _interopRequireDefault(_findKey);

var _descriptors = require('./descriptors');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module fields
 */
var Attribute = exports.Attribute = function () {
    function Attribute(opts) {
        (0, _classCallCheck3.default)(this, Attribute);

        this.opts = opts || {};

        if (this.opts.hasOwnProperty('getDefault')) {
            this.getDefault = this.opts.getDefault;
        }
    }

    Attribute.prototype.install = function install(model, fieldName, orm) {
        (0, _defineProperty2.default)(model.prototype, fieldName, (0, _descriptors.attrDescriptor)(fieldName));
    };

    return Attribute;
}();

var RelationalField = function () {
    function RelationalField() {
        (0, _classCallCheck3.default)(this, RelationalField);

        if (arguments.length === 1 && (0, _typeof3.default)(arguments.length <= 0 ? undefined : arguments[0]) === 'object') {
            var opts = arguments.length <= 0 ? undefined : arguments[0];
            this.toModelName = opts.to;
            this.relatedName = opts.relatedName;
            this.through = opts.through;
            this.throughFields = opts.throughFields;
        } else {
            this.toModelName = arguments.length <= 0 ? undefined : arguments[0];
            this.relatedName = arguments.length <= 1 ? undefined : arguments[1];
        }
    }

    RelationalField.prototype.getClass = function getClass() {
        return this.constructor;
    };

    return RelationalField;
}();

var ForeignKey = exports.ForeignKey = function (_RelationalField) {
    (0, _inherits3.default)(ForeignKey, _RelationalField);

    function ForeignKey() {
        (0, _classCallCheck3.default)(this, ForeignKey);
        return (0, _possibleConstructorReturn3.default)(this, _RelationalField.apply(this, arguments));
    }

    ForeignKey.prototype.install = function install(model, fieldName, orm) {
        var toModelName = this.toModelName;
        var toModel = toModelName === 'this' ? model : orm.get(toModelName);

        // Forwards.
        (0, _defineProperty2.default)(model.prototype, fieldName, (0, _descriptors.forwardManyToOneDescriptor)(fieldName, toModel.modelName));

        // Backwards.
        var backwardsFieldName = this.relatedName ? this.relatedName : (0, _utils.reverseFieldName)(model.modelName);

        var backwardsDescriptor = (0, _getOwnPropertyDescriptor2.default)(toModel.prototype, backwardsFieldName);

        if (backwardsDescriptor) {
            var errorMsg = (0, _utils.reverseFieldErrorMessage)(model.modelName, fieldName, toModel.modelName, backwardsFieldName);
            throw new Error(errorMsg);
        }

        (0, _defineProperty2.default)(toModel.prototype, backwardsFieldName, (0, _descriptors.backwardManyToOneDescriptor)(fieldName, model.modelName));

        var ThisField = this.getClass();
        toModel.virtualFields[backwardsFieldName] = new ThisField(model.modelName, fieldName);
    };

    return ForeignKey;
}(RelationalField);

var ManyToMany = exports.ManyToMany = function (_RelationalField2) {
    (0, _inherits3.default)(ManyToMany, _RelationalField2);

    function ManyToMany() {
        (0, _classCallCheck3.default)(this, ManyToMany);
        return (0, _possibleConstructorReturn3.default)(this, _RelationalField2.apply(this, arguments));
    }

    ManyToMany.prototype.install = function install(model, fieldName, orm) {
        var toModelName = this.toModelName;
        var toModel = toModelName === 'this' ? model : orm.get(toModelName);

        // Forwards.

        var throughModelName = this.through || (0, _utils.m2mName)(model.modelName, fieldName);

        var throughModel = orm.get(throughModelName);

        var throughFields = void 0;
        if (!this.throughFields) {
            var toFieldName = (0, _findKey2.default)(throughModel.fields, function (field) {
                return field instanceof ForeignKey && field.toModelName === toModel.modelName;
            });
            var fromFieldName = (0, _findKey2.default)(throughModel.fields, function (field) {
                return field instanceof ForeignKey && field.toModelName === model.modelName;
            });
            throughFields = {
                to: toFieldName,
                from: fromFieldName
            };
        } else {
            var _throughFields = (0, _slicedToArray3.default)(this.throughFields, 2),
                fieldAName = _throughFields[0],
                fieldBName = _throughFields[1];

            var fieldA = throughModel.fields[fieldAName];
            if (fieldA.toModelName === toModel.modelName) {
                throughFields = {
                    to: fieldAName,
                    from: fieldBName
                };
            } else {
                throughFields = {
                    to: fieldBName,
                    from: fieldAName
                };
            }
        }

        (0, _defineProperty2.default)(model.prototype, fieldName, (0, _descriptors.manyToManyDescriptor)(model.modelName, toModel.modelName, throughModelName, throughFields, false));

        model.virtualFields[fieldName] = new ManyToMany({
            to: toModel.modelName,
            relatedName: fieldName,
            through: this.through,
            throughFields: throughFields
        });

        // Backwards.
        var backwardsFieldName = this.relatedName ? this.relatedName : (0, _utils.reverseFieldName)(model.modelName);

        var backwardsDescriptor = (0, _getOwnPropertyDescriptor2.default)(toModel.prototype, backwardsFieldName);

        if (backwardsDescriptor) {
            // Backwards field was already defined on toModel.
            var errorMsg = (0, _utils.reverseFieldErrorMessage)(model.modelName, fieldName, toModel.modelName, backwardsFieldName);
            throw new Error(errorMsg);
        }

        (0, _defineProperty2.default)(toModel.prototype, backwardsFieldName, (0, _descriptors.manyToManyDescriptor)(model.modelName, toModel.modelName, throughModelName, throughFields, true));
        toModel.virtualFields[backwardsFieldName] = new ManyToMany({
            to: model.modelName,
            relatedName: fieldName,
            through: throughModelName,
            throughFields: throughFields
        });
    };

    ManyToMany.prototype.getDefault = function getDefault() {
        return [];
    };

    return ManyToMany;
}(RelationalField);

var OneToOne = exports.OneToOne = function (_RelationalField3) {
    (0, _inherits3.default)(OneToOne, _RelationalField3);

    function OneToOne() {
        (0, _classCallCheck3.default)(this, OneToOne);
        return (0, _possibleConstructorReturn3.default)(this, _RelationalField3.apply(this, arguments));
    }

    OneToOne.prototype.install = function install(model, fieldName, orm) {
        var toModelName = this.toModelName;
        var toModel = toModelName === 'this' ? model : orm.get(toModelName);

        // Forwards.
        (0, _defineProperty2.default)(model.prototype, fieldName, (0, _descriptors.forwardOneToOneDescriptor)(fieldName, toModel.modelName));

        // Backwards.
        var backwardsFieldName = this.relatedName ? this.relatedName : model.modelName.toLowerCase();

        var backwardsDescriptor = (0, _getOwnPropertyDescriptor2.default)(toModel.prototype, backwardsFieldName);

        if (backwardsDescriptor) {
            var errorMsg = (0, _utils.reverseFieldErrorMessage)(model.modelName, fieldName, toModel.modelName, backwardsFieldName);
            throw new Error(errorMsg);
        }

        (0, _defineProperty2.default)(toModel.prototype, backwardsFieldName, (0, _descriptors.backwardOneToOneDescriptor)(fieldName, model.modelName));
        toModel.virtualFields[backwardsFieldName] = new OneToOne(model.modelName, fieldName);
    };

    return OneToOne;
}(RelationalField);

/**
 * Defines a value attribute on the model.
 * Though not required, it is recommended to define this for each non-foreign key you wish to use.
 * Getters and setters need to be defined on each Model
 * instantiation for undeclared data fields, which is slower.
 * You can use the optional `getDefault` parameter to fill in unpassed values
 * to {@link Model#create}, such as for generating ID's with UUID:
 *
 * ```javascript
 * import getUUID from 'your-uuid-package-of-choice';
 *
 * fields = {
 *   id: attr({ getDefault: () => getUUID() }),
 *   title: attr(),
 * }
 * ```
 *
 * @param  {Object} [opts]
 * @param {Function} [opts.getDefault] - if you give a function here, it's return
 *                                       value from calling with zero arguments will
 *                                       be used as the value when creating a new Model
 *                                       instance with {@link Model#create} if the field
 *                                       value is not passed.
 * @return {Attribute}
 */


function attr(opts) {
    return new Attribute(opts);
}

/**
 * Defines a foreign key on a model, which points
 * to a single entity on another model.
 *
 * You can pass arguments as either a single object,
 * or two arguments.
 *
 * If you pass two arguments, the first one is the name
 * of the Model the foreign key is pointing to, and
 * the second one is an optional related name, which will
 * be used to access the Model the foreign key
 * is being defined from, from the target Model.
 *
 * If the related name is not passed, it will be set as
 * `${toModelName}Set`.
 *
 * If you pass an object to `fk`, it has to be in the form
 *
 * ```javascript
 * fields = {
 *   author: fk({ to: 'Author', relatedName: 'books' })
 * }
 * ```
 *
 * Which is equal to
 *
 * ```javascript
 * fields = {
 *   author: fk('Author', 'books'),
 * }
 * ```
 *
 * @param  {string|boolean} toModelNameOrObj - the `modelName` property of
 *                                           the Model that is the target of the
 *                                           foreign key, or an object with properties
 *                                           `to` and optionally `relatedName`.
 * @param {string} [relatedName] - if you didn't pass an object as the first argument,
 *                                 this is the property name that will be used to
 *                                 access a QuerySet the foreign key is defined from,
 *                                 from the target model.
 * @return {ForeignKey}
 */
function fk() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return new (Function.prototype.bind.apply(ForeignKey, [null].concat(args)))();
}

/**
 * Defines a many-to-many relationship between
 * this (source) and another (target) model.
 *
 * The relationship is modeled with an extra model called the through model.
 * The through model has foreign keys to both the source and target models.
 *
 * You can define your own through model if you want to associate more information
 * to the relationship. A custom through model must have at least two foreign keys,
 * one pointing to the source Model, and one pointing to the target Model.
 *
 * If you have more than one foreign key pointing to a source or target Model in the
 * through Model, you must pass the option `throughFields`, which is an array of two
 * strings, where the strings are the field names that identify the foreign keys to
 * be used for the many-to-many relationship. Redux-ORM will figure out which field name
 * points to which model by checking the through Model definition.
 *
 * Unlike `fk`, this function accepts only an object argument.
 *
 * ```javascript
 * class Authorship extends Model {}
 * Authorship.modelName = 'Authorship';
 * Authorship.fields = {
 *   author: fk('Author', 'authorships'),
 *   book: fk('Book', 'authorships'),
 * };
 *
 * class Author extends Model {}
 * Author.modelName = 'Author';
 * Author.fields = {
 *   books: many({
 *     to: 'Book',
 *     relatedName: 'authors',
 *     through: 'Authorship',
 *
 *     // this is optional, since Redux-ORM can figure
 *     // out the through fields itself as there aren't
 *     // multiple foreign keys pointing to the same models.
 *     throughFields: ['author', 'book'],
 *   })
 * };
 *
 * class Book extends Model {}
 * Book.modelName = 'Book';
 * ```
 *
 * You should only define the many-to-many relationship on one side. In the
 * above case of Authors to Books through Authorships, the relationship is
 * defined only on the Author model.
 *
 * @param  {Object} options - options
 * @param  {string} options.to - the `modelName` attribute of the target Model.
 * @param  {string} [options.through] - the `modelName` attribute of the through Model which
 *                                    must declare at least one foreign key to both source and
 *                                    target Models. If not supplied, Redux-Orm will autogenerate
 *                                    one.
 * @param  {string[]} [options.throughFields] - this must be supplied only when a custom through
 *                                            Model has more than one foreign key pointing to
 *                                            either the source or target mode. In this case
 *                                            Redux-ORM can't figure out the correct fields for
 *                                            you, you must provide them. The supplied array should
 *                                            have two elements that are the field names for the
 *                                            through fields you want to declare the many-to-many
 *                                            relationship with. The order doesn't matter;
 *                                            Redux-ORM will figure out which field points to
 *                                            the source Model and which to the target Model.
 * @param  {string} [options.relatedName] - the attribute used to access a QuerySet
 *                                          of source Models from target Model.
 * @return {ManyToMany}
 */
function many() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
    }

    return new (Function.prototype.bind.apply(ManyToMany, [null].concat(args)))();
}

/**
 * Defines a one-to-one relationship. In database terms, this is a foreign key with the
 * added restriction that only one entity can point to single target entity.
 *
 * The arguments are the same as with `fk`. If `relatedName` is not supplied,
 * the source model name in lowercase will be used. Note that with the one-to-one
 * relationship, the `relatedName` should be in singular, not plural.
 * @param  {string|boolean} toModelNameOrObj - the `modelName` property of
 *                                           the Model that is the target of the
 *                                           foreign key, or an object with properties
 *                                           `to` and optionally `relatedName`.
 * @param {string} [relatedName] - if you didn't pass an object as the first argument,
 *                                 this is the property name that will be used to
 *                                 access a Model the foreign key is defined from,
 *                                 from the target Model.
 * @return {OneToOne}
 */
function oneToOne() {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
    }

    return new (Function.prototype.bind.apply(OneToOne, [null].concat(args)))();
}