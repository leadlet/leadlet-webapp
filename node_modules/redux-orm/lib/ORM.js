'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ORM = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

exports.DeprecatedSchema = DeprecatedSchema;

var _forOwn = require('lodash/forOwn');

var _forOwn2 = _interopRequireDefault(_forOwn);

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _Session = require('./Session');

var _Session2 = _interopRequireDefault(_Session);

var _Model2 = require('./Model');

var _Model3 = _interopRequireDefault(_Model2);

var _db = require('./db');

var _fields = require('./fields');

var _redux = require('./redux');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ORM_DEFAULTS = {
    createDatabase: _db.createDatabase
};

/**
 * ORM - the Object Relational Mapper.
 *
 * Use instances of this class to:
 *
 * - Register your {@link Model} classes using {@link ORM#register}
 * - Get the empty state for the underlying database with {@link ORM#getEmptyState}
 * - Start an immutable database session with {@link ORM#session}
 * - Start a mutating database session with {@link ORM#mutableSession}
 *
 * Internally, this class handles generating a schema specification from models
 * to the database.
 */
var ORM = exports.ORM = function () {
    /**
     * Creates a new ORM instance.
     */
    function ORM(opts) {
        (0, _classCallCheck3.default)(this, ORM);

        var _Object$assign = (0, _assign2.default)({}, ORM_DEFAULTS, opts || {}),
            createDatabase = _Object$assign.createDatabase;

        this.createDatabase = createDatabase;
        this.registry = [];
        this.implicitThroughModels = [];
        this.installedFields = {};
    }

    /**
     * Registers a {@link Model} class to the ORM.
     *
     * If the model has declared any ManyToMany fields, their
     * through models will be generated and registered with
     * this call, unless a custom through model has been specified.
     *
     * @param  {...Model} model - a {@link Model} class to register
     * @return {undefined}
     */


    ORM.prototype.register = function register() {
        var _this = this;

        for (var _len = arguments.length, models = Array(_len), _key = 0; _key < _len; _key++) {
            models[_key] = arguments[_key];
        }

        models.forEach(function (model) {
            model.invalidateClassCache();

            _this.registerManyToManyModelsFor(model);
            _this.registry.push(model);
        });
    };

    ORM.prototype.registerManyToManyModelsFor = function registerManyToManyModelsFor(model) {
        var _this3 = this;

        var fields = model.fields;
        var thisModelName = model.modelName;

        (0, _forOwn2.default)(fields, function (fieldInstance, fieldName) {
            if (fieldInstance instanceof _fields.ManyToMany && !fieldInstance.through) {
                var _Through$fields;

                var toModelName = void 0;
                if (fieldInstance.toModelName === 'this') {
                    toModelName = thisModelName;
                } else {
                    toModelName = fieldInstance.toModelName;
                }

                var fromFieldName = (0, _utils.m2mFromFieldName)(thisModelName);
                var toFieldName = (0, _utils.m2mToFieldName)(toModelName);

                var Through = function (_Model) {
                    (0, _inherits3.default)(ThroughModel, _Model);

                    function ThroughModel() {
                        (0, _classCallCheck3.default)(this, ThroughModel);
                        return (0, _possibleConstructorReturn3.default)(this, _Model.apply(this, arguments));
                    }

                    return ThroughModel;
                }(_Model3.default);

                Through.modelName = (0, _utils.m2mName)(thisModelName, fieldName);

                Through.fields = (_Through$fields = {
                    id: (0, _fields.attr)()
                }, (0, _defineProperty3.default)(_Through$fields, fromFieldName, new _fields.ForeignKey(thisModelName)), (0, _defineProperty3.default)(_Through$fields, toFieldName, new _fields.ForeignKey(toModelName)), _Through$fields);

                Through.invalidateClassCache();
                _this3.implicitThroughModels.push(Through);
            }
        });
    };

    /**
     * Gets a {@link Model} class by its name from the registry.
     * @param  {string} modelName - the name of the {@link Model} class to get
     * @throws If {@link Model} class is not found.
     * @return {Model} the {@link Model} class, if found
     */


    ORM.prototype.get = function get(modelName) {
        var found = (0, _find2.default)(this.registry.concat(this.implicitThroughModels), function (model) {
            return model.modelName === modelName;
        });

        if (typeof found === 'undefined') {
            throw new Error('Did not find model ' + modelName + ' from registry.');
        }
        return found;
    };

    ORM.prototype.getModelClasses = function getModelClasses() {
        this._setupModelPrototypes(this.registry);
        this._setupModelPrototypes(this.implicitThroughModels);
        return this.registry.concat(this.implicitThroughModels);
    };

    ORM.prototype._attachQuerySetMethods = function _attachQuerySetMethods(model) {
        var querySetClass = model.querySetClass;

        (0, _utils.attachQuerySetMethods)(model, querySetClass);
    };

    ORM.prototype.isFieldInstalled = function isFieldInstalled(modelName, fieldName) {
        return this.installedFields.hasOwnProperty(modelName) ? !!this.installedFields[modelName][fieldName] : false;
    };

    ORM.prototype.setFieldInstalled = function setFieldInstalled(modelName, fieldName) {
        if (!this.installedFields.hasOwnProperty(modelName)) {
            this.installedFields[modelName] = {};
        }
        this.installedFields[modelName][fieldName] = true;
    };

    ORM.prototype._setupModelPrototypes = function _setupModelPrototypes(models) {
        var _this4 = this;

        models.forEach(function (model) {
            if (!model.isSetUp) {
                var fields = model.fields;
                (0, _forOwn2.default)(fields, function (fieldInstance, fieldName) {
                    if (!_this4.isFieldInstalled(model.modelName, fieldName)) {
                        fieldInstance.install(model, fieldName, _this4);
                        _this4.setFieldInstalled(model.modelName, fieldName);
                    }
                });
                _this4._attachQuerySetMethods(model);
                model.isSetUp = true;
            }
        });
    };

    ORM.prototype.generateSchemaSpec = function generateSchemaSpec() {
        var models = this.getModelClasses();
        var tables = models.reduce(function (spec, modelClass) {
            var tableName = modelClass.modelName;
            var tableSpec = modelClass._getTableOpts(); // eslint-disable-line no-underscore-dangle
            spec[tableName] = (0, _assign2.default)({}, { fields: modelClass.fields }, tableSpec);
            return spec;
        }, {});
        return { tables: tables };
    };

    ORM.prototype.getDatabase = function getDatabase() {
        if (!this.db) {
            this.db = this.createDatabase(this.generateSchemaSpec());
        }
        return this.db;
    };

    /**
     * Returns the empty database state.
     * @return {Object} the empty state
     */


    ORM.prototype.getEmptyState = function getEmptyState() {
        return this.getDatabase().getEmptyState();
    };

    /**
     * Begins an immutable database session.
     *
     * @param  {Object} state  - the state the database manages
     * @return {Session} a new {@link Session} instance
     */


    ORM.prototype.session = function session(state) {
        return new _Session2.default(this, this.getDatabase(), state);
    };

    /**
     * Begins a mutable database session.
     *
     * @param  {Object} state  - the state the database manages
     * @return {Session} a new {@link Session} instance
     */


    ORM.prototype.mutableSession = function mutableSession(state) {
        return new _Session2.default(this, this.getDatabase(), state, true);
    };

    // DEPRECATED AND REMOVED METHODS

    ORM.prototype.withMutations = function withMutations(state) {
        (0, _utils.warnDeprecated)('ORM.prototype.withMutations is deprecated. ' + 'Use ORM.prototype.mutableSession instead.');

        return this.mutableSession(state);
    };

    ORM.prototype.from = function from(state) {
        (0, _utils.warnDeprecated)('ORM.prototype.from function is deprecated. ' + 'Use ORM.prototype.session instead.');
        return this.session(state);
    };

    ORM.prototype.reducer = function reducer() {
        (0, _utils.warnDeprecated)('ORM.prototype.reducer is deprecated. Access ' + 'the Session.prototype.state property instead.');
        return (0, _redux.createReducer)(this);
    };

    ORM.prototype.createSelector = function createSelector() {
        (0, _utils.warnDeprecated)('ORM.prototype.createSelector is deprecated. ' + 'Import `createSelector` from Redux-ORM instead.');

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _redux.createSelector.apply(undefined, [this].concat(args));
    };

    ORM.prototype.getDefaultState = function getDefaultState() {
        (0, _utils.warnDeprecated)('ORM.prototype.getDefaultState is deprecated. Use ' + 'the ORM.prototype.getEmptyState instead.');
        return this.getEmptyState();
    };

    ORM.prototype.define = function define() {
        throw new Error('ORM.prototype.define is removed. Please define a Model class.');
    };

    return ORM;
}();

function DeprecatedSchema() {
    throw new Error('Schema has been renamed to ORM. Please import ORM instead of Schema ' + 'from Redux-ORM.');
}

exports.default = ORM;