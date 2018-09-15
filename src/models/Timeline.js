import {attr, Model} from "redux-orm";
import {timelineConstants} from "../constants/timeline.constants";

/* Sort */
export class Timeline extends Model {

    static reducer(action, Timeline, session) {
        switch (action.type) {
            case timelineConstants.APPEND_TIMELINES_SUCCESS:
                var timelines = action.payload.timelines;
                timelines.forEach(timeline => Timeline.upsert(timeline));
                break;

            case timelineConstants.LOAD_TIMELINES_SUCCESS:
                var timelines = action.payload.timelines;
                Timeline.delete();
                timelines.forEach(timeline => Timeline.create(timeline));
                break;

        }
        // Return value is ignored.
        return undefined;
    }

}
Timeline.modelName = 'Timeline';

Timeline.fields = {
    id: attr(), // non-relational field for any value; optional but highly recommended
    type: attr(),
    sourceId: attr(),
    source: attr(),
    personId: attr(),
    userId: attr(),
    dealId: attr(),
    createdDate: attr()
};
