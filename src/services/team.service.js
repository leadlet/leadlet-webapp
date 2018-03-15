import { authHeader } from '../helpers';
import {userActions} from "../actions/user.actions";

export const teamService = {
    getAll,
    getByTeamId,
    createTeam,
    updateTeam
};

function createTeam(team, callback) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(team)
    };

    return fetch('/api/teams/', requestOptions).then(handleResponse);
}

function updateTeam(team, callback) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(team)
    };

    return fetch('/api/teams/', requestOptions).then(handleResponse);
}

function getByTeamId(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/api/teams/' + id, requestOptions).then(handleResponse);
}

function getAll(filter , page, size) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/teams?filter=${filter}&page=${page}&size=${size}` , requestOptions).then(handlePaginationResponse);
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
