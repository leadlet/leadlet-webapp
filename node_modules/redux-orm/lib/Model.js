'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _defineProperty2 = require('babel-runtime/core-js/object/define-property');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _defineProperty4 = require('babel-runtime/helpers/defineProperty');

var _defineProperty5 = _interopRequireDefault(_defineProperty4);

var _forOwn = require('lodash/forOwn');

var _forOwn2 = _interopRequireDefault(_forOwn);

var _uniq = require('lodash/uniq');

var _uniq2 = _interopRequireDefault(_uniq);

var _Session = require('./Session');

var _Session2 = _interopRequireDefault(_Session);

var _QuerySet = require('./QuerySet');

var _QuerySet2 = _interopRequireDefault(_QuerySet);

var _fields = require('./fields');

var _constants = require('./constants');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Generates a query specification
// to get a single row from a table identified
// by a primary key.
function getByIdQuery(modelInstance) {
    var modelClass = modelInstance.getClass();
    return {
        table: modelClass.modelName,
        clauses: [{
            type: _constants.FILTER,
            payload: (0, _defineProperty5.default)({}, modelClass.idAttribute, modelInstance.getId())
        }]
    };
}

/**
 * The heart of an ORM, the data model.
 *
 * The fields you specify to the Model will be used to generate
 * a schema to the database, related property accessors, and
 * possibly through models.
 *
 * In each {@link Session} you instantiate from an {@link ORM} instance,
 * you will receive a session-specific subclass of this Model. The methods
 * you define here will be available to you in sessions.
 *
 * An instance of {@link Model} represents a record in the database, though
 * it is possible to generate multiple instances from the same record in the database.
 *
 * To create data models in your schema, subclass {@link Model}. To define
 * information about the data model, override static class methods. Define instance
 * logic by defining prototype methods (without `static` keyword).
 */
