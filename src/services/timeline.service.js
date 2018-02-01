import {authHeader} from '../helpers';
import {userActions} from "../actions/user.actions";

export const timelineService = {
    getPaginated,
    getByPersonId,
    getByOrganizationId,
    getByDealId
};

function getByDealId(filter, page, size, dealId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/timeLines/deal/${dealId}?filter=${filter}&page=${page}&size=${size}&sort=createdDate,desc`, requestOptions).then(handlePaginationResponse);
}

function getByPersonId(filter, page, size, personId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/timeLines/person/${personId}?filter=${filter}&page=${page}&size=${size}&sort=createdDate,desc`, requestOptions).then(handlePaginationResponse);
}

function getByOrganizationId(filter, page, size, organizationId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/timeLines/organization/${organizationId}?filter=${filter}&page=${page}&size=${size}&sort=createdDate,desc`, requestOptions).then(handlePaginationResponse);
}


function getPaginated(filter, page, size) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/timeLines?filter=${filter}&page=${page}&size=${size}&sort=createdDate,desc`, requestOptions).then(handlePaginationResponse);
}

function handlePaginationResponse(response) {
    if (response.ok !== true) {
        if( response.status === 404 ) {
            userActions.logout();
        }
        return Promise.reject(response.statusText);
    }

    return Promise.all([response.json(), response.headers.get("x-total-count")]);

}
