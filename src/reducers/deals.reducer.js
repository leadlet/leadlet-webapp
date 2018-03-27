import {dealConstants} from "../constants/deal.constants";
import {normalize, schema} from 'normalizr';

const dealSchema = new schema.Entity('deals');

// or use shorthand syntax:
const dealListSchema = [dealSchema];

export function deals(state = {personDeals: []}, action) {
    switch (action.type) {
        case dealConstants.UPDATE_REQUEST:
            return state;
        case dealConstants.UPDATE_SUCCESS:
            return {
                ...state,
                viewedDeal: action.deal

            };
        case dealConstants.UPDATE_FAILURE:
            return state;

        /* get by id */
        case dealConstants.GET_REQUEST:
            return {
                ...state,
                loading: true
            };
        case dealConstants.GET_SUCCESS:
            return {
                ...state,
                viewedDeal: action.deal
            };
        case dealConstants.GET_FAILURE:
            return {
                ...state,
                error: action.error
            };
        /* get deals by person id */
        case dealConstants.GET_REQUEST_FOR_PERSON:
            return {
                ...state,
                loading: true
            };
        case dealConstants.GET_SUCCESS_FOR_PERSON:

            let personDeals = state.personDeals;
            const _items = normalize(action.data.items, dealListSchema);

            personDeals[action.data.personId] = {};
            personDeals[action.data.personId].ids = _items.result;
            personDeals[action.data.personId].items = _items.entities.deals;

            return {
                ...state,
                personDeals: personDeals
            };
        case dealConstants.GET_FAILURE_FOR_PERSON:
            return {
                ...state,

                error: action.error
            };
        default:
            return state
    }
}
