import {authHeader} from '../helpers';
import {userActions} from "../actions/user.actions";

export const organizationService = {
    getAllOrganization,
    getByIdOrganization,
    createOrganization,
    updateOrganization,
    getOrganizationByPersonId,
    _delete
};

function createOrganization(organization, callback) {
    const requestOptions = {
        method: 'POST',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify(organization)
    };

    return fetch('/api/organizations/', requestOptions).then(handleResponse);
}

function updateOrganization(organization, callback) {
    const requestOptions = {
        method: 'PUT',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify(organization)
    };

    return fetch('/api/organizations/', requestOptions).then(handleResponse);
}

function getByIdOrganization(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/api/organizations/' + id, requestOptions).then(handleResponse);
}

function getOrganizationByPersonId(personId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/organizations/person/${personId}`, requestOptions).then(handlePaginationResponse);
}

function getAllOrganization(filter, page, size) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/organizations?filter=${filter}&page=${page}&size=${size}`, requestOptions).then(handlePaginationResponse);
}

function _delete(idList) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch('/api/organizations/' + idList, requestOptions).then(handleResponse);
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
