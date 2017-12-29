import { authHeader } from '../helpers';

export const contactService = {
    getAll,
    getById,
    createContact,
    updateContact
};

function createContact(contact, callback) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(contact)
    };

    return fetch('/api/contacts/', requestOptions).then(handleResponse);
}

function updateContact(contact, callback) {
    const requestOptions = {
        method: 'PUT',
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

function getAll(filter , page, size) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/contacts?filter=${filter}&page=${page}&size=${size}` , requestOptions).then(handleResponse);
}



function handleResponse(response) {
    if (response.ok !== true) {
        return Promise.reject(response.statusText);
    }

    return Promise.all([ response.json(), response.headers.get("x-total-count")]);

}
