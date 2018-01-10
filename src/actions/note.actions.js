import {noteConstants} from "../constants/note.constants";
import {noteService} from "../services/note.service";
import {alertActions} from "./alert.actions";

export function getById(noteId) {
    return dispatch => {
        dispatch(request(noteId));

        noteService.getById(noteId)
            .then(
                note => dispatch(success(note)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: noteConstants.GET_REQUEST } }
    function success(note) { return { type: noteConstants.GET_SUCCESS, note } }
    function failure(error) { return { type: noteConstants.GET_FAILURE, error } }
}

export function getAll(filter, page, size) {
    return dispatch => {
        dispatch(request());

        noteService.getAll(filter, page, size)
            .then(
                response => dispatch(success({ items: response[0], dataTotalSize: response[1]})),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: noteConstants.GETALL_REQUEST } }
    function success(data) { return { type: noteConstants.GETALL_SUCCESS, data } }
    function failure(error) { return { type: noteConstants.GETALL_FAILURE, error } }
}

export function createNote(note, successCallback) {
    return dispatch => {
        dispatch(request());

        return noteService.createNote(note)
            .then(
                note => {
                    dispatch(success(note));
                    dispatch(alertActions.success('Note create successful'));
                },
                error => {
                    // TODO catch validation error here and throw submission error
                    // throw new SubmissionError({name: 'hedeler' , title: 'hedeler2', _error: 'olmadi'});
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: noteConstants.CREATE_REQUEST } }
    function success(note) { return { type: noteConstants.CREATE_SUCCESS, note } }
    function failure(error) { return { type: noteConstants.CREATE_FAILURE, error } }
}

export function updateNote(note, successCallback) {
    return dispatch => {
        dispatch(request());

        return noteService.updateNote(note)
            .then(
                note => {
                    dispatch(success(note));
                    dispatch(alertActions.success('Note update successful'));
                },
                error => {
                    // TODO catch validation error here and throw submission error
                    // throw new SubmissionError({name: 'hedeler' , title: 'hedeler2', _error: 'olmadi'});
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: noteConstants.UPDATE_REQUEST } }
    function success(note) { return { type: noteConstants.UPDATE_SUCCESS, note } }
    function failure(error) { return { type: noteConstants.UPDATE_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        noteService.delete(id)
            .then(
                note => {
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) { return { type: noteConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: noteConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: noteConstants.DELETE_FAILURE, id, error } }
}