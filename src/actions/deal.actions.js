import {dealConstants} from "../constants/deal.constants";
import {dealService} from "../services/deal.service";
import {alertActions} from "./alert.actions";

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

export function getStageDeals(query, sort, stageId, page=0, append=false) {

    return dispatch => {

        dealService.getDealsByFilter(query, sort, page)
            .then(
                response => {
                    dispatch(success(response));
                },
                error => dispatch(failure(error))
            );
    };
    function success(response) {
        const type = append ? dealConstants.APPEND_STAGE_DEALS_SUCCESS : dealConstants.LOAD_STAGE_DEALS_SUCCESS;

        return { type: type, payload: {'stage_id': stageId, 'deals': response[0], 'maxDealCount': response[1]} }
    }
    function failure(error) {
        const type = append ? dealConstants.APPEND_STAGE_DEALS_FAILURE : dealConstants.LOAD_STAGE_DEALS_FAILURE;

        return { type: type, error }
    }
}



export function patchDeal(deal) {
    return dispatch => {
        dispatch(request());

        return dealService.patchDeal(deal)
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

export function updateDeal(deal, modifiedFileds) {
    return dispatch => {
        dispatch(request());

        return dealService.update(deal, modifiedFileds)
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

export function getAllLostReasonByFilterAndReturn(filter, successCallback, failCallback) {
    dealService.getAllLostReason(filter, 0, 20)
        .then(
            response => successCallback(response),
            error => failCallback(error)
        );
}