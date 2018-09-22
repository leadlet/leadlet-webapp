import { authHeader } from '../helpers';

import {handlePaginationResponse, handleResponse} from "../helpers/service.utils";
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
