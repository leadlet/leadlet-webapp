import { authHeader } from '../helpers';
import {userActions} from "../actions/user.actions";

export const objectiveService = {
    getAllObjectives,
    getByObjectiveId,
    createObjective,
    updateObjective,
    deleteObjective
};

function createObjective(objective, callback) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(objective)
    };

    return fetch('/api/objectives/team', requestOptions).then(handleResponse);
}

function updateObjective(objective, callback) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(objective)
    };

    return fetch('/api/objectives/', requestOptions).then(handleResponse);
}

function getByObjectiveId(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/api/objectives/' + id, requestOptions).then(handleResponse);
}

function getAllObjectives(filter , page, size) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/objectives?filter=${filter}&page=${page}&size=${size}` , requestOptions).then(handlePaginationResponse);
}

function deleteObjective(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch('/api/objectives/' + id, requestOptions).then(handleResponse);
}

function handlePaginationResponse(response) {
    if (response.ok !== true) {
        if( response.status === 401 ) {
            userActions.logout();
        }
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
