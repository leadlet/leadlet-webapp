import {activityConstants} from "../constants/activity.constants";
import {normalize, schema} from 'normalizr';

const activitySchema = new schema.Entity('activities');

// or use shorthand syntax:
const activityListSchema = [activitySchema];

export function activity(state = { ids: [], items: {}}, action) {
    switch (action.type) {
        case activityConstants.APPEND_ACTIVITIES_SUCCESS:
            var activityPayload = normalize(action.payload, activityListSchema);

            var maxActivityCount = action.payload.maxActivityCount;
            return {
                ...state,
                maxActivityCount: maxActivityCount,
                items: {
                    ...state.items,
                },
                ids: [
                    ...state.ids,
                    activityPayload.result
                ]

            };

        case activityConstants.LOAD_ACTIVITIES_SUCCESS:
            var maxActivityCount = action.payload.maxActivityCount;
            var activityPayload = normalize(action.payload, activityListSchema);

            return {
                ...state,
                maxActivityCount: maxActivityCount,
                items: activityPayload.entities.activities,
                ids: activityPayload.result
            };

        case activityConstants.CREATE_SUCCESS:
            return  {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.id]: action.payload
                },
                ids: [ ...state.ids, action.payload.id]
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