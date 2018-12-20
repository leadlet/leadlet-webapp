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


export function getAllContact(filter, page, size) {
    return dispatch => {
        dispatch(request());

        contactService.getAllContact(filter, page, size)
            .then(
                response => dispatch(success({ items: response[0], dataTotalSize: response[1]})),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: contactConstants.GETALL_REQUEST } }
    function success(data) { return { type: contactConstants.GETALL_SUCCESS, data } }
    function failure(error) { return { type: contactConstants.GETALL_FAILURE, error } }
}

export function getAllContactByFilterAndReturn(filter, successCallback, failCallback) {
    contactService.getAllContact(filter, 0, 20)
        .then(
            response => successCallback(response[0]),
            error => failCallback(error)
        );
}

export function createContact(contact, successCallback) {
    return dispatch => {
        dispatch(request());

        return contactService.createContact(contact)
            .then(
                contact => {
                    dispatch(successCallback);
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
                    dispatch(successCallback);
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
export function _deleteContacts(idList) {
    return dispatch => {
        dispatch(request(idList));

        contactService._delete(idList)
            .then(
                ids => {
                    dispatch(success(ids));
                    dispatch(alertActions.success('Contacts deleted successfully'));
                },
                error => {
                    dispatch(failure(idList, error));
                }
            );
    };

    function request(idList) { return { type: contactConstants.DELETE_REQUEST, idList } }
    function success(ids) { return { type: contactConstants.DELETE_SUCCESS, ids } }
    function failure(idList, error) { return { type: contactConstants.DELETE_FAILURE, idList, error } }
}
