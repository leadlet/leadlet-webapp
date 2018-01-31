import {authHeader} from '../helpers';
import {userActions} from "../actions/user.actions";

export const personService = {
    getAllPerson,
    getAllPersonByOrganization,
    getById,
    createPerson,
    updatePerson,
    _delete
};

function createPerson(person, callback) {
    const requestOptions = {
        method: 'POST',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify(person)
    };

    return fetch('/api/persons/', requestOptions).then(handleResponse);
}

function updatePerson(person, callback) {
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

function getAllPersonByOrganization(organizationId, page, size) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/persons/organization/${organizationId}?page=${page}&size=${size}`, requestOptions).then(handlePaginationResponse);
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

function handlePaginationResponse(response) {
    if (response.ok !== true) {
        userActions.logout();
        return Promise.reject(response.statusText);
    }

    return Promise.all([response.json(), response.headers.get("x-total-count")]);

}

function handleResponse(response) {
    if (response.ok !== true) {
        userActions.logout();
        return Promise.reject(response.statusText);
    }

    return response.json();

}
