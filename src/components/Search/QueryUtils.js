import * as _ from "lodash";

export class QueryUtils {

    static addStageFilter(query, stageId) {
        return query
            + (query ? " AND " : "")
            + "stage_id:" + stageId;
    }

    static getSort(sortStore, options) {

        let sortItems = Object.keys(sortStore)
            .filter( sortId => sortStore[sortId].group === options.group )
            .map( sortId => sortStore[sortId]);

        let sort = sortItems.filter(sort => ( sort.order !== undefined && sort.order !== ""))
            .map( sort => ( `sort=${sort.dataField},${sort.order}`)).join("&");
        return sort;
    }

    static prepareQuery(filterDefinitions, newQueryForContainer, defaultFilters) {

        let query = newQueryForContainer && Object.keys(newQueryForContainer).map(filter => {

            let filterType = filterDefinitions[filter].type;
            let filterField = filterDefinitions[filter].field;

            if( filterType === "list"
                && _.get(newQueryForContainer, [filter,"selectedOptions","length"], 0) > 0){
                return filterField + ":(" + newQueryForContainer[filter].selectedOptions.map(option => "\"" + option + "\"").join(" OR ") + ")"
            }
            else if( filterType === "term"
                && _.get(newQueryForContainer, [filter,"selectedOptions","length"], 0) > 0){
                return filterField + ":" + "\"" + newQueryForContainer[filter].selectedOptions + "\""
            }
        }).filter(item => typeof item ==='string');

        query = query || [];


        let defaultQuery = defaultFilters && defaultFilters
            .filter(filter => filter.value)
            .map(filter => {
                let filterField = filter.field;
                let filterValue = filter.value;
                let filterType = filter.type;

                if( filterType === "term"){
                    return filterField + ":" + "\"" + filterValue + "\"";
                }
                else if( filterType === "freetext"){
                    return "*" + filterValue + "*";
                }
            });
        defaultQuery = defaultQuery || [];

        query = [...query, ...defaultQuery];
        let result = query.length > 0 ? query.join(" AND ") : "";

        return result;
    }
}

