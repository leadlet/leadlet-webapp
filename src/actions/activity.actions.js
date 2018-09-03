import {activityConstants} from "../constants/activity.constants";
import {activityService} from "../services/activity.service";
import {alertActions} from "./alert.actions";

export function create(activity, successCallback) {
    return dispatch => {
        dispatch(request());

        return activityService.create(activity)
            .then(
                payload => {
                    if(successCallback){
                        dispatch(successCallback);
                    }
                    dispatch(success(payload));
                    dispatch(alertActions.success('Activity successfully created'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() {
        return {type: activityConstants.CREATE_REQUEST}
    }

    function success(payload) {
        return {type: activityConstants.CREATE_SUCCESS, payload}
    }

    function failure(error) {
        return {type: activityConstants.CREATE_FAILURE, error}
    }
}

export function getActivities(filter="", page=0, append=false) {

    return dispatch => {

        activityService.getActivitiesByFilter(filter, page)
            .then(
                response => {
                    dispatch(success(response));
                },
                error => dispatch(failure(error))
            );
    };
    function success(response) {
        const type = append ? activityConstants.APPEND_ACTIVITIES_SUCCESS : activityConstants.LOAD_ACTIVITIES_SUCCESS;

        return { type: type, payload: { 'activities': response[0], 'maxActivityCount': response[1]} }
    }
    function failure(error) {
        const type = append ? activityConstants.APPEND_ACTIVITIES_FAILURE : activityConstants.LOAD_ACTIVITIES_FAILURE;

        return { type: type, error }
    }
}


export function getAll() {
    return dispatch => {
        dispatch(request());

        activityService.getAll()
            .then(
                payload => dispatch(success(payload)),
                error => dispatch(failure(error))
            );

    };

    function request() {
        return {type: activityConstants.GETALL_REQUEST}
    }

    function success(payload) {
        return {type: activityConstants.GETALL_SUCCESS, payload}
    }

    function failure(error) {
        return {type: activityConstants.GETALL_FAILURE, error}
    }
}

export function getActivitiesByPersonId(id) {
    return dispatch => {
        dispatch(request());

        activityService.getActivitiesByPersonId(id)
            .then(
                items => dispatch(success(items)),
                error => dispatch(failure(error))
            );

    };

    function request() {
        return {type: activityConstants.GETALL_REQUEST}
    }

    function success(items) {
        return {type: activityConstants.GETALL_SUCCESS, items}
    }

    function failure(error) {
        return {type: activityConstants.GETALL_FAILURE, error}
    }
}

export function getActivitiesByOrganizationId(id) {
    return dispatch => {
        dispatch(request());

        activityService.getActivitiesByOrganizationId(id)
            .then(
                items => dispatch(success(items)),
                error => dispatch(failure(error))
            );

    };

    function request() {
        return {type: activityConstants.GETALL_REQUEST}
    }

    function success(items) {
        return {type: activityConstants.GETALL_SUCCESS, items}
    }

    function failure(error) {
        return {type: activityConstants.GETALL_FAILURE, error}
    }
}

export function getActivitiesByAgentId(id) {
    return dispatch => {
        dispatch(request());

        activityService.getActivitiesByAgentId(id)
            .then(
                items => dispatch(success(items)),
                error => dispatch(failure(error))
            );

    };

    function request() {
        return {type: activityConstants.GETALL_REQUEST}
    }

    function success(items) {
        return {type: activityConstants.GETALL_SUCCESS, items}
    }

    function failure(error) {
        return {type: activityConstants.GETALL_FAILURE, error}
    }
}

export function getActivitiesByDealId(id) {
    return dispatch => {
        dispatch(request());

        activityService.getActivitiesByDealId(id)
            .then(
                items => dispatch(success(items)),
                error => dispatch(failure(error))
            );

    };

    function request() {
        return {type: activityConstants.GETALL_REQUEST}
    }

    function success(items) {
        return {type: activityConstants.GETALL_SUCCESS, items}
    }

    function failure(error) {
        return {type: activityConstants.GETALL_FAILURE, error}
    }
}

export function update(activity) {
    return dispatch => {
        dispatch(request());

        return activityService.update(activity)
            .then(
                payload => {
                    dispatch(success(payload));
                    dispatch(alertActions.success('Activity successfully updated'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() {
        return {type: activityConstants.UPDATE_REQUEST}
    }

    function success(payload) {
        return {type: activityConstants.UPDATE_SUCCESS, payload}
    }

    function failure(error) {
        return {type: activityConstants.UPDATE_FAILURE, error}
    }
}

export function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        activityService._delete(id)
            .then(
                activity => {
                    dispatch(success(activity.id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) {
        return {type: activityConstants.DELETE_REQUEST, id}
    }

    function success(payload) {
        return {type: activityConstants.DELETE_SUCCESS, payload}
    }

    function failure(id, error) {
        return {type: activityConstants.DELETE_FAILURE, id, error}
    }
}