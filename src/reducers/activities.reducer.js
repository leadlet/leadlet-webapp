import React from 'react';
import {activityConstants} from "../constants/activity.constants";
import {normalize, schema} from 'normalizr';

const activitySchema = new schema.Entity('activities');

// or use shorthand syntax:
const activityListSchema = [activitySchema];

export function activities(state = {}, action) {
    switch (action.type) {
        /* ALL activities */
        case activityConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case activityConstants.GETALL_SUCCESS:
            const _items = normalize(action.items, activityListSchema);
            return {
                ...state,
                items: _items.entities.activities,
                ids: _items.result
            };
        case activityConstants.GETALL_FAILURE:
            return {
                error: action.error
            };

        /* NEW activity */
        case activityConstants.CREATE_REQUEST:
            return state;
        case activityConstants.CREATE_SUCCESS:
            let _state = {
                ...state,
                items: {
                    ...state.items,
                    [action.activity.id]: action.activity
                },
                ids: [ ...state.ids, action.activity.id]
            };

            return _state;

        case activityConstants.CREATE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        /* UPDATE activity */
        case activityConstants.UPDATE_REQUEST:
            return state;
        case activityConstants.UPDATE_SUCCESS:
            _state = {
                ...state,
                items: {
                    ...state.items,
                    [action.activity.id]: action.activity
                }
            };

            return _state;
        case activityConstants.UPDATE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        /* DELETE activity */
        case activityConstants.DELETE_REQUEST:
            return state;
        case activityConstants.DELETE_SUCCESS:
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