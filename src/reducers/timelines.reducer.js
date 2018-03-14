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
                ids: _items.result,
                dataTotalSize: action.data.dataTotalSize

            };
        case timelineConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case timelineConstants.LOAD_MORE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case timelineConstants.LOAD_MORE_SUCCESS:
            const _items3 = normalize(action.data.items, timelineListSchema);

            let newIds = state.ids;

            if (newIds) {
                newIds = newIds.concat(_items3.result);
            } else {
                newIds = _items3.result
            }

            let newItems = state.items;
            if (newItems) {
                _items3.result.forEach(id => {
                    newItems[id] = _items3.entities.timeLines[id];
                });
            } else {
                newItems = _items3.entities.timeLines;
            }

            return {
                ...state,
                items: newItems,
                ids: newIds,
                dataTotalSize: action.data.dataTotalSize

            };
        case timelineConstants.LOAD_MORE_FAILURE:
            return {
                error: action.error
            };
        case timelineConstants.GETALL_REQUEST_REFRESH:
            return {
                ...state,
                loading: true
            };
        case timelineConstants.GETALL_SUCCESS_REFRESH:
            const _items2 = normalize(action.data.items, timelineListSchema);
            return {
                ...state,
                items: _items2.entities.timeLines,
                ids: _items2.result
            };
        case timelineConstants.GETALL_FAILURE_REFRESH:
            return {
                error: action.error
            };
        default:
            return state
    }
}
