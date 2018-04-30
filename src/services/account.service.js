import { authHeader } from '../helpers';
import {userActions} from "../actions/user.actions";

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

    let data = new FormData();

    if( account.storagePreference.gsKeyFile ){
        data.append("gsKeyFile", account.storagePreference.gsKeyFile, account.storagePreference.gsKeyFile.name);
        delete account.storagePreference.gsKeyFile;

    }
    data.append("account", new Blob([JSON.stringify(account)],{
        type: "application/json"
    }));


    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader()},
        body: data
    };

    return fetch('/api/account', requestOptions).then(handleResponse);

}

function update2(account) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(account)
    };

    return fetch('/api/account', requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (response.ok !== true) {
        if( response.status === 401 ){
            userActions.logout();
        }
        return Promise.reject(response.statusText);
    }

    return response.json();
}