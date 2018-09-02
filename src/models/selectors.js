// selectors.js
import { createSelector } from 'redux-orm';
import orm from './orm';
import * as _ from "lodash";

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
            return deal.personId === personId
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
            return _.get(deal, ["organization", "id"]) === organizationId
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
        (state, props) => props.stage.id
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

export const searchQuerySelector = createSelector(
    orm,
    [
        dbStateSelector,
        (state, excludeId) => excludeId
    ],
    (session, excludeId) => {
        let filters = session.SearchFilter.all().toRefArray();
        let termFilters = [];
        let rangeFilters = [];
        let dateRangeFilters = [];
        let pipelineFilterText ="";

        if( filters ){
            if( excludeId ){
                filters = filters.filter(filter => filter.id !== excludeId);
            }

            termFilters = filters
                .filter(filter => filter.type === "TERMS" && filter.selected && filter.selected.options && filter.selected.options.length > 0)
                .map( filter => filter.dataField + ":(" + filter.selected.options.map(option => "\""+option+"\"").join(" OR ")+ ")");

            rangeFilters = filters
                .filter(filter => filter.type === "RANGE" && filter.selected)
                .map( filter => filter.dataField + ":[" + filter.selected.min + " TO " + filter.selected.max +"]");

            dateRangeFilters = filters
                .filter(filter => filter.type === "DATERANGE" && filter.selected)
                .map( filter => filter.dataField + ":[" + filter.selected.min + " TO " + filter.selected.max +"]");

            let pipelineFilter = filters.find(filter => filter.id === "pipeline" && filter.selected);

            if( pipelineFilter ){
                pipelineFilterText = `pipeline_id:${pipelineFilter.selected.pipeline.id}`;
            }

        }

        let searchFilters = [ ...termFilters, ...rangeFilters, ...dateRangeFilters, pipelineFilterText];

        return searchFilters.length > 0 ? searchFilters.join(" AND "): "";

    }
);