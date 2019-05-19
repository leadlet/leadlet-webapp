import {authHeader} from '../helpers';
import { handleResponse} from "../helpers/service.utils";

export const searchService = {
    getFilterOptionsTerms,
};

function getFilterOptionsTerms(id, filters, query) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(filters)
    };

    return fetch(`/api/filters/${id}?q=${query}`, requestOptions).then(handleResponse);
}
