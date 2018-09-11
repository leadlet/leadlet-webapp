import {authHeader} from '../helpers';
import {userActions} from "../actions/user.actions";

export const dealService = {
    getAllDeals,
    getDealsByFilter,
    getDealById,
    create,
    update,
    _delete,
    getDealsByPersonId,
    getDealsByOrganizationId,
    patchDeal,
    getAllLostReason
};


function getDealsByPersonId(personId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/api/deals/person/' + personId, requestOptions).then(handleResponse);
}

function getDealsByOrganizationId(organizationId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/api/deals/organization/' + organizationId, requestOptions).then(handleResponse);
}

function create(stage) {
    const requestOptions = {
        method: 'POST',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify(stage)
    };

    return fetch('/api/deals/', requestOptions).then(handleResponse);
}

function update(stage) {
    const requestOptions = {
        method: 'PUT',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify(stage)
    };

    return fetch('/api/deals/', requestOptions).then(handleResponse);
}

function patchDeal(deal) {
    const requestOptions = {
        method: 'PUT',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify(deal)
    };

    return fetch(`/api/deals/${deal.id}/partial?priority=${deal.priority}&stageId=${deal.stageId}`, requestOptions).then(handleResponse);
}

function getDealById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/api/deals/' + id, requestOptions).then(handleResponse);
}

function getAllDeals(filter, page, size) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/deals?filter=${filter}&page=${page}&size=${size}`, requestOptions).then(handlePaginationResponse);
}

function getDealsByFilter(query, sort, page) {
    const requestOptions = {
        method: 'GET',
        headers: {...authHeader(), 'Content-Type': 'application/json'}
    };

    let params = [];

    if (query !== undefined && query !== "") {
        params.push(`q=${query}`);
    }
    if (page !== undefined && page !== "") {
        params.push(`page=${page}`);
    }
    params.push(`size=12`);

    if (sort !== undefined && sort !== "") {
        params.push(sort);
    }

    let paramString = params.join("&");


    return fetch(`/api/deals/search?${paramString}`, requestOptions).then(handlePaginationResponse);
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch('/api/deals/' + id, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (response.ok !== true) {
        if (response.status === 401) {
            userActions.logout();
        }
        return Promise.reject(response.statusText);
    }

    // The response of a fetch() request is a Stream object, which means that when we call the json() method,
    // a Promise is returned since the reading of the stream will happen asynchronously.

    return response.json();
}

function handlePaginationResponse(response) {
    if (response.ok !== true) {
        if (response.status === 401) {
            userActions.logout();
        }
        return Promise.reject(response.statusText);
    }

    return Promise.all([response.json(), response.headers.get("x-total-count")]);

}

function getAllLostReason(filter, page, size) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/lost-reasons?filter=${filter}&page=${page}&size=${size}`, requestOptions).then(handleResponse);
}