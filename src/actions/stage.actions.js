
import {stageConstants} from "../constants/stage.constants";
import {stageService} from "../services/stage.service"
import {alertActions} from "./alert.actions";

export function getAllStages() {
    return dispatch => {
        dispatch(request());

        stageService.getAll()
            .then(
                items => dispatch(success(items)),
                error => dispatch(failure(error))
            );

    };

    function request() { return { type: stageConstants.GETALL_REQUEST } }
    function success(items) { return { type: stageConstants.GETALL_SUCCESS, items } }
    function failure(error) { return { type: stageConstants.GETALL_FAILURE, error } }

}

export function updateStage(stage, successCallback) {
    return dispatch => {
        dispatch(request());

        return stageService.updateStage(stage)
            .then(
                stage => {
                    dispatch(successCallback);
                    dispatch(success(stage));
                    dispatch(alertActions.success('Contact create successful'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: stageConstants.UPDATE_REQUEST } }
    function success(stage) { return { type: stageConstants.UPDATE_SUCCESS, stage } }
    function failure(error) { return { type: stageConstants.UPDATE_FAILURE, error } }
}


export function createStage(stage, successCallback) {
    return dispatch => {
        dispatch(request());

        return stageService.createStage(stage)
            .then(
                stage => {
                    dispatch(successCallback);
                    dispatch(success(stage));
                    dispatch(alertActions.success('Stage Created'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: stageConstants.CREATE_REQUEST } }
    function success(stage) { return { type: stageConstants.CREATE_SUCCESS, stage } }
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
    function success(id) { return { type: stageConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: stageConstants.DELETE_FAILURE, id, error } }
}