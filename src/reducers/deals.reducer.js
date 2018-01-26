import {dealConstants} from "../constants/deal.constants";
import {normalize, schema} from 'normalizr';

const dealSchema = new schema.Entity('deals');

// or use shorthand syntax:
const dealListSchema = [dealSchema];

export function deals(state = {}, action) {
    switch (action.type) {
        /* get by id */
        case dealConstants.GET_REQUEST:
            return {
                loading: true
            };
        case dealConstants.GET_SUCCESS:
            return {
                ...state,
                viewedDeal: action.deal
            };
        case dealConstants.GET_FAILURE:
            return {
                error: action.error
            };

        /* ALL dealS */
        case dealConstants.GETALL_REQUEST:
            return {
                ...state,
                loading: true
            };
        case dealConstants.GETALL_SUCCESS:
            const _items = normalize(action.items, dealListSchema);
            return {
                ...state,
                items: _items.entities.deals,
                ids: _items.result
            };
        case dealConstants.GETALL_FAILURE:
            return {
                error: action.error
            };

        /* NEW deal */
        case dealConstants.CREATE_REQUEST:
            return state;
        case dealConstants.CREATE_SUCCESS:
            let _state = {
                ...state,
                items: {
                    ...state.items,
                    [action.deal.id]: action.deal
                },
                ids: [ ...state.ids, action.deal.id]
            };

            return _state;

        case dealConstants.CREATE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        /* UPDATE deal */
        case dealConstants.UPDATE_REQUEST:
            return state;
        case dealConstants.UPDATE_SUCCESS:
            _state = {
                ...state,
                items: {
                    ...state.items,
                    [action.deal.id]: action.deal
                }
            };

            return _state;
        case dealConstants.UPDATE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        /* DELETE deal */
        case dealConstants.DELETE_REQUEST:
            return state;
        case dealConstants.DELETE_SUCCESS:
            delete state.items[action.id];
            return {
                ...state,
                items: state.items,
                ids: state.ids.filter(item => item !== action.id),
            };

        default:
            return state
    }
}
