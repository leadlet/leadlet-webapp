'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _immutableOps = require('immutable-ops');

var _constants = require('./constants');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Session = function () {
    /**
     * Creates a new Session.
     *
     * @param  {Database} db - a {@link Database} instance
     * @param  {Object} state - the database state
     * @param  {Boolean} [withMutations] - whether the session should mutate data
     * @param  {Object} [batchToken] - used by the backend to identify objects that can be
     *                                 mutated.
     */
    function Session(schema, db, state, withMutations, batchToken) {
        var _this2 = this;

        (0, _classCallCheck3.default)(this, Session);

        this.schema = schema;
        this.db = db;
        this.state = state || db.getEmptyState();
        this.initialState = this.state;

        this.withMutations = !!withMutations;
        this.batchToken = batchToken || (0, _immutableOps.getBatchToken)();

        this._accessedModels = {};
        this.modelData = {};

        this.models = schema.getModelClasses();

        this.sessionBoundModels = this.models.map(function (modelClass) {
            var sessionBoundModel = function (_modelClass) {
                (0, _inherits3.default)(SessionBoundModel, _modelClass);

                function SessionBoundModel() {
                    (0, _classCallCheck3.default)(this, SessionBoundModel);
                    return (0, _possibleConstructorReturn3.default)(this, _modelClass.apply(this, arguments));
                }

                return SessionBoundModel;
            }(modelClass);
            (0, _defineProperty2.default)(_this2, modelClass.modelName, {
                get: function get() {
                    return sessionBoundModel;
                }
            });

            sessionBoundModel.connect(_this2);
            return sessionBoundModel;
        });
    }

    Session.prototype.markAccessed = function markAccessed(modelName) {
        this.getDataForModel(modelName).accessed = true;
    };

    Session.prototype.getDataForModel = function getDataForModel(modelName) {
        if (!this.modelData[modelName]) {
            this.modelData[modelName] = {};
        }
        return this.modelData[modelName];
    };

    /**
     * Applies update to a model state.
     *
     * @private
     * @param {Object} update - the update object. Must have keys
     *                          `type`, `payload`.
     */


    Session.prototype.applyUpdate = function applyUpdate(updateSpec) {
        var batchToken = this.batchToken,
            withMutations = this.withMutations;

        var tx = { batchToken: batchToken, withMutations: withMutations };
        var result = this.db.update(updateSpec, tx, this.state);
        var status = result.status,
            state = result.state;


        if (status === _constants.SUCCESS) {
            this.state = state;
        } else {
            throw new Error('Applying update failed: ' + result.toString());
        }

        return result.payload;
    };

    Session.prototype.query = function query(querySpec) {
        var table = querySpec.table;

        this.markAccessed(table);
        return this.db.query(querySpec, this.state);
    };

    // DEPRECATED AND REMOVED METHODS

    Session.prototype.getNextState = function getNextState() {
        (0, _utils.warnDeprecated)('Session.prototype.getNextState function is deprecated. Access ' + 'the Session.prototype.state property instead.');
        return this.state;
    };

    Session.prototype.reduce = function reduce() {
        throw new Error('Session.prototype.reduce is removed. The Redux integration API ' + 'is now decoupled from ORM and Session - see the 0.9 migration guide ' + 'in the GitHub repo.');
    };

    (0, _createClass3.default)(Session, [{
        key: 'accessedModels',
        get: function get() {
            var _this3 = this;

            return this.sessionBoundModels.filter(function (model) {
                return !!_this3.getDataForModel(model.modelName).accessed;
            }).map(function (model) {
                return model.modelName;
            });
        }
    }]);
    return Session;
}();

exports.default = Session;