import {personConstants} from "../constants/person.constants";
import {personService} from "../services/person.service";
import {alertActions} from "./alert.actions";

export function getById(personId) {
    return dispatch => {
        dispatch(request(personId));

        personService.getById(personId)
            .then(
                person => dispatch(success(person)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: personConstants.GET_REQUEST } }
    function success(person) { return { type: personConstants.GET_SUCCESS, person } }
    function failure(error) { return { type: personConstants.GET_FAILURE, error } }
}

export function getAllPerson(filter, page, size) {
    return dispatch => {
        dispatch(request());

        personService.getAllPerson(filter, page, size)
            .then(
                response => dispatch(success({ items: response[0], dataTotalSize: response[1]})),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: personConstants.GETALL_REQUEST } }
    function success(data) { return { type: personConstants.GETALL_SUCCESS, data } }
    function failure(error) { return { type: personConstants.GETALL_FAILURE, error } }
}

export function createPerson(person, successCallback) {
    return dispatch => {
        dispatch(request());

        return personService.createPerson(person)
            .then(
                person => {
                    dispatch(success(person));
                    dispatch(alertActions.success('Person create successful'));
                },
                error => {
                    // TODO catch validation error here and throw submission error
                    // throw new SubmissionError({name: 'hedeler' , title: 'hedeler2', _error: 'olmadi'});
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: personConstants.CREATE_REQUEST } }
    function success(person) { return { type: personConstants.CREATE_SUCCESS, person } }
    function failure(error) { return { type: personConstants.CREATE_FAILURE, error } }
}

export function updatePerson(person, successCallback) {
    return dispatch => {
        dispatch(request());

        return personService.updatePerson(person)
            .then(
                person => {
                    dispatch(success(person));
                    dispatch(alertActions.success('Person update successful'));
                },
                error => {
                    // TODO catch validation error here and throw submission error
                    // throw new SubmissionError({name: 'hedeler' , title: 'hedeler2', _error: 'olmadi'});
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: personConstants.UPDATE_REQUEST } }
    function success(person) { return { type: personConstants.UPDATE_SUCCESS, person } }
    function failure(error) { return { type: personConstants.UPDATE_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        personService.delete(id)
            .then(
                person => {
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) { return { type: personConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: personConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: personConstants.DELETE_FAILURE, id, error } }
}