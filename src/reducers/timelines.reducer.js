import {timelineConstants} from "../constants/timeline.constants";

export function timelines(state = { ids: [], items: {}}, action) {
    switch (action.type) {
        case timelineConstants.APPEND_TIMELINES_SUCCESS:
            var maxTimelineCount = action.payload.maxTimelineCount;
            return {
                ...state,
                maxTimelineCount: maxTimelineCount
            };

        case timelineConstants.LOAD_TIMELINES_SUCCESS:
            var maxTimelineCount = action.payload.maxTimelineCount;
            return {
                ...state,
                maxTimelineCount: maxTimelineCount
            };


        default:
            return state
    }
}