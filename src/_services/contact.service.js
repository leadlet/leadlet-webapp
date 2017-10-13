import { authHeader } from '../_helpers';

export const contactService = {
    getAll
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/api/contacts', requestOptions).then(handleResponse);
}


function handleResponse(response) {
    if (response.ok !== true) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}