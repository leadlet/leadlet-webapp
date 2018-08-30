import { authHeader } from '../helpers';
import {userActions} from "../actions/user.actions";

export const dealService = {
    getAllDeals,
    getDealsByFilter,
    getDealById,
    create,
    update,
    move,
    _delete,
    getDealsByPersonId,
    getDealsByOrganizationId
};


function getDealsByPersonId(personId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/api/deals/person/' + personId, requestOptions).then(handleResponse);
}

function getDealsByOrganizationId(organizationId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/api/deals/organization/' + organizationId, requestOptions).then(handleResponse);
}

function create(stage) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(stage)
    };

    return fetch('/api/deals/', requestOptions).then(handleResponse);
}

function update(stage) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(stage)
    };

    return fetch('/api/deals/', requestOptions).then(handleResponse);
}

function move(moveDealDto) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(moveDealDto)
    };

    return fetch('/api/deals/move', requestOptions).then(handleResponse);
}

function getDealById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/api/deals/' + id, requestOptions).then(handleResponse);
}

function getAllDeals(filter, page, size) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/deals?filter=${filter}&page=${page}&size=${size}`, requestOptions).then(handlePaginationResponse);
}

function getDealsByFilter(query, page) {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    };

    return fetch(`/api/deals/search?q=${query}&page=${page}&size=10`, requestOptions).then(handlePaginationResponse);
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch('/api/deals/' + id, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (response.ok !== true) {
        if( response.status === 401 ) {
            userActions.logout();
        }
        return Promise.reject(response.statusText);
    }

    // The response of a fetch() request is a Stream object, which means that when we call the json() method,
    // a Promise is returned since the reading of the stream will happen asynchronously.

    return response.json();
}

function handlePaginationResponse(response) {
    if (response.ok !== true) {
        if( response.status === 401 ) {
            userActions.logout();
        }
        return Promise.reject(response.statusText);
    }

    return Promise.all([response.json(), response.headers.get("x-total-count")]);

}