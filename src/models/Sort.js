import {attr, Model} from "redux-orm";
import {activityConstants} from "../constants/activity.constants";
import {searchConstants} from "../constants/search.constants";

/* Sort */
export class Sort extends Model {

    static reducer(action, Sort, session) {
        switch (action.type) {
            case searchConstants.SORT_CHANGED:
                var sort = action.payload;
                Sort.upsert(sort);
                break;

        }
        // Return value is ignored.
        return undefined;
    }

}
Sort.modelName = 'Sort';

Sort.fields = {
    id: attr(), // non-relational field for any value; optional but highly recommended
    field: attr(),
    order: attr()
};
