import {alertActions} from "./alert.actions";
import {activityTypeConstants} from "../constants/activityType.constants";
import {activityTypeService} from "../services/activityType.service";

export function getActivityTypeById(activityTypeId) {
    return dispatch => {
        dispatch(request(activityTypeId));

        activityTypeService.getActivityTypeById(activityTypeId)
            .then(
                payload => {
                    dispatch(success(payload));
                },
                error => dispatch(failure(error))
            );
    };

    function request() {
        return {type: activityTypeConstants.GET_REQUEST}
    }

    function success(payload) {
        return {type: activityTypeConstants.GET_SUCCESS, payload}
    }

    function failure(error) {
        return {type: activityTypeConstants.GET_FAILURE, error}
    }
}

export function getAllActivityTypes() {
    return dispatch => {
        dispatch(request());


        activityTypeService.getAllActivityTypes()
            .then(
                items => dispatch(success(items)),
                error => dispatch(failure(error))
            );

    };

    function request() { return { type: activityTypeConstants.GETALL_REQUEST } }
    function success(payload) { return { type: activityTypeConstants.GETALL_SUCCESS, payload } }
    function failure(error) { return { type: activityTypeConstants.GETALL_FAILURE, error } }

}

export function updateActivityType(activityType) {
    return dispatch => {
        dispatch(request());

        return activityTypeService.update(activityType)
            .then(
                payload => {
                    dispatch(success(payload));
                    dispatch(alertActions.success('Activity Type successfully updated'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() {
        return {type: activityTypeConstants.UPDATE_REQUEST}
    }

    function success(payload) {
        return {type: activityTypeConstants.UPDATE_SUCCESS, payload}
    }

    function failure(error) {
        return {type: activityTypeConstants.UPDATE_FAILURE, error}
    }
}


export function createactivityType(activityType) {
    return dispatch => {
        dispatch(request());

        return activityTypeService.create(activityType)
            .then(
                payload => {
                    dispatch(success(payload));
                    dispatch(alertActions.success('Activity Type successfully created'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() {
        return {type: activityTypeConstants.CREATE_REQUEST}
    }

    function success(payload) {
        return {type: activityTypeConstants.CREATE_SUCCESS, payload}
    }

    function failure(error) {
        return {type: activityTypeConstants.CREATE_FAILURE, error}
    }
}

export function deleteActivityType(id) {
    return dispatch => {
        dispatch(request(id));

        activityTypeService._delete(id)
            .then(
                response => {
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(deal) {
        return {type: activityTypeConstants.DELETE_REQUEST, deal}
    }

    function success(payload) {
        return {type: activityTypeConstants.DELETE_SUCCESS, payload}
    }

    function failure(id, error) {
        return {type: activityTypeConstants.DELETE_FAILURE, id, error}
    }
}