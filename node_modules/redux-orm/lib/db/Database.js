'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createDatabase = createDatabase;

var _mapValues = require('lodash/mapValues');

var _mapValues2 = _interopRequireDefault(_mapValues);

var _immutableOps = require('immutable-ops');

var _immutableOps2 = _interopRequireDefault(_immutableOps);

var _constants = require('../constants');

var _Table = require('./Table');

var _Table2 = _interopRequireDefault(_Table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function replaceTableState(tableName, newTableState, tx, state) {
    var batchToken = tx.batchToken,
        withMutations = tx.withMutations;


    if (withMutations) {
        state[tableName] = newTableState;
        return state;
    }

    return _immutableOps2.default.batch.set(batchToken, tableName, newTableState, state);
}

function query(tables, querySpec, state) {
    var tableName = querySpec.table,
        clauses = querySpec.clauses;

    var table = tables[tableName];
    var rows = table.query(state[tableName], clauses);
    return {
        rows: rows
    };
}

function update(tables, updateSpec, tx, state) {
    var action = updateSpec.action,
        payload = updateSpec.payload;


    var tableName = void 0;
    var nextTableState = void 0;
    var resultPayload = void 0;

    if (action === _constants.CREATE) {
        tableName = updateSpec.table;

        var table = tables[tableName];
        var currTableState = state[tableName];
        var result = table.insert(tx, currTableState, payload);
        nextTableState = result.state;
        resultPayload = result.created;
    } else {
        var querySpec = updateSpec.query;
        tableName = querySpec.table;

        var _query = query(tables, querySpec, state),
            rows = _query.rows;

        var _table = tables[tableName];
        var _currTableState = state[tableName];

        if (action === _constants.UPDATE) {
            nextTableState = _table.update(tx, _currTableState, rows, payload);
        } else if (action === _constants.DELETE) {
            nextTableState = _table.delete(tx, _currTableState, rows);
        } else {
            throw new Error('Database received unknown update type: ' + action);
        }
    }

    var nextDBState = replaceTableState(tableName, nextTableState, tx, state);
    return {
        status: _constants.SUCCESS,
        state: nextDBState,
        payload: resultPayload
    };
}

function createDatabase(schemaSpec) {
    var tablesSpec = schemaSpec.tables;

    var tables = (0, _mapValues2.default)(tablesSpec, function (tableSpec) {
        return new _Table2.default(tableSpec);
    });

    var getEmptyState = function getEmptyState() {
        return (0, _mapValues2.default)(tables, function (table) {
            return table.getEmptyState();
        });
    };
    return {
        getEmptyState: getEmptyState,
        query: query.bind(null, tables),
        update: update.bind(null, tables),
        // Used to inspect the schema.
        describe: function describe(tableName) {
            return tables[tableName];
        }
    };
}

exports.default = createDatabase;