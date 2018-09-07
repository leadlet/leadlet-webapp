import {activityConstants} from "../constants/activity.constants";
import {normalize, schema} from 'normalizr';

const activitySchema = new schema.Entity('activities');

// or use shorthand syntax:
const activityListSchema = [activitySchema];

export function activities(state = { ids: [], items: {}}, action) {
    switch (action.type) {
        case activityConstants.APPEND_ACTIVITIES_SUCCESS:
            var maxActivityCount = action.payload.maxActivityCount;
            return {
                ...state,
                maxActivityCount: maxActivityCount
            };

        case activityConstants.LOAD_ACTIVITIES_SUCCESS:
            var maxActivityCount = action.payload.maxActivityCount;
            return {
                ...state,
                maxActivityCount: maxActivityCount
            };


        default:
            return state
    }
}