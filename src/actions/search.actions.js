import {searchConstants} from "../constants/search.constants";
import {timelineService} from "../services/timeline.service";
import {searchService} from "../services/search.service";

export function getDistincTerms( filter ) {
    return dispatch => {
        dispatch(request());

        searchService.getDistincTerms(filter)
            .then(
                payload => dispatch(success(payload, filter)),
                error => dispatch(failure(error))
            );
    };

    function request() {
        return {type: searchConstants.FACET_GETALL_REQUEST}
    }

    function success(payload, filter) {
        return {type: searchConstants.FACET_GET_SUCCESS, payload, filter}
    }

    function failure(error) {
        return {type: searchConstants.FACET_GETALL_FAILURE, error}
    }
}

export function termSelected(facetId, term) {
    return dispatch => {
        dispatch( {type: searchConstants.FACET_TERM_SELECTED, payload: {"facetId": facetId, "term": term}});
    };
}
export function termUnSelected(facetId, term) {
    return dispatch => {
        dispatch( {type: searchConstants.FACET_TERM_UNSELECTED, payload: {"facetId": facetId, "term": term}});
    };
}

export function registerFilter(filterDefinition) {
    return dispatch => {
        dispatch( {type: searchConstants.REGISTER_FILTER, payload: filterDefinition});
    };
}