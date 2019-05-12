import {searchConstants} from "../constants/search.constants";
import * as _ from "lodash";

    export function queryStore(state = {}, action) {
    switch (action.type) {
        case searchConstants.FILTER_TERM_SELECTED:
            // https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns#correct-approach-copying-all-levels-of-nested-data
            var container = action.payload.container;
            var filter = action.payload.filter;
            var selectedTerm = action.payload.term;
            var isClear = action.payload.clear;
            var oldSelectedOptions = [];
            if(!isClear){
                oldSelectedOptions = _.get(state, [container, filter,"selectedOptions" ], []);
            }

            return {
                ...state,
                [container] : {
                    ...state[container],
                    [filter] : {
                        selectedOptions : [...oldSelectedOptions, selectedTerm]
                    },
                },
            };
        case searchConstants.FILTER_TERM_UNSELECTED:
            // https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns#correct-approach-copying-all-levels-of-nested-data
            var container = action.payload.container;
            var filter = action.payload.filter;
            var unselectedTerm = action.payload.term;
            var oldSelectedOptions = _.get(state, [container, filter,"selectedOptions" ], []);

            return {
                ...state,
                [container] : {
                    ...state[container],
                    [filter] : {
                        selectedOptions : removeItem(oldSelectedOptions, unselectedTerm)
                    },
                },
            };
        default:
            return state;
    }

    // https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns#inserting-and-removing-items-in-arrays
    function removeItem(array, item) {
        return array.filter((arrayItem, index) => arrayItem !== item)
    }

}
