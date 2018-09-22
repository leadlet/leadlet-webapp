import { authHeader } from '../helpers';
import {handlePaginationResponse, handleResponse} from "../helpers/service.utils";

export const teamService = {
    getAll,
    getByTeamId,
    createTeam,
    updateTeam,
    deleteTeam
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

function deleteTeam(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch('/api/teams/' + id, requestOptions).then(handleResponse);
}
