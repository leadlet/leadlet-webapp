import {authHeader} from '../helpers';
import {handlePaginationResponse, handleResponse} from "../helpers/service.utils";

export const personService = {
    getAllPerson,
    getById,
    createPerson,
    updatePerson,
    _delete
};

function createPerson(person) {
    const requestOptions = {
        method: 'POST',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify(person)
    };

    return fetch('/api/persons/', requestOptions).then(handleResponse);
}

function updatePerson(person) {
    const requestOptions = {
        method: 'PUT',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify(person)
    };

    return fetch('/api/persons/', requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/api/persons/' + id, requestOptions).then(handleResponse);
}


function getAllPerson(filter, page, size) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/persons?filter=${filter}&page=${page}&size=${size}`, requestOptions).then(handlePaginationResponse);
}

function _delete(idList) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch('/api/persons/' + idList, requestOptions).then(handleResponse);
}
