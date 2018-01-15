import {authHeader} from '../helpers';

export const timelineService = {
    getPaginated
};

function getPaginated(filter, page, size) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/timeLines?filter=${filter}&page=${page}&size=${size}&sort=createdDate,desc`, requestOptions).then(handlePaginationResponse);
}

function handlePaginationResponse(response) {
    if (response.ok !== true) {
        return Promise.reject(response.statusText);
    }

    return Promise.all([response.json(), response.headers.get("x-total-count")]);

}
