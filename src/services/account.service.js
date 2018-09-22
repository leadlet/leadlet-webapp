import { authHeader } from '../helpers';
import {handleResponse} from "../helpers/service.utils";

export const accountService = {
    getCurrentAccount,
    update
};

function getCurrentAccount() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/api/account', requestOptions).then(handleResponse);
}

function update(account) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(account)
    };

    return fetch('/api/account', requestOptions).then(handleResponse);
}
