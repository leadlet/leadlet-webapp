import {sourceService} from "../services/source.service";
/*
export function getSourceById(sourceId) {
    return dispatch => {
        dispatch(request(sourceId));

        sourceService.getSourceById(sourceId)
            .then(
                source => dispatch(success(source)),
                error => dispatch(failure(error))
            );
    };

    function request() {
        return {type: sourceConstants.GET_REQUEST}
    }

    function success(source) {
        return {type: sourceConstants.GET_SUCCESS, source}
    }

    function failure(error) {
        return {type: sourceConstants.GET_FAILURE, error}
    }
}

export function getAllSources(filter, page, size) {
    return dispatch => {
        dispatch(request());

        sourceService.getAllSources(filter, page, size)
            .then(
                response => dispatch(success({items: response[0], dataTotalSize: response[1]})),
                error => dispatch(failure(error))
            );
    };

    function request() {
        return {type: sourceConstants.GETALL_REQUEST}
    }

    function success(data) {
        return {type: sourceConstants.GETALL_SUCCESS, data}
    }

    function failure(error) {
        return {type: sourceConstants.GETALL_FAILURE, error}
    }
}

export function createSource(source, successCallback) {
    return dispatch => {
        dispatch(request());

        return sourceService.createSource(source)
            .then(
                source => {
                    dispatch(successCallback);
                    dispatch(success(source));
                    dispatch(alertActions.success('SOURCE create successful'));
                },
                error => {
                    // TODO catch validation error here and throw submission error
                    // throw new SubmissionError({name: 'hedeler' , title: 'hedeler2', _error: 'olmadi'});
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() {
        return {type: sourceConstants.CREATE_REQUEST}
    }

    function success(source) {
        return {type: sourceConstants.CREATE_SUCCESS, source}
    }

    function failure(error) {
        return {type: sourceConstants.CREATE_FAILURE, error}
    }
}

export function updateSource(source, successCallback) {
    return dispatch => {
        dispatch(request());

        return sourceService.updateSource(source)
            .then(
                source => {
                    dispatch(success(source));
                    dispatch(alertActions.success('Source update successful'));
                },
                error => {
                    // TODO catch validation error here and throw submission error
                    // throw new SubmissionError({name: 'hedeler' , title: 'hedeler2', _error: 'olmadi'});
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() {
        return {type: sourceConstants.UPDATE_REQUEST}
    }

    function success(source) {
        return {type: sourceConstants.UPDATE_SUCCESS, source}
    }

    function failure(error) {
        return {type: sourceConstants.UPDATE_FAILURE, error}
    }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _deleteSource(id) {
    return dispatch => {
        dispatch(request(id));

        sourceService._deleteSource(id)
            .then(
                source => {
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) {
        return {type: sourceConstants.DELETE_REQUEST, id}
    }

    function success(id) {
        return {type: sourceConstants.DELETE_SUCCESS, id}
    }

    function failure(id, error) {
        return {type: sourceConstants.DELETE_FAILURE, id, error}
    }
}
*/
export function getAllSourceByFilterAndReturn(filter, successCallback, failCallback) {
    sourceService.getAllSources(filter, 0, 20)
        .then(
            response => successCallback(response),
            error => failCallback(error)
        );
}