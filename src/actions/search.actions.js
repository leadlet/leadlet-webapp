import {searchConstants} from "../constants/search.constants";
import {searchService} from "../services/search.service";

export function clearFilter(facetId) {
    return dispatch => {
        dispatch( {type: searchConstants.FACET_CLEAR, payload: {"facetId": facetId}});
    };
}

export function rangeChanged(facetId, min, max) {
    return dispatch => {
        dispatch( {type: searchConstants.FACET_RANGE_CHANGED, payload: {"facetId": facetId, "min": min, "max": max}});
    };
}

export function getFieldRange( filter, query="") {
    return dispatch => {
        dispatch(request());

        searchService.getFieldRange(filter, query)
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

export function getDistinctTerms( filter, query="" ) {
    return dispatch => {
        dispatch(request());

        searchService.getDistinctTerms(filter, query)
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

export function pipelineSelected( pipelineFilter ) {
    return dispatch => {
        dispatch( {type: searchConstants.FACET_PIPELINE_SELECTED, payload: pipelineFilter});
    };
}

export function termSelected(facetId, terms, clear=false) {
    return dispatch => {
        dispatch( {type: searchConstants.FACET_TERM_SELECTED, payload: {"facetId": facetId, "terms": terms, clear: clear}});
    };
}
export function termUnSelected(facetId, terms) {
    return dispatch => {
        dispatch( {type: searchConstants.FACET_TERM_UNSELECTED, payload: {"facetId": facetId, "terms": terms}});
    };
}

export function registerFilter(filterDefinition) {
    return dispatch => {
        dispatch( {type: searchConstants.REGISTER_FILTER, payload: filterDefinition});
    };
}

export function changeSort(sort) {
    return dispatch => {
        dispatch( {type: searchConstants.SORT_CHANGED, payload: sort});
    };
}


export function clearSort(sort) {
    return dispatch => {
        dispatch( {type: searchConstants.SORT_CLEARED, payload: sort});
    };
}

