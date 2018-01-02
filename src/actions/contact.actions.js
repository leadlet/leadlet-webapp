import {contactConstants} from "../constants/contact.constants";
import {contactService} from "../services/contact.service";
import {alertActions} from "./alert.actions";

export function getById(contactId) {
    return dispatch => {
        dispatch(request(contactId));

        contactService.getById(contactId)
            .then(
                contact => dispatch(success(contact)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: contactConstants.GET_REQUEST } }
    function success(contact) { return { type: contactConstants.GET_SUCCESS, contact } }
    function failure(error) { return { type: contactConstants.GET_FAILURE, error } }
}

export function getAll(filter, page, size) {
    return dispatch => {
        dispatch(request());

        contactService.getAll(filter, page, size)
            .then(
                response => dispatch(success({ items: response[0], dataTotalSize: response[1]})),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: contactConstants.GETALL_REQUEST } }
    function success(data) { return { type: contactConstants.GETALL_SUCCESS, data } }
    function failure(error) { return { type: contactConstants.GETALL_FAILURE, error } }
}

export function createContact(contact, successCallback) {
    return dispatch => {
        dispatch(request());

        return contactService.createContact(contact)
            .then(
                contact => {
                    dispatch(success(contact));
                    dispatch(alertActions.success('Contact create successful'));
                },
                error => {
                    // TODO catch validation error here and throw submission error
                    // throw new SubmissionError({name: 'hedeler' , title: 'hedeler2', _error: 'olmadi'});
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: contactConstants.CREATE_REQUEST } }
    function success(contact) { return { type: contactConstants.CREATE_SUCCESS, contact } }
    function failure(error) { return { type: contactConstants.CREATE_FAILURE, error } }
}

export function updateContact(contact, successCallback) {
    return dispatch => {
        dispatch(request());

        return contactService.updateContact(contact)
            .then(
                contact => {
                    dispatch(success(contact));
                    dispatch(alertActions.success('Contact update successful'));
                },
                error => {
                    // TODO catch validation error here and throw submission error
                    // throw new SubmissionError({name: 'hedeler' , title: 'hedeler2', _error: 'olmadi'});
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: contactConstants.UPDATE_REQUEST } }
    function success(contact) { return { type: contactConstants.UPDATE_SUCCESS, contact } }
    function failure(error) { return { type: contactConstants.UPDATE_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        contactService.delete(id)
            .then(
                contact => {
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) { return { type: contactConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: contactConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: contactConstants.DELETE_FAILURE, id, error } }
}