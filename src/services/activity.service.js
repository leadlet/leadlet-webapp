import { authHeader } from '../helpers';

export const activityService = {
    getAll,
    create,
    update,
    _delete
};

function create(activity) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(activity)
    };

    return fetch('/api/activities/', requestOptions).then(handleResponse);
}

function update(activity) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(activity)
    };

    return fetch('/api/activities/', requestOptions).then(handleResponse);
}

function getAll() {
    // TODO ygokirmak - add pipelineId filter
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/api/activities', requestOptions).then(handleResponse);
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch('/api/activities/' + id, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (response.ok !== true) {
        return Promise.reject(response.statusText);
    }

    // The response of a fetch() request is a Stream object, which means that when we call the json() method,
    // a Promise is returned since the reading of the stream will happen asynchronously.

    return response.json();
}