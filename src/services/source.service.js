import { authHeader } from '../helpers';
import {userActions} from "../actions/user.actions";

export const sourceService = {
    createSource,
    getSourceById,
    getAllSources,
    updateSource,
    _deleteSource
};

function createSource(source, callback) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(source)
    };

    return fetch('/api/sources/', requestOptions).then(handleResponse);
}

function updateSource(source, callback) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(source)
    };

    return fetch('/api/sources/', requestOptions).then(handleResponse);
}

function getSourceById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/api/sources/' + id, requestOptions).then(handleResponse);
}

function getAllSources(filter , page, size) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/sources?filter=${filter}&page=${page}&size=${size}`, requestOptions).then(handleResponse);
}

function _deleteSource(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch('/api/sources/' + id, requestOptions).then(handleResponse);
}



function handlePaginationResponse(response) {
    if (response.ok !== true) {
        return Promise.reject(response.statusText);
    }

    return Promise.all([ response.json(), response.headers.get("x-total-count")]);

}

function handleResponse(response) {
    if (response.ok !== true) {
        if( response.status === 401 ) {
            userActions.logout();
        }
        return Promise.reject(response.statusText);
    }

    return response.json();

}
