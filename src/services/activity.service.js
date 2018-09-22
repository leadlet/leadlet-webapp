import { authHeader } from '../helpers';

import {userActions} from "../actions/user.actions";
import {buildRequestString} from "../helpers/requestUtils";

export const activityService = {
    getActivitiesByFilter,
    create,
    update,
    _delete
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

function getActivitiesByFilter(query, sort, page, size=10) {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    };

    let requestString = buildRequestString(query, sort, page, size);

    return fetch(`/api/activities?${requestString}`, requestOptions).then(handlePaginationResponse);
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
        if( response.status === 401 ){
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