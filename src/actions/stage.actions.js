
import {stageConstants} from "../constants/stage.constants";
import {stageService} from "../services/stage.service"
import {alertActions} from "./alert.actions";

/*
export function getAllStagesByPipelineId(id) {

    return dispatch => {
        dispatch(request());

        stageService.getByPipelineId(id)
            .then(
                payload => dispatch(success(payload)),
                error => dispatch(failure(error))
            );

    };

    function request() { return { type: stageConstants.GETALL_REQUEST } }
    function success(payload) { return { type: stageConstants.GETALL_SUCCESS, payload } }
    function failure(error) { return { type: stageConstants.GETALL_FAILURE, error } }

}
*/

export function getAllStages() {

    return dispatch => {
        // TODO ygokirmak detay ver
        dispatch(request());

        stageService.getAll()
            .then(
                payload => dispatch(success(payload)),
                error => dispatch(failure(error))
            );

    };

    function request() { return { type: stageConstants.GETALL_REQUEST } }
    function success(payload) { return { type: stageConstants.GETALL_SUCCESS, payload } }
    function failure(error) { return { type: stageConstants.GETALL_FAILURE, error } }

}

export function updateStage(stage, successCallback) {
    return dispatch => {
        dispatch(request());

        return stageService.updateStage(stage)
            .then(
                payload => {
                    dispatch(successCallback);
                    dispatch(success(payload));
                    dispatch(alertActions.success('Stage successfully updated'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: stageConstants.UPDATE_REQUEST } }
    function success(payload) { return { type: stageConstants.UPDATE_SUCCESS, payload } }
    function failure(error) { return { type: stageConstants.UPDATE_FAILURE, error } }
}


export function createStage(stage, successCallback) {
    return dispatch => {
        dispatch(request());

        stageService.createStage(stage)
            .then(
                payload => {
                    dispatch(successCallback);
                    dispatch(success(payload));
                    dispatch(alertActions.success('Stage successfully updated'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: stageConstants.CREATE_REQUEST } }
    function success(payload) { return { type: stageConstants.CREATE_SUCCESS, payload } }
    function failure(error) { return { type: stageConstants.CREATE_FAILURE, error } }
}

export function deleteStage(id) {
    return dispatch => {
        dispatch(request(id));

        stageService._delete(id)
            .then(
                stage => {
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) { return { type: stageConstants.DELETE_REQUEST, id } }
    function success(payload) { return { type: stageConstants.DELETE_SUCCESS, payload }}
    function failure(id, error) { return { type: stageConstants.DELETE_FAILURE, id, error } }
}

export function getAllStageReturn(pipelineId, successCallback, failCallback) {
    stageService.getByPipelineId(pipelineId)
        .then(
            response => successCallback(response),
            error => failCallback(error)
        );
}