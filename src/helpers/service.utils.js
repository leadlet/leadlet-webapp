import * as userActions from "../actions/user.actions";

export function handleResponse(response) {
    if (response.ok !== true) {
        if( response.status === 401 ){
            userActions.logout();
        }
        return Promise.reject(response.statusText);
    }

    // The response of a fetch() request is a Stream object, which means that when we call the json() method,
    // a Promise is returned since the reading of the stream will happen asynchronously.

    return response.json();
}

export function handlePaginationResponse(response) {
    if (response.ok !== true) {
        if( response.status === 401 ) {
            userActions.logout();
        }
        return Promise.reject(response.statusText);
    }

    return Promise.all([response.json(), response.headers.get("x-total-count")]);

}