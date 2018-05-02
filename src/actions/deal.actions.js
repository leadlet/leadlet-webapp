import {dealConstants} from "../constants/deal.constants";
import {dealService} from "../services/deal.service";
import {alertActions} from "./alert.actions";

export function getDealsByPersonId(personId) {
    return dispatch => {
        dispatch(request(personId));

        dealService.getDealsByPersonId(personId)
            .then(
                deals => {
                    dispatch(success({ personId, 'items': deals}));
                },
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: dealConstants.GET_REQUEST_FOR_PERSON } }
    function success(data) { return { type: dealConstants.GET_SUCCESS_FOR_PERSON, data } }
    function failure(error) { return { type: dealConstants.GET_FAILURE_FOR_PERSON, error } }
}

export function getDealsByOrganizationId(organizationId) {
    return dispatch => {
        dispatch(request(organizationId));

        dealService.getDealsByOrganizationId(organizationId)
            .then(
                deals => {
                    dispatch(success({ organizationId, 'items': deals}));
                },
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: dealConstants.GET_REQUEST_FOR_ORGANIZATION } }
    function success(data) { return { type: dealConstants.GET_SUCCESS_FOR_ORGANIZATION, data } }
    function failure(error) { return { type: dealConstants.GET_FAILURE_FOR_ORGANIZATION, error } }
}

export function getDealById(dealId) {
    return dispatch => {
        dispatch(request(dealId));

        dealService.getDealById(dealId)
            .then(
                deal => {
                    dispatch(success(deal));
                },
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: dealConstants.GET_REQUEST } }
    function success(deal) { return { type: dealConstants.GET_SUCCESS, deal } }
    function failure(error) { return { type: dealConstants.GET_FAILURE, error } }
}

export function getAllDealByFilterAndReturn(filter, successCallback, failCallback) {
    dealService.getAllDeals(filter, 0, 20)
        .then(
            response => successCallback(response[0]),
            error => failCallback(error)
        );
}

export function updateDeal(deal) {
    return dispatch => {
        dispatch(request());

        return dealService.update(deal)
            .then(
                deal => {
                    dispatch(success(deal));
                    dispatch(alertActions.success('Deal successfully updated'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: dealConstants.UPDATE_REQUEST } }
    function success(deal) { return { type: dealConstants.UPDATE_SUCCESS, deal } }
    function failure(error) { return { type: dealConstants.UPDATE_FAILURE, error } }
}

export function moveDeal(moveDealDto) {
    return dispatch => {
        dispatch(request());

        return dealService.move(moveDealDto)
            .then(
                deal => {
                    dispatch(success(deal));
                    dispatch(alertActions.success('Deal successfully updated'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: dealConstants.UPDATE_REQUEST } }
    function success(deal) { return { type: dealConstants.UPDATE_SUCCESS, deal } }
    function failure(error) { return { type: dealConstants.UPDATE_FAILURE, error } }
}



export function createDeal(deal) {
    return dispatch => {
        dispatch(request());

        return dealService.create(deal)
            .then(
                deal => {
                    dispatch(success(deal));
                    dispatch(alertActions.success('Deal successfully created'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: dealConstants.CREATE_REQUEST } }
    function success(deal) { return { type: dealConstants.CREATE_SUCCESS, deal } }
    function failure(error) { return { type: dealConstants.CREATE_FAILURE, error } }
}

export function deleteDeal(deal) {
    return dispatch => {
        dispatch(request(deal));

        dealService._delete(deal.id)
            .then(
                response => {
                    dispatch(success(deal));
                },
                error => {
                    dispatch(failure(deal, error));
                }
            );
    };

    function request(deal) { return { type: dealConstants.DELETE_REQUEST, deal } }
    function success(deal) { return { type: dealConstants.DELETE_SUCCESS, deal } }
    function failure(deal, error) { return { type: dealConstants.DELETE_FAILURE, deal, error } }
}