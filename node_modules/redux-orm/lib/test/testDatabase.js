'use strict';

var _deepFreeze = require('deep-freeze');

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _Table = require('../db/Table');

var _Table2 = _interopRequireDefault(_Table);

var _utils = require('../utils');

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('createDatabase', function () {
    var schema = {
        tables: {
            Book: {
                idAttribute: 'id'
            },
            Author: {
                idAttribute: 'id'
            }
        }
    };

    var db = (0, _db2.default)(schema);
    var emptyState = (0, _deepFreeze2.default)(db.getEmptyState());

    it('getEmptyState', function () {
        expect(emptyState).toEqual({
            Book: {
                items: [],
                itemsById: {},
                meta: {}
            },
            Author: {
                items: [],
                itemsById: {},
                meta: {}
            }
        });
    });

    it('describe', function () {
        var table = db.describe('Book');
        expect(table).toBeInstanceOf(_Table2.default);
    });

    it('query on empty database', function () {
        var querySpec = {
            table: 'Book',
            clauses: []
        };
        var result = db.query(querySpec, emptyState);
        expect(result.rows).toEqual([]);
    });

    it('insert row with id specified', function () {
        var props = { id: 0, name: 'Example Book' };
        var updateSpec = {
            action: _constants.CREATE,
            payload: props,
            table: 'Book'
        };
        var tx = { batchToken: (0, _utils.getBatchToken)(), withMutations: false };

        var _db$update = db.update(updateSpec, tx, emptyState),
            status = _db$update.status,
            state = _db$update.state,
            payload = _db$update.payload;

        expect(status).toBe(_constants.SUCCESS);
        expect(payload).toBe(props);
        expect(state).not.toBe(emptyState);
        expect(state).toEqual({
            Book: {
                items: [0],
                itemsById: {
                    0: props
                },
                meta: {
                    maxId: 0
                }
            },
            Author: {
                items: [],
                itemsById: {},
                meta: {}
            }
        });
    });

    it('insert row to empty database without id (autosequence)', function () {
        var props = { name: 'Example Book' };
        var updateSpec = {
            action: _constants.CREATE,
            payload: props,
            table: 'Book'
        };
        var tx = { batchToken: (0, _utils.getBatchToken)(), withMutations: false };

        var _db$update2 = db.update(updateSpec, tx, emptyState),
            status = _db$update2.status,
            state = _db$update2.state,
            payload = _db$update2.payload;

        expect(status).toBe(_constants.SUCCESS);
        expect(payload).toEqual({ id: 0, name: 'Example Book' });
        expect(state).not.toBe(emptyState);
        expect(state).toEqual({
            Book: {
                items: [0],
                itemsById: {
                    0: {
                        id: 0,
                        name: 'Example Book'
                    }
                },
                meta: {
                    maxId: 0
                }
            },
            Author: {
                items: [],
                itemsById: {},
                meta: {}
            }
        });

        // Second insert.

        var props2 = { name: 'Example Book Two' };
        var updateSpec2 = {
            action: _constants.CREATE,
            payload: props2,
            table: 'Book'
        };

        var _db$update3 = db.update(updateSpec2, tx, state),
            status2 = _db$update3.status,
            state2 = _db$update3.state,
            payload2 = _db$update3.payload;

        expect(status2).toBe(_constants.SUCCESS);
        expect(payload2).toEqual({ id: 1, name: 'Example Book Two' });
        expect(state2).toBe(state);
        expect(state2).toEqual({
            Book: {
                items: [0, 1],
                itemsById: {
                    0: {
                        id: 0,
                        name: 'Example Book'
                    },
                    1: {
                        id: 1,
                        name: 'Example Book Two'
                    }
                },
                meta: {
                    maxId: 1
                }
            },
            Author: {
                items: [],
                itemsById: {},
                meta: {}
            }
        });
    });

    it('update row', function () {
        var startState = {
            Book: {
                items: [0],
                itemsById: {
                    0: {
                        id: 0,
                        name: 'Example Book'
                    }
                },
                meta: {
                    maxId: 0
                }
            },
            Author: {
                items: [],
                itemsById: {},
                meta: {}
            }
        };

        var updateSpec = {
            action: _constants.UPDATE,
            payload: {
                name: 'Modified Example Book'
            },
            table: 'Book',
            query: {
                table: 'Book',
                clauses: [{ type: _constants.FILTER, payload: { id: 0 } }]
            }
        };
        var tx = { batchToken: (0, _utils.getBatchToken)(), withMutations: false };

        var _db$update4 = db.update(updateSpec, tx, startState),
            status = _db$update4.status,
            state = _db$update4.state;

        expect(status).toBe(_constants.SUCCESS);
        expect(state).not.toBe(startState);
        expect(state.Book.itemsById[0].name).toBe('Modified Example Book');
    });

    it('delete row', function () {
        var startState = {
            Book: {
                items: [0],
                itemsById: {
                    0: {
                        id: 0,
                        name: 'Example Book'
                    }
                },
                meta: {
                    maxId: 0
                }
            },
            Author: {
                items: [],
                itemsById: {},
                meta: {}
            }
        };

        var updateSpec = {
            action: _constants.DELETE,
            table: 'Book',
            query: {
                table: 'Book',
                clauses: [{ type: _constants.FILTER, payload: { id: 0 } }]
            }
        };
        var tx = { batchToken: (0, _utils.getBatchToken)(), withMutations: false };

        var _db$update5 = db.update(updateSpec, tx, startState),
            status = _db$update5.status,
            state = _db$update5.state;

        expect(status).toBe(_constants.SUCCESS);
        expect(state).not.toBe(startState);
        expect(state.Book.items).toEqual([]);
        expect(state.Book.itemsById).toEqual({});
    });
});