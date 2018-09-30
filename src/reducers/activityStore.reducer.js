import {activityConstants} from "../constants/activity.constants";
import {normalize, schema} from 'normalizr';

const activitySchema = new schema.Entity('activities');
const activityListSchema = [activitySchema];

export function activityStore(state = {ids: [], items: {}}, action) {
    let activities;
    let maxActivityCount;
    switch (action.type) {
        case activityConstants.APPEND_ACTIVITIES_SUCCESS:
            activities = normalize(action.payload.activities, activityListSchema);
            maxActivityCount = action.payload.maxActivityCount;
            return {
                ...state,
                items: Object.assign(state.items, activities.entities.activities),
                ids: [...new Set([...state.ids, ...activities.result])],
                maxActivityCount: maxActivityCount
            };

        case activityConstants.LOAD_ACTIVITIES_SUCCESS:
            activities = normalize(action.payload.activities, activityListSchema);
            maxActivityCount = action.payload.maxActivityCount;
            return {
                ...state,
                items: activities.entities.activities,
                ids: activities.result,
                maxActivityCount: maxActivityCount
            };

        case activityConstants.CREATE_SUCCESS:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.id]: action.payload
                },
                ids: [...new Set([...state.ids, action.payload.id])],
            };

        case activityConstants.UPDATE_SUCCESS:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.id]: action.payload
                }
            };

        case activityConstants.DELETE_SUCCESS:
            break;
        default:
            return state
    }
}