import {searchConstants} from "../constants/search.constants";
import * as _ from "lodash";

export function filterStore(state = {}, action) {
    switch (action.type) {

        case searchConstants.FILTERS_GETALL_SUCCESS:
            let fetchedFilters = _.keyBy(action.payload, o => o.id);

            return {
                ...state,
                [action.container] : {
                    ...state[action.container],
                    ...fetchedFilters,
                },
            };
        default:
            return state;
    }
}
