import {authHeader} from '../helpers';
import {handlePaginationResponse, handleResponse} from "../helpers/service.utils";

export const contactService = {
    getAllContact,
    getById,
    createContact,
    updateContact,
    _delete
};

function createContact(contact) {
    const requestOptions = {
        method: 'POST',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify(contact)
    };

    return fetch('/api/contacts/', requestOptions).then(handleResponse);
}

function updateContact(contact) {
    const requestOptions = {
        method: 'PUT',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
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


function getAllContact(filter, page, size) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/contacts?filter=${filter}&page=${page}&size=${size}`, requestOptions).then(handlePaginationResponse);
}

function _delete(idList) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch('/api/contacts/' + idList, requestOptions).then(handleResponse);
}
