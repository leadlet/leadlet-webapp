import {pipelineConstants} from "../constants/pipeline.constants";
import {pipelineService} from "../services/pipeline.service";
import {alertActions} from "./alert.actions";

export function selectPipeline(id) {
    return dispatch => {
        dispatch({ type: pipelineConstants.SELECT_PIPELINE, id });
    };
}

export function getAllPipelines() {
    return dispatch => {
        dispatch(request());


        pipelineService.getAll()
            .then(
                items => dispatch(success(items)),
                error => dispatch(failure(error))
            );

    };

    function request() { return { type: pipelineConstants.GETALL_REQUEST } }
    function success(payload) { return { type: pipelineConstants.GETALL_SUCCESS, payload } }
    function failure(error) { return { type: pipelineConstants.GETALL_FAILURE, error } }

}

export function updatePipeline(pipeline, successCallback) {
    return dispatch => {
        dispatch(request());

        return pipelineService.update(pipeline)
            .then(
                pipeline => {
                    dispatch(successCallback);
                    dispatch(success(pipeline));
                    dispatch(alertActions.success('Pipeline successfully updated'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: pipelineConstants.UPDATE_REQUEST } }
    function success(payload) { return { type: pipelineConstants.UPDATE_SUCCESS, payload } }
    function failure(error) { return { type: pipelineConstants.UPDATE_FAILURE, error } }
}


export function createPipeline(pipeline, successCallback) {
    return dispatch => {
        dispatch(request());

        return pipelineService.create(pipeline)
            .then(
                pipeline => {
                    dispatch(successCallback);
                    dispatch(success(pipeline));
                    dispatch(alertActions.success('Pipeline successfully created'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: pipelineConstants.CREATE_REQUEST } }
    function success(payload) { return { type: pipelineConstants.CREATE_SUCCESS, payload } }
    function failure(error) { return { type: pipelineConstants.CREATE_FAILURE, error } }
}

export function deletePipeline(id) {
    return dispatch => {
        dispatch(request(id));

        pipelineService._delete(id)
            .then(
                pipeline => {
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(payload) { return { type: pipelineConstants.DELETE_REQUEST, payload } }
    function success(payload) { return { type: pipelineConstants.DELETE_SUCCESS, payload } }
    function failure(payload, error) { return { type: pipelineConstants.DELETE_FAILURE, payload, error } }
}

export function getAllPipelineAndReturn(successCallback, failCallback) {
    pipelineService.getAll()
        .then(
            response => successCallback(response),
            error => failCallback(error)
        );
}