
import {stageConstants} from "../_constants/stage.constants";

export function getAllStages(filter={}) {
    return dispatch => {
        dispatch(request());

        /*
        contactService.getAll(filter + ",type:PERSON")
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error))
            );
            */
        dispatch(success());

    };

    function request() { return { type: stageConstants.GETALL_REQUEST } }
    function success(data) { return { type: stageConstants.GETALL_SUCCESS } }
    function failure(error) { return { type: stageConstants.GETALL_FAILURE, error } }

}

export function deleteStage(id) {
    return dispatch => {
        dispatch(request(id));

        dispatch(success(id));

        /*
        contactService.delete(id)
            .then(
                contact => {
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
            */
    };

    function request(id) { return { type: stageConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: stageConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: stageConstants.DELETE_FAILURE, id, error } }
}