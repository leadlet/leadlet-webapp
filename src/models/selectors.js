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

export const dealsSelector = createSelector(
    orm,
    dbStateSelector,
    session => {
        return session.Deal.all().toRefArray();
    }
);

export const stageDealsSelector = createSelector(
    orm,
    [
        dbStateSelector,
        (state, props) => props.stageId
    ],
    (session, stageId) => {
        return session.Stage.withId(stageId).dealSet.all().toRefArray();
    }
);


export const detailedDealSelector = createSelector(
    orm,
    [
        dbStateSelector,
        (state, dealId) => dealId
    ],
    (session, dealId) => {
        if( session.Deal.hasId(dealId) ){
            return session.Deal.withId(dealId).ref;
        }
    }
);