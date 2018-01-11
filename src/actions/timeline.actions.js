import {timelineConstants} from "../constants/timeline.constants";
import {timelineService} from "../services/timeline.service";

export function getAll(filter, page, size) {
    return dispatch => {
        dispatch(request());

        timelineService.getAll(filter, page, size)
            .then(
                response => dispatch(success({items: response[0], dataTotalSize: response[1]})),
                error => dispatch(failure(error))
            );
    };

    function request() {
        return {type: timelineConstants.GETALL_REQUEST}
    }

    function success(data) {
        return {type: timelineConstants.GETALL_SUCCESS, data}
    }

    function failure(error) {
        return {type: timelineConstants.GETALL_FAILURE, error}
    }
}