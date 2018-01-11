import {timelineConstants} from "../constants/timeline.constants";
import {normalize, schema} from 'normalizr';

const timelineSchema = new schema.Entity('timelines');

// or use shorthand syntax:
const timelineListSchema = [timelineSchema];

export function timelines(state = {}, action) {
    switch (action.type) {
        /* ALL timelineS */
        case timelineConstants.GETALL_REQUEST:
            return {
                ...state,
                loading: true
            };
        case timelineConstants.GETALL_SUCCESS:
            const _items = normalize(action.items, timelineListSchema);
            return {
                ...state,
                items: _items.entities.timelines,
                ids: _items.result
            };
        case timelineConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}
