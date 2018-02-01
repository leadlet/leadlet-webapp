import {dealConstants} from "../constants/deal.constants";
import {dealService} from "../services/deal.service";
import {alertActions} from "./alert.actions";


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


export function getAllDeals() {
    return dispatch => {
        dispatch(request());

        dealService.getAll()
            .then(
                items => dispatch(success(items)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: dealConstants.GETALL_REQUEST } }
    function success(items) { return { type: dealConstants.GETALL_SUCCESS, items } }
    function failure(error) { return { type: dealConstants.GETALL_FAILURE, error } }

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