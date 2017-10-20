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

    // TODO: I had to return new promise combining two values but not sure it is similar to what is done commented line
    return Promise.all([ response.json(), response.headers.get("x-total-count")]);

    // The response of a fetch() request is a Stream object, which means that when we call the json() method,
    // a Promise is returned since the reading of the stream will happen asynchronously.

    // return response.json();
}