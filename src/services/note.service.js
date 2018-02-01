import { authHeader } from '../helpers';
import {userActions} from "../actions/user.actions";

export const noteService = {
    getAll,
    getById,
    createNote,
    updateNote
};

function createNote(note, callback) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(note)
    };

    return fetch('/api/notes/', requestOptions).then(handleResponse);
}

function updateNote(note, callback) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(note)
    };

    return fetch('/api/notes/', requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/api/notes/' + id, requestOptions).then(handleResponse);
}

function getAll(filter , page, size) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/notes?filter=${filter}&page=${page}&size=${size}` , requestOptions).then(handlePaginationResponse);
}



function handlePaginationResponse(response) {
    if (response.ok !== true) {
        return Promise.reject(response.statusText);
    }

    return Promise.all([ response.json(), response.headers.get("x-total-count")]);

}

function handleResponse(response) {
    if (response.ok !== true) {
        if( response.status === 404 ) {
            userActions.logout();
        }
        return Promise.reject(response.statusText);
    }

    return response.json();

}
