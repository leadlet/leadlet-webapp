import {authHeader} from '../helpers';
import { handleResponse} from "../helpers/service.utils";

export const searchService = {
    getDistinctTerms,
    getFieldRange
};

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
