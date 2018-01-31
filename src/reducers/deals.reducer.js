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


        /* UPDATE deal */
        case dealConstants.UPDATE_REQUEST:
            return state;
        case dealConstants.UPDATE_SUCCESS:
            let _state = {
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

        default:
            return state
    }
}
