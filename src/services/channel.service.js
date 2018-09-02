import { authHeader } from '../helpers';
import {userActions} from "../actions/user.actions";

export const channelService = {
    createChannel,
    getChannelById,
    getAllChannels,
    updateChannel,
    _deleteChannel
};

function createChannel(channel, callback) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(channel)
    };

    return fetch('/api/channels/', requestOptions).then(handleResponse);
}

function updateChannel(channel, callback) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(channel)
    };

    return fetch('/api/channels/', requestOptions).then(handleResponse);
}

function getChannelById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/api/channels/' + id, requestOptions).then(handleResponse);
}

function getAllChannels(filter , page, size) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/channels?filter=${filter}&page=${page}&size=${size}`, requestOptions).then(handleResponse);
}

function _deleteChannel(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch('/api/channels/' + id, requestOptions).then(handleResponse);
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
