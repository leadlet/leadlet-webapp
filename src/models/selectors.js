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

export const personDealsSelector = createSelector(
    orm,
    [
        dbStateSelector,
        (state, personId) => personId
    ],
    (session, personId) => {
        return session.Deal.all().filter(deal => {
            // personId is string in arguments
            return deal.personId == personId
        }).toRefArray();
    }
);

export const organizationDealsSelector = createSelector(
    orm,
    [
        dbStateSelector,
        (state, organizationId) => organizationId
    ],
    (session, organizationId) => {
        return session.Deal.all().filter(deal => {
            // personId is string in arguments
            return deal.organization.id == organizationId
        }).toRefArray();
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

export const filterByIdSelector = createSelector(
    orm,
    [
        dbStateSelector,
        (state, filterId) => filterId
    ],
    (session, filterId) => {
        if( session.SearchFilter.hasId(filterId) ){
            return session.SearchFilter.withId(filterId).ref;
        }
    }
);

export const filtersSelector = createSelector(
    orm,
    dbStateSelector,
    session => {
        return session.SearchFilter.all().toRefArray();
    }
);