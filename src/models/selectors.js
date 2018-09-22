// selectors.js
import { createSelector } from 'redux-orm';
import orm from './orm';
import * as _ from "lodash";

const dbStateSelector = state => state.db;


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
    [
        dbStateSelector,
        (state, props) => props.group
    ],
    (session, group) => {
        return session.SearchFilter.all().filter( eachFilter => eachFilter.group === group).toRefArray();
    }
);

export const searchQuerySelector = createSelector(
    orm,
    [
        dbStateSelector,
        (state, args) => args.excludeMe,
        (state, args) => args.group,
    ],
    (session, excludeMe, group) => {
        let termFilters = [];
        let rangeFilters = [];
        let dateRangeFilters = [];
        let pipelineFilterText ="";

        let filters = session.SearchFilter.all().toRefArray();
        filters = filters.filter(filter => filter.group === group);

        let query = "";

        if( filters ){

            if( excludeMe ){
                filters = filters.filter(filter => filter.id !== excludeMe);
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

            let searchFilters = [ ...termFilters, ...rangeFilters, ...dateRangeFilters ];

            let pipelineFilter = filters.find(filter => filter.id === "pipeline-selector" && filter.selected);

            if( pipelineFilter ){
                pipelineFilterText = `pipeline_id:${pipelineFilter.selected.pipeline.id}`;
                searchFilters.push(pipelineFilterText);
            }

            query = searchFilters.length > 0 ? searchFilters.join(" AND "): "";

        }

        return query;
    }
);


export const sortSelector = createSelector(
    orm,
    [
        dbStateSelector,
        (state, args) => args.excludeMe,
        (state, args) => args.group,
    ],
    (session, excludeMe, group) => {

        // build sort string as explained https://stackoverflow.com/a/33034533
        // your/uri?sort=name,asc&sort=numberOfHands,desc
        let sortItems = session.Sort.all().toRefArray().filter(sort => sort.group === group);

        let sort = sortItems.filter(sort => ( sort.order !== undefined && sort.order !== ""))
            .map( sort => ( `sort=${sort.dataField},${sort.order}`)).join("&");
        return sort;
    }
);

export const sortByGroupAndId = createSelector(
    orm,
    [
        dbStateSelector,
        (state, args) => args.group,
        (state, args) => args.id,
    ],
    (session, group, id) => {
        return session.Sort.all().toRefArray().find(sort => ( sort.group=== group && sort.id === id));
    }
);


export const activitiesSelector = createSelector(
    orm,
    dbStateSelector,
    session => {
        return session.Activity.all().toRefArray();
    }
);

export const timelinesSelector = createSelector(
    orm,
    dbStateSelector,
    session => {
        return session.Timeline.all().toRefArray();
    }
);