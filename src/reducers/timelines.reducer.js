import {timelineConstants} from "../constants/timeline.constants";
import {normalize, schema} from 'normalizr';

const timeLineSchema = new schema.Entity('timeLines');

// or use shorthand syntax:
const timelineListSchema = [timeLineSchema];

export function timeLines(state = { items: {}, ids: []}, action) {
    switch (action.type) {
        /* ALL timelineS */
        case timelineConstants.RESET_TIMELINES:
            return { items: [], ids: []};
        case timelineConstants.GETALL_REQUEST:
            return {
                ...state,
                loading: true
            };
        case timelineConstants.GETALL_SUCCESS:
            const _items = normalize(action.data.items, timelineListSchema);

            return {
                ...state,
                items: { ...state.items, ..._items.entities.timeLines},
                ids: [ ...new Set([...state.ids, ..._items.result]) ],
                dataTotalSize: action.data.dataTotalSize

            };
        case timelineConstants.GETALL_FAILURE:
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
