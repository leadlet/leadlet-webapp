import { authHeader } from '../helpers';

import {userActions} from "../actions/user.actions";

export const activityService = {
    getAll,
    create,
    update,
    _delete,
    getActivitiesByPersonId,
    getActivitiesByOrganizationId
};

function create(activity, callback) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(activity)
    };

    return fetch('/api/activities/', requestOptions).then(handleResponse);
}

function update(activity) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(activity)
    };

    return fetch('/api/activities/', requestOptions).then(handleResponse);
}

function getAll() {
    // TODO ygokirmak - add pipelineId filter
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/api/activities', requestOptions).then(handleResponse);
}

function getActivitiesByPersonId(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/activities/person/${id}`, requestOptions).then(handleResponse);
}

function getActivitiesByOrganizationId(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/activities/organization/${id}`, requestOptions).then(handleResponse);
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch('/api/activities/' + id, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (response.ok !== true) {
        if( response.status === 404 ){
            userActions.logout();
        }
        return Promise.reject(response.statusText);
    }

    // The response of a fetch() request is a Stream object, which means that when we call the json() method,
    // a Promise is returned since the reading of the stream will happen asynchronously.

    return response.json();
}