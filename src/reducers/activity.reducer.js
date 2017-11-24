import React from 'react';
import {activityConstants} from "../constants/activity.constants";

export function activity(state = {}, action) {
    switch (action.type) {
        case activityConstants.ACTIVITY_GETALL_SUCCESS:
            return {
                items: action.events
            }
        case activityConstants.ACTIVITY_CREATE_SUCCESS:
            return {
                items: [...state.items, action.payload]
            };
        case activityConstants.UPDATE_SUCCESS:
            let _state = state;

            _state.items.map((activity) => {
                if (activity.title === action.payload.title) {
                    activity.description = action.payload.description;
                    activity.start = action.payload.start;
                }
            });

            return _state;

        case activityConstants.DELETE_SUCCESS:

            let _items = state.items.filter((activity) => {

                return activity.title !== action.payload
            });

            return {
                ...state,
                items: _items
            };

        default:
            return state
    }
}