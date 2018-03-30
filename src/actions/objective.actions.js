import {alertActions} from "./alert.actions";
import {objectiveService} from "../services/objective.service";
import {objectiveConstants} from "../constants/objective.constants";

export function getObjectivesByTeamId(teamId) {
    return dispatch => {
        dispatch(request(teamId));

        objectiveService.getObjectivesByTeamId(teamId)
            .then(
                objectives => dispatch(success({objectives, teamId})),
                error => dispatch(failure(error))
            );
    };

    function request() {
        return {type: objectiveConstants.GET_OBJ_REQUEST}
    }

    function success(data) {
        return {type: objectiveConstants.GET_OBJ_SUCCESS, data}
    }

    function failure(error) {
        return {type: objectiveConstants.GET_OBJ_FAILURE, error}
    }
}

export function getObjectivesByUserId(userId) {
    return dispatch => {
        dispatch(request(userId));

        objectiveService.getObjectivesByUserId(userId)
            .then(
                objectives => dispatch(success({objectives, userId})),
                error => dispatch(failure(error))
            );
    };

    function request() {
        return {type: objectiveConstants.GET_OBJ_USER_REQUEST}
    }

    function success(data) {
        return {type: objectiveConstants.GET_OBJ_USER_SUCCESS, data}
    }

    function failure(error) {
        return {type: objectiveConstants.GET_OBJ_USER_FAILURE, error}
    }
}

export function getByObjectiveId(objectiveId) {
    return dispatch => {
        dispatch(request(objectiveId));

        objectiveService.getByObjectiveId(objectiveId)
            .then(
                objective => dispatch(success(objective)),
                error => dispatch(failure(error))
            );
    };

    function request() {
        return {type: objectiveConstants.GET_REQUEST}
    }

    function success(objective) {
        return {type: objectiveConstants.GET_SUCCESS, objective}
    }

    function failure(error) {
        return {type: objectiveConstants.GET_FAILURE, error}
    }
}

export function getAllObjectives(filter, page, size) {
    return dispatch => {
        dispatch(request());

        objectiveService.getAllObjectives(filter, page, size)
            .then(
                response => dispatch(success({items: response[0], dataTotalSize: response[1]})),
                error => dispatch(failure(error))
            );
    };

    function request() {
        return {type: objectiveConstants.GETALL_REQUEST}
    }

    function success(data) {
        return {type: objectiveConstants.GETALL_SUCCESS, data}
    }

    function failure(error) {
        return {type: objectiveConstants.GETALL_FAILURE, error}
    }
}

export function createObjectiveForTeam(objective) {
    return dispatch => {
        dispatch(request());

        return objectiveService.createObjective(objective)
            .then(
                response => {
                    dispatch(success(response));
                    dispatch(alertActions.success('Objective create successful'));
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
        return {type: objectiveConstants.CREATE_REQUEST}
    }

    function success(response) {
        return {type: objectiveConstants.CREATE_SUCCESS, response}
    }

    function failure(error) {
        return {type: objectiveConstants.CREATE_FAILURE, error}
    }
}

export function createObjectiveForUser(objective) {
    return dispatch => {
        dispatch(request());

        return objectiveService.createObjectiveForUser(objective)
            .then(
                response => {
                    dispatch(success(response));
                    dispatch(alertActions.success('Objective create successful'));
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
        return {type: objectiveConstants.CREATE_REQUEST_FOR_USER}
    }

    function success(response) {
        return {type: objectiveConstants.CREATE_SUCCESS_FOR_USER, response}
    }

    function failure(error) {
        return {type: objectiveConstants.CREATE_FAILURE_FOR_USER, error}
    }
}

export function updateObjective(objective) {
    return dispatch => {
        dispatch(request());

        return objectiveService.updateObjective(objective)
            .then(
                objective => {
                    dispatch(success(objective));
                    dispatch(alertActions.success('Objective update successful'));
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
        return {type: objectiveConstants.UPDATE_REQUEST}
    }

    function success(objective) {
        return {type: objectiveConstants.UPDATE_SUCCESS, objective}
    }

    function failure(error) {
        return {type: objectiveConstants.UPDATE_FAILURE, error}
    }
}

function deleteObjective(id) {
    return dispatch => {
        dispatch(request(id));

        objectiveService.deleteObjective(id)
            .then(
                objective => {
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) {
        return {type: objectiveConstants.DELETE_FAILURE, id}
    }

    function success(id) {
        return {type: objectiveConstants.DELETE_SUCCESS, id}
    }

    function failure(id, error) {
        return {type: objectiveConstants.DELETE_FAILURE, id, error}
    }
}