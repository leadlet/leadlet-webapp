import { authHeader } from '../helpers';

export const pipelineService = {
    getAll,
    getById
};


function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/api/pipelines/' + id, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/api/pipelines', requestOptions).then(handleResponse);
}


function handleResponse(response) {
    if (response.ok !== true) {
        return Promise.reject(response.statusText);
    }

    // The response of a fetch() request is a Stream object, which means that when we call the json() method,
    // a Promise is returned since the reading of the stream will happen asynchronously.

    return response.json();
}