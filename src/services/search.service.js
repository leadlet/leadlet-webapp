import {authHeader} from '../helpers';
import {userActions} from "../actions/user.actions";

export const searchService = {
    getDistinctTerms,
    getFieldRange
};

function getDistinctTerms(reqBody) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody)
    };

    return fetch('/api/facets/', requestOptions).then(handleResponse);
}

function getFieldRange(filterDefinition) {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }
    };

    return fetch(`/api/facets/range/${filterDefinition.id}/${filterDefinition.dataField}`, requestOptions).then(handleResponse);
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
