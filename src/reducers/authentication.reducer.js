
//let user = JSON.parse(localStorage.getItem('jwt_token'));
//const initialState = user ? { loggedIn: true, user } : {};

import {userConstants} from "../constants/user.constants";
//loggedIn: true,
//    user: action.user


export function authentication(state = {id: 'hede'}, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                level: 'success',
                message: "test"
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                level: 'error',
                message: "test2"
            };
        case userConstants.LOGIN_FAILURE:
            return state;
        default:
            return state;
    }
}