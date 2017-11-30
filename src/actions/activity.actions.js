import {activityConstants} from "../constants/activity.constants";
import {activityService} from "../services/activity.service";
import {alertActions} from "./alert.actions";

export function create(activity) {
    return dispatch => {
        dispatch(request());

        return activityService.create(activity)
            .then(
                activity => {
                    dispatch(success(activity));
                    dispatch(alertActions.success('Activity successfully created'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: activityConstants.CREATE_REQUEST } }
    function success(activity) { return { type: activityConstants.CREATE_SUCCESS, activity } }
    function failure(error) { return { type: activityConstants.CREATE_FAILURE, error } }
}

export function getAll() {
    return dispatch => {
        dispatch(request());

        activityService.getAll()
            .then(
                items => dispatch(success(items)),
                error => dispatch(failure(error))
            );

    };

    function request() { return { type: activityConstants.GETALL_REQUEST } }
    function success(items) { return { type: activityConstants.GETALL_SUCCESS, items } }
    function failure(error) { return { type: activityConstants.GETALL_FAILURE, error } }
}

export function update(activity, successCallback) {
    return dispatch => {
        dispatch(request());

        return activityService.update(activity)
            .then(
                activity => {
                    dispatch(successCallback);
                    dispatch(success(activity));
                    dispatch(alertActions.success('Activity successfully updated'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: activityConstants.UPDATE_REQUEST } }
    function success(activity) { return { type: activityConstants.UPDATE_SUCCESS, activity } }
    function failure(error) { return { type: activityConstants.UPDATE_FAILURE, error } }
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

    function request(id) { return { type: activityConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: activityConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: activityConstants.DELETE_FAILURE, id, error } }
}