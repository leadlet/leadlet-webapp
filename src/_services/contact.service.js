import { authHeader } from '../_helpers';

export const contactService = {
    getAll,
    getById,
    createContact
};

function createContact(contact, callback) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(contact)
    };

    return fetch('/api/contacts/', requestOptions).then(handleResponse);
}

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

    return Promise.all([ response.json(), response.headers.get("x-total-count")]);
//    return response.json();
}