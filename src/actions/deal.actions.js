import {dealConstants} from "../constants/deal.constants";
import {dealService} from "../services/deal.service";
import {alertActions} from "./alert.actions";


export function getDealsByStageId(stageId) {
    return dispatch => {
        dispatch(request(stageId));

        dealService.getDealsByStageId(stageId)
            .then(
                deals => {
                    dispatch(success(deals));
                },
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: dealConstants.GET_ALL_REQUEST } }
    function success(payload) { return { type: dealConstants.GET_ALL_SUCCESS, payload } }
    function failure(error) { return { type: dealConstants.GET_ALL_FAILURE, error } }
}

export function getDealsByPersonId(personId) {
    return dispatch => {
        dispatch(request(personId));

        dealService.getDealsByPersonId(personId)
            .then(
                deals => {
                    dispatch(success(deals));
                },
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: dealConstants.GET_ALL_REQUEST } }
    function success(payload) { return { type: dealConstants.GET_ALL_SUCCESS, payload } }
    function failure(error) { return { type: dealConstants.GET_ALL_FAILURE, error } }
}

export function getDealsByOrganizationId(organizationId) {
    return dispatch => {
        dispatch(request(organizationId));

        dealService.getDealsByOrganizationId(organizationId)
            .then(
                deals => {
                    dispatch(success(deals));
                },
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: dealConstants.GET_ALL_REQUEST } }
    function success(payload) { return { type: dealConstants.GET_ALL_SUCCESS, payload } }
    function failure(error) { return { type: dealConstants.GET_ALL_FAILURE, error } }
}

export function getDealById(dealId) {
    return dispatch => {
        dispatch(request(dealId));

        dealService.getDealById(dealId)
            .then(
                payload => {
                    dispatch(success(payload));
                },
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: dealConstants.GET_REQUEST } }
    function success(payload) { return { type: dealConstants.GET_SUCCESS, payload } }
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
                payload => {
                    dispatch(success(payload));
                    dispatch(alertActions.success('Deal successfully updated'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: dealConstants.UPDATE_REQUEST } }
    function success(payload) { return { type: dealConstants.UPDATE_SUCCESS, payload } }
    function failure(error) { return { type: dealConstants.UPDATE_FAILURE, error } }
}

export function moveDeal(moveDealDto) {
    return dispatch => {
        dispatch(request());

        return dealService.move(moveDealDto)
            .then(
                payload => {
                    dispatch(success(payload));
                    dispatch(alertActions.success('Deal successfully updated'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: dealConstants.UPDATE_REQUEST } }
    function success(payload) { return { type: dealConstants.UPDATE_SUCCESS, payload } }
    function failure(error) { return { type: dealConstants.UPDATE_FAILURE, error } }
}



export function createDeal(deal) {
    return dispatch => {
        dispatch(request());

        return dealService.create(deal)
            .then(
                payload => {
                    dispatch(success(payload));
                    dispatch(alertActions.success('Deal successfully created'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: dealConstants.CREATE_REQUEST } }
    function success(payload) { return { type: dealConstants.CREATE_SUCCESS, payload } }
    function failure(error) { return { type: dealConstants.CREATE_FAILURE, error } }
}

export function deleteDeal(id) {
    return dispatch => {
        dispatch(request(id));

        dealService._delete(id)
            .then(
                response => {
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(deal) { return { type: dealConstants.DELETE_REQUEST, deal } }
    function success(payload) { return { type: dealConstants.DELETE_SUCCESS, payload } }
    function failure(id, error) { return { type: dealConstants.DELETE_FAILURE, id, error } }
}