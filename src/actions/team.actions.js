import {alertActions} from "./alert.actions";
import {teamService} from "../services/team.service";
import {teamConstants} from "../constants/team.constants";

export function getByTeamId(teamId) {
    return dispatch => {
        dispatch(request(teamId));

        teamService.getByTeamId(teamId)
            .then(
                team => dispatch(success(team)),
                error => dispatch(failure(error))
            );
    };

    function request() {
        return {type: teamConstants.GET_REQUEST}
    }

    function success(team) {
        return {type: teamConstants.GET_SUCCESS, team}
    }

    function failure(error) {
        return {type: teamConstants.GET_FAILURE, error}
    }
}

export function getAllTeams(filter, page, size) {
    return dispatch => {
        dispatch(request());

        teamService.getAll(filter, page, size)
            .then(
                response => dispatch(success({items: response[0], dataTotalSize: response[1]})),
                error => dispatch(failure(error))
            );
    };

    function request() {
        return {type: teamConstants.GETALL_REQUEST}
    }

    function success(data) {
        return {type: teamConstants.GETALL_SUCCESS, data}
    }

    function failure(error) {
        return {type: teamConstants.GETALL_FAILURE, error}
    }
}

export function createTeam(team, successCallback) {
    return dispatch => {
        dispatch(request());

        return teamService.createTeam(team)
            .then(
                team => {
                    dispatch(successCallback);
                    dispatch(success(team));
                    dispatch(alertActions.success('Team create successful'));
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
        return {type: teamConstants.CREATE_REQUEST}
    }

    function success(team) {
        return {type: teamConstants.CREATE_SUCCESS, team}
    }

    function failure(error) {
        return {type: teamConstants.CREATE_FAILURE, error}
    }
}

export function updateTeam(team, successCallback) {
    return dispatch => {
        dispatch(request());

        return teamService.updateTeam(team)
            .then(
                team => {
                    dispatch(success(team));
                    dispatch(alertActions.success('Team update successful'));
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
        return {type: teamConstants.UPDATE_REQUEST}
    }

    function success(team) {
        return {type: teamConstants.UPDATE_SUCCESS, team}
    }

    function failure(error) {
        return {type: teamConstants.UPDATE_FAILURE, error}
    }
}

function deleteTeam(id) {
    return dispatch => {
        dispatch(request(id));

        teamService.delete(id)
            .then(
                team => {
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) {
        return {type: teamConstants.DELETE_REQUEST, id}
    }

    function success(id) {
        return {type: teamConstants.DELETE_SUCCESS, id}
    }

    function failure(id, error) {
        return {type: teamConstants.DELETE_FAILURE, id, error}
    }
}