var Model = function () {
    /**
     * Creates a Model instance from it's properties.
     * Don't use this to create a new record; Use the static method {@link Model#create}.
     * @param  {Object} props - the properties to instantiate with
     */
    function Model(props) {
        (0, _classCallCheck3.default)(this, Model);

        this._initFields(props);
    }

    Model.prototype._initFields = function _initFields(props) {
        var _this = this;

        this._fields = (0, _assign2.default)({}, props);

        (0, _forOwn2.default)(props, function (fieldValue, fieldName) {
            // In this case, we got a prop that wasn't defined as a field.
            // Assuming it's an arbitrary data field, making an instance-specific
            // descriptor for it.
            // Using the in operator as the property could be defined anywhere
            // on the prototype chain.
            if (!(fieldName in _this)) {
                (0, _defineProperty3.default)(_this, fieldName, {
                    get: function get() {
                        return _this._fields[fieldName];
                    },
                    set: function set(value) {
                        return _this.set(fieldName, value);
                    },
                    configurable: true,
                    enumerable: true
                });
            }
        });
    };

    Model.toString = function toString() {
        return 'ModelClass: ' + this.modelName;
    };

    /**
     * Returns the options object passed to the database for the table that represents
     * this Model class.
     *
     * Returns an empty object by default, which means the database
     * will use default options. You can either override this function to return the options
     * you want to use, or assign the options object as a static property of the same name to the
     * Model class.
     *
     * @return {Object} the options object passed to the database for the table
     *                  representing this Model class.
     */


    Model.options = function options() {
        return {};
    };

    Model._getTableOpts = function _getTableOpts() {
        if (typeof this.backend === 'function') {
            (0, _utils.warnDeprecated)('Model.backend is deprecated. Please rename to .options');
            return this.backend();
        } else if (this.backend) {
            (0, _utils.warnDeprecated)('Model.backend is deprecated. Please rename to .options');
            return this.backend;
        } else if (typeof this.options === 'function') {
            return this.options();
        }
        return this.options;
    };

    Model.markAccessed = function markAccessed() {
        this.session.markAccessed(this);
    };

    /**
     * Returns the id attribute of this {@link Model}.
     *
     * @return {string} The id attribute of this {@link Model}.
     */


    /**
     * Connect the model class to a {@link Session}.
     *
     * @private
     * @param  {Session} session - The session to connect to.
     */
    Model.connect = function connect(session) {
        if (!(session instanceof _Session2.default)) {
            throw Error('A model can only connect to a Session instance.');
        }
        this._session = session;
    };

    /**
     * Get the current {@link Session} instance.
     *
     * @private
     * @return {Session} The current {@link Session} instance.
     */


    Model.getQuerySet = function getQuerySet() {
        var QuerySetClass = this.querySetClass;
        return new QuerySetClass(this);
    };

    Model.invalidateClassCache = function invalidateClassCache() {
        this.isSetUp = undefined;
        this.virtualFields = {};
    };

    /**
     * Returns a {@link QuerySet} containing all {@link Model} instances.
     * @return {QuerySet} a QuerySet containing all {@link Model} instances
     */
    Model.all = function all() {
        return this.getQuerySet();
    };

    /**
     * Update many-many relations for model.
     * @param relations
     */


    Model.prototype._refreshMany2Many = function _refreshMany2Many(relations) {
        var _this2 = this;

        var ThisModel = this.getClass();
        var fields = ThisModel.fields;
        var virtualFields = ThisModel.virtualFields;

        (0, _keys2.default)(relations).forEach(function (name) {
            var reverse = !fields.hasOwnProperty(name);
            var field = virtualFields[name];
            var values = relations[name];

            var normalizedNewIds = values.map(_utils.normalizeEntity);
            var uniqueIds = (0, _uniq2.default)(normalizedNewIds);

            if (normalizedNewIds.length !== uniqueIds.length) {
                throw new Error('Found duplicate id(s) when passing "' + normalizedNewIds + '" to ' + ThisModel.modelName + '.' + name + ' value');
            }

            var throughModelName = field.through || (0, _utils.m2mName)(ThisModel.modelName, name);
            var ThroughModel = ThisModel.session[throughModelName];

            var fromField = void 0;
            var toField = void 0;

            if (!reverse) {
                var _field$throughFields = field.throughFields;
                fromField = _field$throughFields.from;
                toField = _field$throughFields.to;
            } else {
                var _field$throughFields2 = field.throughFields;
                toField = _field$throughFields2.from;
                fromField = _field$throughFields2.to;
            }

            var currentIds = ThroughModel.filter(function (through) {
                return through[fromField] === _this2[ThisModel.idAttribute];
            }).toRefArray().map(function (ref) {
                return ref[toField];
            });

            var diffActions = (0, _utils.arrayDiffActions)(currentIds, normalizedNewIds);

            if (diffActions) {
                var idsToDelete = diffActions.delete;
                var idsToAdd = diffActions.add;
                if (idsToDelete.length > 0) {
                    var _name;

                    (_name = _this2[name]).remove.apply(_name, (0, _toConsumableArray3.default)(idsToDelete));
                }
                if (idsToAdd.length > 0) {
                    var _name2;

                    (_name2 = _this2[name]).add.apply(_name2, (0, _toConsumableArray3.default)(idsToAdd));
                }
            }
        });
    };

    /**
     * Creates a new record in the database, instantiates a {@link Model} and returns it.
     *
     * If you pass values for many-to-many fields, instances are created on the through
     * model as well.
     *
     * @param  {props} userProps - the new {@link Model}'s properties.
     * @return {Model} a new {@link Model} instance.
     */


    Model.create = function create(userProps) {
        var _this3 = this;

        var props = (0, _assign2.default)({}, userProps);

        var m2mRelations = {};

        var declaredFieldNames = (0, _keys2.default)(this.fields);
        var declaredVirtualFieldNames = (0, _keys2.default)(this.virtualFields);

        declaredFieldNames.forEach(function (key) {
            var field = _this3.fields[key];
            var valuePassed = userProps.hasOwnProperty(key);
            if (!(field instanceof _fields.ManyToMany)) {
                if (valuePassed) {
                    var value = userProps[key];
                    props[key] = (0, _utils.normalizeEntity)(value);
                } else if (field.getDefault) {
                    props[key] = field.getDefault();
                }
            } else if (valuePassed) {
                // If a value is supplied for a ManyToMany field,
                // discard them from props and save for later processing.
                m2mRelations[key] = userProps[key];
                delete props[key];
            }
        });

        // add backward many-many if required
        declaredVirtualFieldNames.forEach(function (key) {
            if (!m2mRelations.hasOwnProperty(key)) {
                var field = _this3.virtualFields[key];
                if (userProps.hasOwnProperty(key) && field instanceof _fields.ManyToMany) {
                    // If a value is supplied for a ManyToMany field,
                    // discard them from props and save for later processing.
                    m2mRelations[key] = userProps[key];
                    delete props[key];
                }
            }
        });

        var newEntry = this.session.applyUpdate({
            action: _constants.CREATE,
            table: this.modelName,
            payload: props
        });

        var ModelClass = this;
        var instance = new ModelClass(newEntry);
        instance._refreshMany2Many(m2mRelations); // eslint-disable-line no-underscore-dangle
        return instance;
    };

    /**
     * Creates a new or update existing record in the database, instantiates a {@link Model} and returns it.
     *
     * If you pass values for many-to-many fields, instances are created on the through
     * model as well.
     *
     * @param  {props} userProps - the required {@link Model}'s properties.
     * @return {Model} a {@link Model} instance.
     */


    Model.upsert = function upsert(userProps) {
        var idAttr = this.idAttribute;
        if (userProps.hasOwnProperty(idAttr) && this.hasId(userProps[idAttr])) {
            var model = this.withId(userProps[idAttr]);
            model.update(userProps);
            return model;
        }

        return this.create(userProps);
    };

    /**
     * Returns a {@link Model} instance for the object with id `id`.
     * This throws if the `id` doesn't exist. Use {@link Model#hasId}
     * to check for existence first if you're not certain.
     *
     * @param  {*} id - the `id` of the object to get
     * @throws If object with id `id` doesn't exist
     * @return {Model} {@link Model} instance with id `id`
     */


    Model.withId = function withId(id) {
        var ModelClass = this;
        var rows = this._findDatabaseRows((0, _defineProperty5.default)({}, ModelClass.idAttribute, id));
        if (rows.length === 0) {
            throw new Error(ModelClass.modelName + ' instance with id ' + id + ' not found');
        }

        return new ModelClass(rows[0]);
    };

    /**
     * Returns a boolean indicating if an entity with the id `id` exists
     * in the state.
     *
     * @param  {*}  id - a value corresponding to the id attribute of the {@link Model} class.
     * @return {Boolean} a boolean indicating if entity with `id` exists in the state
     */


    Model.hasId = function hasId(id) {
        var rows = this._findDatabaseRows((0, _defineProperty5.default)({}, this.idAttribute, id));
        return rows.length === 1;
    };

    Model._findDatabaseRows = function _findDatabaseRows(lookupObj) {
        var ModelClass = this;
        return ModelClass.session.query({
            table: ModelClass.modelName,
            clauses: [{
                type: _constants.FILTER,
                payload: lookupObj
            }]
        }).rows;
    };

    /**
     * Gets the {@link Model} instance that matches properties in `lookupObj`.
     * Throws an error if {@link Model} is not found, or multiple records match
     * the properties.
     *
     * @param  {Object} lookupObj - the properties used to match a single entity.
     * @return {Model} a {@link Model} instance that matches `lookupObj` properties.
     */


    Model.get = function get(lookupObj) {
        var ModelClass = this;

        var rows = this._findDatabaseRows(lookupObj);

        if (rows.length === 0) {
            throw new Error('Model instance not found when calling get method');
        } else if (rows.length > 1) {
            throw new Error('Expected to find a single row in Model.get. Found ' + rows.length + '.');
        }

        return new ModelClass(rows[0]);
    };

    /**
     * Gets the {@link Model} class or subclass constructor (the class that
     * instantiated this instance).
     *
     * @return {Model} The {@link Model} class or subclass constructor used to instantiate
     *                 this instance.
     */


    Model.prototype.getClass = function getClass() {
        return this.constructor;
    };

    /**
     * Gets the id value of the current instance by looking up the id attribute.
     * @return {*} The id value of the current instance.
     */


    Model.prototype.getId = function getId() {
        return this._fields[this.getClass().idAttribute];
    };

    /**
     * Returns a reference to the plain JS object in the store.
     * Make sure to not mutate this.
     *
     * @return {Object} a reference to the plain JS object in the store
     */


    /**
     * Returns a string representation of the {@link Model} instance.
     *
     * @return {string} A string representation of this {@link Model} instance.
     */
    Model.prototype.toString = function toString() {
        var _this4 = this;

        var ThisModel = this.getClass();
        var className = ThisModel.modelName;
        var fieldNames = (0, _keys2.default)(ThisModel.fields);
        var fields = fieldNames.map(function (fieldName) {
            var field = ThisModel.fields[fieldName];
            if (field instanceof _fields.ManyToMany) {
                var ids = _this4[fieldName].toModelArray().map(function (model) {
                    return model.getId();
                });
                return fieldName + ': [' + ids.join(', ') + ']';
            }
            var val = _this4._fields[fieldName];
            return fieldName + ': ' + val;
        }).join(', ');
        return className + ': {' + fields + '}';
    };

    /**
     * Returns a boolean indicating if `otherModel` equals this {@link Model} instance.
     * Equality is determined by shallow comparing their attributes.
     *
     * @param  {Model} otherModel - a {@link Model} instance to compare
     * @return {Boolean} a boolean indicating if the {@link Model} instance's are equal.
     */


    Model.prototype.equals = function equals(otherModel) {
        // eslint-disable-next-line no-underscore-dangle
        return (0, _utils.objectShallowEquals)(this._fields, otherModel._fields);
    };

    /**
     * Updates a property name to given value for this {@link Model} instance.
     * The values are immediately committed to the database.
     *
     * @param {string} propertyName - name of the property to set
     * @param {*} value - value assigned to the property
     * @return {undefined}
     */


    Model.prototype.set = function set(propertyName, value) {
        this.update((0, _defineProperty5.default)({}, propertyName, value));
    };

    /**
     * Assigns multiple fields and corresponding values to this {@link Model} instance.
     * The updates are immediately committed to the database.
     *
     * @param  {Object} userMergeObj - an object that will be merged with this instance.
     * @return {undefined}
     */


    Model.prototype.update = function update(userMergeObj) {
        var ThisModel = this.getClass();
        var mergeObj = (0, _assign2.default)({}, userMergeObj);

        var fields = ThisModel.fields;
        var virtualFields = ThisModel.virtualFields;
        var m2mRelations = {};

        // If an array of entities or id's is supplied for a
        // many-to-many related field, clear the old relations
        // and add the new ones.
        for (var mergeKey in mergeObj) {
            // eslint-disable-line no-restricted-syntax, guard-for-in
            var isRealField = fields.hasOwnProperty(mergeKey);

            if (isRealField) {
                var field = fields[mergeKey];

                if (field instanceof _fields.ForeignKey || field instanceof _fields.OneToOne) {
                    // update one-one/fk relations
                    mergeObj[mergeKey] = (0, _utils.normalizeEntity)(mergeObj[mergeKey]);
                } else if (field instanceof _fields.ManyToMany) {
                    // field is forward relation
                    m2mRelations[mergeKey] = mergeObj[mergeKey];
                    delete mergeObj[mergeKey];
                }
            } else if (virtualFields.hasOwnProperty(mergeKey)) {
                var _field = virtualFields[mergeKey];
                if (_field instanceof _fields.ManyToMany) {
                    // field is backward relation
                    m2mRelations[mergeKey] = mergeObj[mergeKey];
                    delete mergeObj[mergeKey];
                }
            }
        }

        this._initFields((0, _assign2.default)({}, this._fields, mergeObj));
        this._refreshMany2Many(m2mRelations); // eslint-disable-line no-underscore-dangle

        ThisModel.session.applyUpdate({
            action: _constants.UPDATE,
            query: getByIdQuery(this),
            payload: mergeObj
        });
    };

    /**
     * Updates {@link Model} instance attributes to reflect the
     * database state in the current session.
     * @return {undefined}
     */


    Model.prototype.refreshFromState = function refreshFromState() {
        this._initFields(this.ref);
    };

    /**
     * Deletes the record for this {@link Model} instance.
     * You'll still be able to access fields and values on the instance.
     *
     * @return {undefined}
     */


    Model.prototype.delete = function _delete() {
        this._onDelete();
        this.getClass().session.applyUpdate({
            action: _constants.DELETE,
            query: getByIdQuery(this)
        });
    };

    Model.prototype._onDelete = function _onDelete() {
        var virtualFields = this.getClass().virtualFields;
        for (var key in virtualFields) {
            // eslint-disable-line
            var field = virtualFields[key];
            if (field instanceof _fields.ManyToMany) {
                // Delete any many-to-many rows the entity is included in.
                this[key].clear();
            } else if (field instanceof _fields.ForeignKey) {
                var relatedQs = this[key];
                if (relatedQs.exists()) {
                    relatedQs.update((0, _defineProperty5.default)({}, field.relatedName, null));
                }
            } else if (field instanceof _fields.OneToOne) {
                // Set null to any foreign keys or one to ones pointed to
                // this instance.
                if (this[key] !== null) {
                    this[key][field.relatedName] = null;
                }
            }
        }
    };

    // DEPRECATED AND REMOVED METHODS

    Model.prototype.getNextState = function getNextState() {
        throw new Error('Model.prototype.getNextState is removed. See the 0.9 ' + 'migration guide on the GitHub repo.');
    };

    (0, _createClass3.default)(Model, [{
        key: 'ref',
        get: function get() {
            var ModelClass = this.getClass();

            // eslint-disable-next-line no-underscore-dangle
            return ModelClass._findDatabaseRows((0, _defineProperty5.default)({}, ModelClass.idAttribute, this.getId()))[0];
        }
    }], [{
        key: '_sessionData',
        get: function get() {
            if (!this.session) return {};
            return this.session.getDataForModel(this.modelName);
        }
    }, {
        key: 'idAttribute',
        get: function get() {
            return this.session.db.describe(this.modelName).idAttribute;
        }
    }, {
        key: 'session',
        get: function get() {
            return this._session;
        }
    }, {
        key: 'query',
        get: function get() {
            return this.getQuerySet();
        }
    }]);
    return Model;
}();

Model.fields = {
    id: (0, _fields.attr)()
};
Model.virtualFields = {};
Model.querySetClass = _QuerySet2.default;

exports.default = Model;