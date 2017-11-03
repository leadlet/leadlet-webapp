import { authHeader } from '../helpers';

export const stageService = {
    getAll,
    getById,
    createStage,
    updateStage,
    _delete
};

function createStage(stage) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(stage)
    };

    return fetch('/api/stages/', requestOptions).then(handleResponse);
}

function updateStage(stage) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(stage)
    };

    return fetch('/api/stages/', requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/api/stages/' + id, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/api/stages', requestOptions).then(handleResponse);
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch('/stages/' + id, requestOptions).then(handleResponse);;
}

function handleResponse(response) {
    if (response.ok !== true) {
        return Promise.reject(response.statusText);
    }

    // The response of a fetch() request is a Stream object, which means that when we call the json() method,
    // a Promise is returned since the reading of the stream will happen asynchronously.

    return response.json();
}