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

export function moveDeal(deal) {
    return dispatch => {
        dispatch(request());

        return dealService.move(deal)
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

    function request() { return { type: dealConstants.MOVE_REQUEST } }
    function success(deal) { return { type: dealConstants.MOVE_SUCCESS, deal } }
    function failure(error) { return { type: dealConstants.MOVE_FAILURE, error } }
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

export function deleteDeal(id) {
    return dispatch => {
        dispatch(request(id));

        dealService._delete(id)
            .then(
                deal => {
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) { return { type: dealConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: dealConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: dealConstants.DELETE_FAILURE, id, error } }
}