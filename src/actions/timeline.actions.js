import {timelineConstants} from "../constants/timeline.constants";
import {timelineService} from "../services/timeline.service";

export function getTimelineByFilter(query, sort, page=0, append=false) {

    return dispatch => {

        timelineService.getTimelinesByFilter(query, sort, page)
            .then(
                response => {
                    dispatch(success(response));
                },
                error => dispatch(failure(error))
            );
    };
    function success(response) {
        const type = append ? timelineConstants.APPEND_TIMELINES_SUCCESS : timelineConstants.LOAD_TIMELINES_SUCCESS;

        return { type: type, payload: {'timelines': response[0], 'maxTimelineCount': response[1]} }
    }
    function failure(error) {
        const type = append ? timelineConstants.APPEND_TIMELINES_FAILURE : timelineConstants.LOAD_TIMELINES_FAILURE;

        return { type: type, error }
    }
}


export function resetTimelines() {
    return dispatch => {
        dispatch(request());


    };

    function request() {
        return {type: timelineConstants.RESET_TIMELINES}
    }


}
