import {activityConstants} from "../constants/activity.constants";

export function createActivity(message) {
    return{
        type: activityConstants.ACTIVITY_CREATE_SUCCESS,
        payload: message
    }
}