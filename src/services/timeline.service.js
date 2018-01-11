import {authHeader} from '../helpers';

export const timelineService = {
    getAll
};

function getAll(filter, page, size) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/timelines?filter=${filter}&page=${page}&size=${size}`, requestOptions).then(handlePaginationResponse);
}

function handlePaginationResponse(response) {
    if (response.ok !== true) {
        return Promise.reject(response.statusText);
    }

    return Promise.all([response.json(), response.headers.get("x-total-count")]);

}
