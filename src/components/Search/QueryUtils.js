export class QueryUtils {

    static addStageFilter( searchQuery, stageId ) {
        searchQuery.query = searchQuery.query
            + (searchQuery.query ? " AND " : "")
            + "stage_id:" +stageId;

        return searchQuery;
    }


}

