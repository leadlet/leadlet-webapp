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
        case userConstants.DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                items: state.items.map(user =>
                    user.id === action.id
                        ? {...user, deleting: true}
                        : user
                )
            };

        /* UPDATE user */
        case userConstants.UPDATE_REQUEST:
            return state;
        case userConstants.UPDATE_SUCCESS:
            let _state = {
                ...state,
                items: {
                    ...state.items,
                    [action.user.id]: action.user
                }
            };

            return _state;
        case userConstants.UPDATE_FAILURE:
            return {
                ...state,
                error: action.error
            };

        case userConstants.DELETE_SUCCESS:
            // remove deleted user from state
            return {
                items: state.items.filter(user => user.id !== action.id)
            };
        case userConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user
            return {
                ...state,
                items: state.items.map(user => {
                    if (user.id === action.id) {
                        // make copy of user without 'deleting:true' property
                        const {deleting, ...userCopy} = user;
                        // return copy of user with 'deleteError:[error]' property
                        return {...userCopy, deleteError: action.error};
                    }

                    return user;
                })
            };
        default:
            return state
    }
}