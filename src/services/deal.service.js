import {authHeader} from '../helpers';
import {buildRequestString} from "../helpers/requestUtils";
import {handlePaginationResponse, handleResponse} from "../helpers/service.utils";

export const dealService = {
    getAllDeals,
    getDealsByFilter,
    getDealById,
    create,
    update,
    _delete,
    patchDeal,
    getAllLostReason
};


function create(stage) {
    const requestOptions = {
        method: 'POST',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify(stage)
    };

    return fetch('/api/deals/', requestOptions).then(handleResponse);
}

function update(stage, modifiedFileds) {
    const requestOptions = {
        method: 'PUT',
        headers: {...authHeader(), 'Content-Type': 'application/json', 'modified-fields': modifiedFileds},
        body: JSON.stringify(stage)
    };

    return fetch('/api/deals/', requestOptions).then(handleResponse);
}

function patchDeal(deal) {
    const requestOptions = {
        method: 'PUT',
        headers: {...authHeader(), 'Content-Type': 'application/json'}
    };

    return fetch(`/api/deals/${deal.id}/stage/${deal.stageId}`, requestOptions).then(handleResponse);
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

function getDealsByFilter(query, sort, page, size=20) {
    const requestOptions = {
        method: 'GET',
        headers: {...authHeader(), 'Content-Type': 'application/json'}
    };

    let requestString = buildRequestString(query, sort, page, size);

    return fetch(`/api/deals?${requestString}`, requestOptions).then(handlePaginationResponse);
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch('/api/deals/' + id, requestOptions).then(handleResponse);
}

function getAllLostReason(filter, page, size) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/lost-reasons?filter=${filter}&page=${page}&size=${size}`, requestOptions).then(handleResponse);
}