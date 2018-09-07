import {attr, Model} from "redux-orm";
import {activityConstants} from "../constants/activity.constants";

/* Activity */
export class Activity extends Model {

    static reducer(action, Activity, session) {
        switch (action.type) {
            case activityConstants.APPEND_ACTIVITIES_SUCCESS:
                var activities = action.payload.activities;
                var maxActivityCount = action.payload.maxActivityCount;
                activities.forEach(activity => Activity.upsert(activity));
                break;

            case activityConstants.LOAD_ACTIVITIES_SUCCESS:
                var activities = action.payload.activities;
                var maxActivityCount = action.payload.maxActivityCount;
                Activity.all().delete();
                activities.forEach(activity => Activity.create(activity));
                break;
            case activityConstants.CREATE_SUCCESS:
                Activity.create(action.payload);
                break;
            case activityConstants.UPDATE_SUCCESS:
                Activity.withId(action.payload.id).update(action.payload);
                break;
            case activityConstants.DELETE_SUCCESS:
                Activity.withId(action.payload).delete();
                break;
        }
        // Return value is ignored.
        return undefined;
    }

}
Activity.modelName = 'Activity';

Activity.fields = {
    id: attr(), // non-relational field for any value; optional but highly recommended
    title: attr(),
    memo: attr(),
    start: attr(),
    end: attr(),
    done: attr(),
    closedDate: attr(),
    location: attr()
    //, stages: many('Stage')
};
