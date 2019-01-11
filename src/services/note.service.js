import { authHeader } from '../helpers';
import {handlePaginationResponse, handleResponse} from "../helpers/service.utils";

export const noteService = {
    getAll,
    getById,
    createNote
};

function createNote(note, callback) {
    const requestOptions = {
        method: 'POST',
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


