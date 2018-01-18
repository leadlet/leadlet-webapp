import { authHeader } from '../helpers';

export const personService = {
    getAllPerson,
    getById,
    createPerson,
    updatePerson
};

function createPerson(person, callback) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(person)
    };

    return fetch('/api/persons/', requestOptions).then(handleResponse);
}

function updatePerson(person, callback) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
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

function getAllPerson(filter , page, size) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/persons?filter=${filter}&page=${page}&size=${size}` , requestOptions).then(handlePaginationResponse);
}

function handlePaginationResponse(response) {
    if (response.ok !== true) {
        return Promise.reject(response.statusText);
    }

    return Promise.all([ response.json(), response.headers.get("x-total-count")]);

}

function handleResponse(response) {
    if (response.ok !== true) {
        return Promise.reject(response.statusText);
    }

    return response.json();

}
