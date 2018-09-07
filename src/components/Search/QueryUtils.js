export class QueryUtils {

    static addStageFilter( searchQuery, stageId ) {
        let newQuery = searchQuery.query
            + (searchQuery.query ? " AND " : "")
            + "stage_id:" +stageId;

        return { ...searchQuery, newQuery};
    }


}

