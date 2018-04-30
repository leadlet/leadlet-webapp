import {dealConstants} from "../constants/deal.constants";
import {normalize, schema} from 'normalizr';

const dealSchema = new schema.Entity('deals');

// or use shorthand syntax:
const dealListSchema = [dealSchema];

export function deals(state = {personDeals: [], organizationDeals: [], personDeals2: []}, action) {
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

            personDeals[action.data.personId] = {ids: [], items: {}};
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

        /* get deals by organization id */
        case dealConstants.GET_REQUEST_FOR_ORGANIZATION:
            return {
                ...state,
                loading: true
            };
        case dealConstants.GET_SUCCESS_FOR_ORGANIZATION:

            let organizationDeals = state.organizationDeals;
            const _itemsOrg = normalize(action.data.items, dealListSchema);

            organizationDeals[action.data.organizationId] = {ids: [], items: {}};
            organizationDeals[action.data.organizationId].ids = _itemsOrg.result;
            organizationDeals[action.data.organizationId].items = _itemsOrg.entities.deals;

            return {
                ...state,
                organizationDeals: organizationDeals
            };
        case dealConstants.GET_FAILURE_FOR_ORGANIZATION:
            return {
                ...state,
                error: action.error
            };

        //create deal
        case dealConstants.CREATE_REQUEST:
            return state;
        case dealConstants.CREATE_SUCCESS:
            let personDeals2 = state.personDeals;
            if (personDeals2[action.deal.person.id] === undefined) {
                personDeals2[action.deal.person.id] = {ids: [], items: {}};
            }

            personDeals2[action.deal.person.id].ids.push(action.deal.id);
            personDeals2[action.deal.person.id].items[action.deal.id] = action.deal;
            return {
                ...state,
                personDeals: personDeals2
            };
        case dealConstants.CREATE_FAILURE:
            return {
                ...state,
                error: action.error
            };


        default:
            return state
    }
}
