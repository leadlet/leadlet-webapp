'use strict';

var _utils = require('../utils');

describe('Utils', function () {
    describe('arrayDiffActions', function () {
        it('normal case', function () {
            var target = [2, 3];
            var source = [1, 2, 4];

            var actions = (0, _utils.arrayDiffActions)(source, target);
            expect(actions.add).toEqual([3]);
            expect(actions.delete).toEqual([1, 4]);
        });

        it('only add', function () {
            var target = [2, 3];
            var source = [2];

            var actions = (0, _utils.arrayDiffActions)(source, target);
            expect(actions.add).toEqual([3]);
            expect(actions.delete).toEqual([]);
        });

        it('only remove', function () {
            var target = [2, 3];
            var source = [2, 3, 4];

            var actions = (0, _utils.arrayDiffActions)(source, target);
            expect(actions.add).toEqual([]);
            expect(actions.delete).toEqual([4]);
        });

        it('identical', function () {
            var target = [2, 3];
            var source = [2, 3];

            var actions = (0, _utils.arrayDiffActions)(source, target);
            expect(actions).toBe(null);
        });
    });
});