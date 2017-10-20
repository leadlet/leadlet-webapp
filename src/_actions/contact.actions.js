import {contactConstants} from "../_constants/contact.constants";
import {contactService} from "../_services/contact.service";
import {alertActions} from "./alert.actions";
import {SubmissionError} from "redux-form";

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

export function getAllPerson(filter) {
    return dispatch => {
        dispatch(request());

        contactService.getAll(filter + ",type:PERSON")
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: contactConstants.PERSONS_GETALL_REQUEST } }
    function success(data) { return { type: contactConstants.PERSONS_GETALL_SUCCESS, data } }
    function failure(error) { return { type: contactConstants.PERSONS_GETALL_FAILURE, error } }

}

export function getAllOrganization(filter) {
    return dispatch => {
        dispatch(request());

        contactService.getAll(filter + ",type:ORGANIZATION")
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: contactConstants.ORGANIZATIONS_GETALL_REQUEST } }
    function success(data) { return { type: contactConstants.ORGANIZATIONS_GETALL_SUCCESS, data } }
    function failure(error) { return { type: contactConstants.ORGANIZATIONS_GETALL_FAILURE, error } }
}

export function getAll(filter) {
    return dispatch => {
        dispatch(request());

        contactService.getAll(filter)
            .then(
                contacts => dispatch(success(contacts)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: contactConstants.GETALL_REQUEST } }
    function success(contacts) { return { type: contactConstants.GETALL_SUCCESS, contacts } }
    function failure(error) { return { type: contactConstants.GETALL_FAILURE, error } }
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