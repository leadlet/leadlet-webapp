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

            let newIds = state.ids;

            if (newIds) {
                newIds = newIds.concat(_items.result);
            } else {
                newIds = _items.result
            }

            let newItems = state.items;
            if (newItems) {
                _items.result.forEach(id => {
                    newItems[id] = _items.entities.timeLines[id];
                });
            } else {
                newItems = _items.entities.timeLines;
            }

            return {
                ...state,
                items: newItems,
                ids: newIds,
                dataTotalSize: action.data.dataTotalSize

            };
        case timelineConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}