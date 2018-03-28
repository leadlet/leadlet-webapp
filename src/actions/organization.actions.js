import {organizationConstants} from "../constants/organization.constants";
import {organizationService} from "../services/organization.service";
import {alertActions} from "./alert.actions";

export function getByIdOrganization(organizationId) {
    return dispatch => {
        dispatch(request(organizationId));

        organizationService.getByIdOrganization(organizationId)
            .then(
                organization => dispatch(success(organization)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: organizationConstants.GET_REQUEST } }
    function success(organization) { return { type: organizationConstants.GET_SUCCESS, organization } }
    function failure(error) { return { type: organizationConstants.GET_FAILURE, error } }
}

export function getAllOrganization(filter, page, size) {
    return dispatch => {
        dispatch(request());

        organizationService.getAllOrganization(filter, page, size)
            .then(
                response => dispatch(success({ items: response[0], dataTotalSize: response[1]})),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: organizationConstants.GETALL_REQUEST } }
    function success(data) { return { type: organizationConstants.GETALL_SUCCESS, data } }
    function failure(error) { return { type: organizationConstants.GETALL_FAILURE, error } }
}

export function createOrganization(organization, successCallback) {
    return dispatch => {
        dispatch(request());

        return organizationService.createOrganization(organization)
            .then(
                organization => {
                    dispatch(successCallback);
                    dispatch(success(organization));
                    dispatch(alertActions.success('Organization create successful'));
                },
                error => {
                    // TODO catch validation error here and throw submission error
                    // throw new SubmissionError({name: 'hedeler' , title: 'hedeler2', _error: 'olmadi'});
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: organizationConstants.CREATE_REQUEST } }
    function success(organization) { return { type: organizationConstants.CREATE_SUCCESS, organization } }
    function failure(error) { return { type: organizationConstants.CREATE_FAILURE, error } }
}

export function updateOrganization(organization, successCallback) {
    return dispatch => {
        dispatch(request());

        return organizationService.updateOrganization(organization)
            .then(
                organization => {
                    dispatch(successCallback);
                    dispatch(success(organization));
                    dispatch(alertActions.success('Organization update successful'));
                },
                error => {
                    // TODO catch validation error here and throw submission error
                    // throw new SubmissionError({name: 'hedeler' , title: 'hedeler2', _error: 'olmadi'});
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: organizationConstants.UPDATE_REQUEST } }
    function success(organization) { return { type: organizationConstants.UPDATE_SUCCESS, organization } }
    function failure(error) { return { type: organizationConstants.UPDATE_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
export function _deleteOrganizations(idList) {
    return dispatch => {
        dispatch(request(idList));

        organizationService._delete(idList)
            .then(
                ids => {
                    dispatch(success(ids));
                    dispatch(alertActions.success('Organizations deleted successfully'));
                },
                error => {
                    dispatch(failure(idList, error));
                }
            );
    };

    function request(idList) { return { type: organizationConstants.DELETE_REQUEST, idList } }
    function success(ids) { return { type: organizationConstants.DELETE_SUCCESS, ids } }
    function failure(idList, error) { return { type: organizationConstants.DELETE_FAILURE, idList, error } }
}
