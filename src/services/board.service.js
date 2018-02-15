import { authHeader } from '../helpers';
import {userActions} from "../actions/user.actions";

export const boardService = {
    getBoardByPipelineId,
    getDealsByStage
};

function getDealsByStage(stageId, page) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/deals/stage/${stageId}?page=${page}`, requestOptions).then(handleResponse);
}

function getBoardByPipelineId(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/api/boards/' + id, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (response.ok !== true) {
        if( response.status === 401 ) {
            userActions.logout();
        }
        return Promise.reject(response.statusText);
    }

    // The response of a fetch() request is a Stream object, which means that when we call the json() method,
    // a Promise is returned since the reading of the stream will happen asynchronously.

    return response.json();
}