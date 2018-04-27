import { alertActions } from './';
import {accountConstants} from "../constants/account.constants";
import {accountService} from "../services/account.service";


export function getAccount() {
    return dispatch => {
        dispatch(request());

        accountService.getCurrentAccount()
            .then(
                account => dispatch(success(account)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: accountConstants.GET_REQUEST } }
    function success(account) { return { type: accountConstants.GET_SUCCESS, account } }
    function failure(error) { return { type: accountConstants.GET_FAILURE, error } }
}


export function updateAccount(account) {
    return dispatch => {
        dispatch(request(account));

        accountService.update(account)
            .then(
                account => {
                    dispatch(success(account));
                    dispatch(alertActions.success('Account update successful'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(account) { return { type: accountConstants.UPDATE_REQUEST, account } }
    function success(account) { return { type: accountConstants.UPDATE_SUCCESS, account } }
    function failure(error) { return { type: accountConstants.UPDATE_FAILURE, error } }
}