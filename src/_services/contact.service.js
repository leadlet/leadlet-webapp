import { authHeader } from '../_helpers';

export const contactService = {
    getAll,
    getById
};

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/api/contacts/' + id, requestOptions).then(handleResponse);
}

function getAll(filter = "") {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/api/contacts' + ( filter ? `?filter=${filter}` : "" ), requestOptions).then(handleResponse);
}


function handleResponse(response) {
    if (response.ok !== true) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}