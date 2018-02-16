import {userConstants} from '../constants';
import {normalize, schema} from 'normalizr';

const userSchema = new schema.Entity('users');

// or use shorthand syntax:
const userListSchema = [userSchema];

export function users(state = {}, action) {
    switch (action.type) {
        case userConstants.GETALL_REQUEST:
            return {
                ...state,
                loading: true
            };
        case userConstants.GETALL_SUCCESS:
            const _items = normalize(action.users, userListSchema);
            return {
                ...state,
                items: _items.entities.users,
                ids: _items.result
            };
        case userConstants.GETALL_FAILURE:
            return {
                error: action.error
            };

        /* NEW user */
        case userConstants.CREATE_REQUEST:
            return state;
        case userConstants.CREATE_SUCCESS:
            let _state = {
                ...state,
                items: {
                    ...state.items,
                    [action.user.id]: action.user
                },
                ids: [...state.ids, action.user.id]
            };

            return _state;

        case userConstants.CREATE_FAILURE:
            return {
                ...state,
                error: action.error
            };

        /* UPDATE user */
        case userConstants.UPDATE_REQUEST:
            return state;
        case userConstants.UPDATE_SUCCESS:
            let update_state = {
                ...state,
                items: {
                    ...state.items,
                    [action.user.id]: action.user
                }
            };

            return update_state;

        case userConstants.UPDATE_FAILURE:
            return {
                ...state,
                error: action.error
            };

        /* DELETE user */
        case userConstants.DELETE_REQUEST:
            return state;
        case userConstants.DELETE_SUCCESS:
            delete state.items[action.id];
            return {
                ...state,
                items: state.items,
                ids: state.ids.filter(item => item !== action.id),
            };

        default:
            return state
    }
}