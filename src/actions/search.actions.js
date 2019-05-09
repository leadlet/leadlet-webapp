import {searchConstants} from "../constants/search.constants";
import {searchService} from "../services/search.service";

export function appendFilter(group, facetId, appendQuery) {
    return dispatch => {
        dispatch( {type: searchConstants.FACET_APPEND, payload: {"group": group, "id": facetId, "type": "append", "selected": appendQuery}});
    };
}

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

export function getFilterOptions( container, filters, query="") {
    return dispatch => {
        dispatch(request());

        searchService.getFilterOptionsTerms(container, filters, query)
            .then(
                payload => dispatch(success(payload, filters)),
                error => dispatch(failure(error))
            );
    };

    function request() {
        return {type: searchConstants.FILTERS_GETALL_REQUEST}
    }

    function success(payload, filter) {
        return {type: searchConstants.FILTERS_GETALL_SUCCESS, payload, filter, container}
    }

    function failure(error) {
        return {type: searchConstants.FILTERS_GETALL_FAILURE, error}
    }
}

export function pipelineSelected( pipelineFilter ) {
    return dispatch => {
        dispatch( {type: searchConstants.FACET_PIPELINE_SELECTED, payload: pipelineFilter});
    };
}
export function termSelected2(containerId, filterId, term, clear=false) {
    return dispatch => {
        dispatch( {type: searchConstants.FILTER_TERM_SELECTED, payload: {"container": containerId, "filter": filterId, "term": term, clear: clear}});
    };
}
export function termUnSelected2(containerId, filterId, term) {
    return dispatch => {
        dispatch( {type: searchConstants.FILTER_TERM_UNSELECTED, payload: {"container": containerId, "filter": filterId, "term": term}});
    };
}

export function termSelected(filterId, terms, clear=false) {
    return dispatch => {
        dispatch( {type: searchConstants.FACET_TERM_SELECTED, payload: {"facetId": filterId, "terms": terms, clear: clear}});
    };
}
export function termUnSelected(filterId, terms) {
    return dispatch => {
        dispatch( {type: searchConstants.FACET_TERM_UNSELECTED, payload: {"facetId": filterId, "terms": terms}});
    };
}
export function textSearched(facetId, searchText) {
    return dispatch => {
        dispatch( {type: searchConstants.FACET_TEXT_SEARCHED, payload: {"facetId": facetId, "selected": searchText}});
    };
}

export function changeSort(sort) {
    return dispatch => {
        dispatch( {type: searchConstants.SORT_CHANGED, payload: sort});
    };
}

export function registerFilter(filterDefinition) {
    return dispatch => {
        dispatch( {type: searchConstants.REGISTER_FILTER, payload: filterDefinition});
    };
}

export function clearSort(sort) {
    return dispatch => {
        dispatch( {type: searchConstants.SORT_CLEARED, payload: sort});
    };
}

