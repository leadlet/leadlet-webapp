import {timelineConstants} from "../constants/timeline.constants";
import {normalize, schema} from 'normalizr';

const timeLineSchema = new schema.Entity('timeLines');

// or use shorthand syntax:
const timelineListSchema = [timeLineSchema];

export function timeLines(state = {}, action) {
    switch (action.type) {
        /* ALL timelineS */
        case timelineConstants.GETALL_REQUEST:
            return {
                ...state,
                loading: true
            };
        case timelineConstants.GETALL_SUCCESS:
            const _items = normalize(action.data.items, timelineListSchema);
            return {
                ...state,
                items: _items.entities.timeLines,
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
