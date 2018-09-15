import {authHeader} from '../helpers';
import {userActions} from "../actions/user.actions";
import {buildRequestString} from "../helpers/requestUtils";

export const timelineService = {
    getTimelinesByFilter
};

function getTimelinesByFilter(query, sort, page, size) {
    const requestOptions = {
        method: 'GET',
        headers: {...authHeader(), 'Content-Type': 'application/json'}
    };

    let requestString = buildRequestString(query, sort, page, size);

    return fetch(`/api/timeLines?${requestString}`, requestOptions).then(handlePaginationResponse);
}


function handlePaginationResponse(response) {
    if (response.ok !== true) {
        if( response.status === 401 ) {
            userActions.logout();
        }
        return Promise.reject(response.statusText);
    }

    return Promise.all([response.json(), response.headers.get("x-total-count")]);

}
