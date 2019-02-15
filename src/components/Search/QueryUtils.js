
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


    static getQuery(filterStore, options) {
        let termFilters = [];
        let rangeFilters = [];
        let dateRangeFilters = [];
        let pipelineFilterText = "";
        let freeTextFilter = "";
        let filters;
        let query = "";

        if (filterStore) {
            filters = Object.keys(filterStore)
                .filter(filterId => filterStore[filterId].group === options.group)
                .map(filterId => filterStore[filterId]);
        }

        if (filters) {

            if (options.excludeMe) {
                filters = filters.filter(filter => filter.id !== options.excludeMe);
            }

            termFilters = filters
                .filter(filter => filter.type === "TERMS" && filter.selected && filter.selected.options && filter.selected.options.length > 0)
                .map(filter => filter.dataField + ":(" + filter.selected.options.map(option => "\"" + option + "\"").join(" OR ") + ")");

            rangeFilters = filters
                .filter(filter => filter.type === "RANGE" && filter.selected)
                .map(filter => filter.dataField + ":[" + filter.selected.min + " TO " + filter.selected.max + "]");

            dateRangeFilters = filters
                .filter(filter => filter.type === "DATERANGE" && filter.selected)
                .map(filter => filter.dataField + ":[" + filter.selected.min + " TO " + filter.selected.max + "]");

            freeTextFilter = filters
                .filter(filter => filter.type === "FREE_TEXT" && filter.selected)
                .map(filter => "*"+filter.selected+"*");


            let searchFilters = [...termFilters, ...rangeFilters, ...dateRangeFilters, ...freeTextFilter];

            let pipelineFilter = filters.find(filter => filter.id === "pipeline-selector" && filter.selected);

            if (pipelineFilter) {
                pipelineFilterText = `pipeline_id:${pipelineFilter.selected.pipeline.id}`;
                searchFilters.push(pipelineFilterText);
            }

            query = searchFilters.length > 0 ? searchFilters.join(" AND ") : "";

        }

        console.log(query);
        return query;
    }

}

