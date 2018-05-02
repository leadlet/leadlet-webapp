import {accountConstants} from '../constants';

export function account(state = {}, action) {
    switch (action.type) {

        /* get by id */
        case accountConstants.GET_REQUEST:
            return {
                loading: true
            };
        case accountConstants.GET_SUCCESS:
            return {
                ...state,
                current: action.account
            };
        case accountConstants.GET_FAILURE:
            return {
                error: action.error
            };


        /* UPDATE user */
        case accountConstants.UPDATE_REQUEST:
            return state;
        case accountConstants.UPDATE_SUCCESS:
            return {
                ...state,
                current: action.account
            };

        case accountConstants.UPDATE_FAILURE:
            return {
                ...state,
                error: action.error
            };

        default:
            return state
    }
}