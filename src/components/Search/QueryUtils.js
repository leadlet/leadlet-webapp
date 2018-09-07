export class QueryUtils {

    static addStageFilter( query, stageId ) {
        return query
            + (query ? " AND " : "")
            + "stage_id:" +stageId;
    }


}

