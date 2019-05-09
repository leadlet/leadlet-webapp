import {authHeader} from '../helpers';
import { handleResponse} from "../helpers/service.utils";

export const searchService = {
    getFilterOptionsTerms,
    getDistinctTerms,
    getFieldRange
};

function getFilterOptionsTerms(id, filters, query) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(filters)
    };

    return fetch(`/api/filters/${id}?q=${query}`, requestOptions).then(handleResponse);
}

function getDistinctTerms(filter, query) {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    };

    return fetch(`/api/facets/terms/${filter.id}/${filter.index}?q=${query}&field=${filter.dataField}`, requestOptions).then(handleResponse);
}

function getFieldRange(filter, query) {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    };

    return fetch(`/api/facets/range/${filter.id}/${filter.index}?q=${query}&field=${filter.dataField}`, requestOptions).then(handleResponse);
}
