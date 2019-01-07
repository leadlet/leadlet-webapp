import {authHeader} from '../helpers';
import {handleResponse} from "../helpers/service.utils";

export const activityTypeService = {
    getAllActivityTypes,
    getActivityTypeById,
    create,
    update,
    _delete
};


function create(stage) {
    const requestOptions = {
        method: 'POST',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify(stage)
    };

    return fetch('/api/activity-types/', requestOptions).then(handleResponse);
}

function update(stage) {
    const requestOptions = {
        method: 'PUT',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify(stage)
    };

    return fetch('/api/activity-types/', requestOptions).then(handleResponse);
}

function getActivityTypeById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/api/activity-types/' + id, requestOptions).then(handleResponse);
}

function getAllActivityTypes() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/activity-types`, requestOptions).then(handleResponse);
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch('/api/activity-types/' + id, requestOptions).then(handleResponse);
}