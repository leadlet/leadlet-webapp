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
                items : [ ...state.items, action.payload]
            };
        default:
            return state
    }
}