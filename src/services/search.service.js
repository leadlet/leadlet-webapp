import {authHeader} from '../helpers';
import {userActions} from "../actions/user.actions";

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
