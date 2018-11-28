'use strict';

var _deepFreeze = require('deep-freeze');

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

var _Table = require('../db/Table');

var _Table2 = _interopRequireDefault(_Table);

var _utils = require('../utils');

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Table', function () {
    describe('prototype methods', function () {
        var state = void 0;
        var batchToken = void 0;
        var txInfo = void 0;
        var table = void 0;

        beforeEach(function () {
            state = (0, _deepFreeze2.default)({
                items: [0, 1, 2],
                itemsById: {
                    0: {
                        id: 0,
                        data: 'cooldata'
                    },
                    1: {
                        id: 1,
                        data: 'verycooldata!'
                    },
                    2: {
                        id: 2,
                        data: 'awesomedata'
                    }
                },
                meta: {}
            });
            batchToken = (0, _utils.getBatchToken)();
            txInfo = { batchToken: batchToken, withMutations: false };
            table = new _Table2.default();
        });

        it('correctly accesses an id', function () {
            expect(table.accessId(state, 1)).toBe(state.itemsById[1]);
        });

        it('correctly accesses id\'s', function () {
            expect(table.accessIdList(state)).toBe(state.items);
        });

        it('correctly returns a default state', function () {
            expect(table.getEmptyState()).toEqual({
                items: [],
                itemsById: {},
                meta: {}
            });
        });

        it('correctly inserts an entry', function () {
            var entry = { id: 3, data: 'newdata!' };

            var _table$insert = table.insert(txInfo, state, entry),
                newState = _table$insert.state,
                created = _table$insert.created;

            expect(created).toBe(entry);

            expect(newState).not.toBe(state);
            expect(newState.items).toEqual([0, 1, 2, 3]);
            expect(newState.itemsById).toEqual({
                0: {
                    id: 0,
                    data: 'cooldata'
                },
                1: {
                    id: 1,
                    data: 'verycooldata!'
                },
                2: {
                    id: 2,
                    data: 'awesomedata'
                },
                3: {
                    id: 3,
                    data: 'newdata!'
                }
            });
        });

        it('correctly updates entries with a merging object', function () {
            var toMergeObj = { data: 'modifiedData' };
            var rowsToUpdate = [state.itemsById[1], state.itemsById[2]];
            var newState = table.update(txInfo, state, rowsToUpdate, toMergeObj);

            expect(newState).not.toBe(state);
            expect(newState.items).toBe(state.items);
            expect(newState.itemsById).toEqual({
                0: {
                    id: 0,
                    data: 'cooldata'
                },
                1: {
                    id: 1,
                    data: 'modifiedData'
                },
                2: {
                    id: 2,
                    data: 'modifiedData'
                }
            });
        });

        it('correctly deletes entries', function () {
            var rowsToDelete = [state.itemsById[1], state.itemsById[2]];
            var newState = table.delete(txInfo, state, rowsToDelete);

            expect(newState).not.toBe(state);
            expect(newState.items).toEqual([0]);
            expect(newState.itemsById).toEqual({
                0: {
                    id: 0,
                    data: 'cooldata'
                }
            });
        });

        it('filter works correctly with object argument', function () {
            var clauses = [{ type: _constants.FILTER, payload: { data: 'verycooldata!' } }];
            var result = table.query(state, clauses);
            expect(result.length).toBe(1);
            expect(result[0]).toBe(state.itemsById[1]);
        });

        it('orderBy works correctly with prop argument', function () {
            var clauses = [{ type: _constants.ORDER_BY, payload: [['data'], ['inc']] }];
            var result = table.query(state, clauses);
            expect(result.map(function (row) {
                return row.data;
            })).toEqual(['awesomedata', 'cooldata', 'verycooldata!']);
        });

        it('orderBy works correctly with function argument', function () {
            var clauses = [{ type: _constants.ORDER_BY, payload: [function (row) {
                    return row.data;
                }, undefined] }];
            var result = table.query(state, clauses);
            expect(result.map(function (row) {
                return row.data;
            })).toEqual(['awesomedata', 'cooldata', 'verycooldata!']);
        });

        it('exclude works correctly with object argument', function () {
            var clauses = [{ type: _constants.EXCLUDE, payload: { data: 'verycooldata!' } }];
            var result = table.query(state, clauses);
            expect(result.length).toBe(2);
            expect(result.map(function (row) {
                return row.id;
            })).toEqual([0, 2]);
        });

        it('query works with multiple clauses', function () {
            var clauses = [{ type: _constants.FILTER, payload: function payload(row) {
                    return row.id > 0;
                } }, { type: _constants.ORDER_BY, payload: [['data'], ['inc']] }];
            var result = table.query(state, clauses);
            expect(result.map(function (row) {
                return row.data;
            })).toEqual(['awesomedata', 'verycooldata!']);
        });

        it('query works with an id filter for a row which is not in the current result set', function () {
            var clauses = [{ type: _constants.FILTER, payload: function payload(row) {
                    return row.id !== 1;
                } }, { type: _constants.FILTER, payload: { id: 1 } }];
            var result = table.query(state, clauses);
            expect(result).toHaveLength(0);
        });
    });
});