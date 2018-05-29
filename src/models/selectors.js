// selectors.js
import { createSelector } from 'redux-orm';
import orm from './orm';

const dbStateSelector = state => state.db;

// ???
export const pipelinesSelector = createSelector(
    orm,
    dbStateSelector,
    session => {
        return session.Pipeline.all().toRefArray();
    }
);

export const stagesSelector = createSelector(
    orm,
    dbStateSelector,
    session => {
        return session.Stage.all().toRefArray();
    }
);
