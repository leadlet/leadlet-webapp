import {timelineConstants} from "../constants/timeline.constants";
import {normalize, schema} from 'normalizr';

const timelineSchema = new schema.Entity('timelines');

// or use shorthand syntax:
const timelineListSchema = [timelineSchema];

export function timeLineStore(state = { ids: [], items: {}}, action) {
    switch (action.type) {

        case timelineConstants.APPEND_TIMELINES_SUCCESS:
            var timelines = normalize(action.payload.timelines, timelineListSchema);
            var maxTimelineCount =  action.payload.maxTimelineCount;
            return {
                ...state,
                items:Object.assign (state.items, timelines.entities.activities),
                ids: [
                    ...state.ids,
                    ...timelines.result
                ],
                maxTimelineCount: maxTimelineCount
            };

            break;

        case timelineConstants.LOAD_TIMELINES_SUCCESS:
            var timelines = normalize(action.payload.timelines, timelineListSchema);
            var maxTimelineCount =  action.payload.maxTimelineCount;
            return {
                ...state,
                items: timelines.entities.timelines,
                ids: timelines.result,
                maxTimelineCount: maxTimelineCount
            };
            break;


        default:
            return state
    }
}