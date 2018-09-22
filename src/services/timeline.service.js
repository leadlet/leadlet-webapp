import {authHeader} from '../helpers';
import {handlePaginationResponse} from "../helpers/service.utils";
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
