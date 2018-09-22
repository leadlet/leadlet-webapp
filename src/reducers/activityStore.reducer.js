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
                ids: [
                    ...state.ids,
                    ...activities.result
                ],
                maxActivityCount: maxActivityCount
            };

            break;

        case activityConstants.LOAD_ACTIVITIES_SUCCESS:
            activities = normalize(action.payload.activities, activityListSchema);
            maxActivityCount = action.payload.maxActivityCount;
            return {
                ...state,
                items: activities.entities.activities,
                ids: activities.result,
                maxActivityCount: maxActivityCount
            };
            break;

        case activityConstants.CREATE_SUCCESS:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.id]: action.payload
                },
                ids: [...state.ids, action.payload.id]
            };
            break;
        case activityConstants.UPDATE_SUCCESS:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.id]: action.payload
                }
            };
            break;

        case activityConstants.DELETE_SUCCESS:

        default:
            return state
    }
}