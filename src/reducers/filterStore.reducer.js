import {searchConstants} from "../constants/search.constants";
import * as _ from "lodash";

export function filterStore(state = {}, action) {
    let oldSelectedOptions = [];
    let oldSelected;
    let newSelectedOptions;
    let newSelected;

    switch (action.type) {
        case searchConstants.FACET_PIPELINE_SELECTED:
            return Object.assign({}, state, {[action.payload.id]: {
                    id: action.payload.id,
                    group: action.payload.group,
                    selected : {pipeline: action.payload.pipeline}
                }});

        case searchConstants.FACET_CLEAR:
            return _.omit(state, [`${action.payload.facetId}.selected`]);

        case searchConstants.FACET_APPEND:
            return {
                ...state,
                [action.payload.id]: action.payload
            };

        case searchConstants.FACET_GET_SUCCESS:
            var facet = Object.assign(action.payload, action.filter);
            return {
                ...state,
                [facet.id]: facet
            };
        case searchConstants.FACET_TEXT_SEARCHED:
            return {
                ...state,
                [action.payload.facetId]: {
                    ...state[action.payload.facetId],
                    selected: action.payload.selected
                }
            };
        case searchConstants.FACET_TERM_SELECTED:
            oldSelectedOptions = [];
            if( !action.payload.clear){
                oldSelected = state[action.payload.facetId].selected;
                oldSelectedOptions = (oldSelected && oldSelected.options) || [];
            }
            newSelectedOptions = _.concat( oldSelectedOptions, action.payload.terms );

            return {
                ...state,
                [action.payload.facetId]: {
                    ...state[action.payload.facetId],
                    selected: {options: newSelectedOptions}
                }
            };
        case searchConstants.FACET_TERM_UNSELECTED:
            oldSelected = state[action.payload.facetId].selected;
            oldSelectedOptions = (oldSelected && oldSelected.options) || [];

            newSelectedOptions = oldSelectedOptions.filter(item => !action.payload.terms.includes(item));

            return {
                ...state,
                [action.payload.facetId]: {
                    ...state[action.payload.facetId],
                    selected: {options: newSelectedOptions}
                }
            };

        case searchConstants.FACET_RANGE_CHANGED:
            oldSelected = state[action.payload.facetId].selected || {};

            if(action.payload.min){
                oldSelected.min = action.payload.min;
            }
            if(action.payload.max){
                oldSelected.max = action.payload.max;
            }

            newSelected = Object.assign({}, oldSelected);
            return {
                ...state,
                [action.payload.facetId]: {
                    ...state[action.payload.facetId],
                    selected: {options: newSelected}
                }
            };
        case searchConstants.REGISTER_FILTER:
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        default:
            return state;
    }
}
