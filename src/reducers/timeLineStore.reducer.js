import {timelineConstants} from "../constants/timeline.constants";
import {normalize, schema} from 'normalizr';


const timelineSchema = new schema.Entity('timelines');

// or use shorthand syntax:
const timelineListSchema = [timelineSchema];

export function timeLineStore(state = {ids: [], items: {}}, action) {
    let timelines;
    let maxTimelineCount;

    switch (action.type) {
        case timelineConstants.APPEND_TIMELINES_SUCCESS:
            timelines = normalize(action.payload.timelines, timelineListSchema);
            maxTimelineCount = action.payload.maxTimelineCount;
            return {
                ...state,
                items: Object.assign(state.items, timelines.entities.activities),
                ids: [
                    ...state.ids,
                    ...timelines.result
                ],
                maxTimelineCount: maxTimelineCount
            };

        case timelineConstants.LOAD_TIMELINES_SUCCESS:
            timelines = normalize(action.payload.timelines, timelineListSchema);
            maxTimelineCount = action.payload.maxTimelineCount;
            return {
                ...state,
                items: timelines.entities.timelines,
                ids: timelines.result,
                maxTimelineCount: maxTimelineCount
            };

        default:
            return state
    }
}