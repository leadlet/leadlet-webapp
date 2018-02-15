import {dealConstants} from "../constants/deal.constants";

/*import {schema} from 'normalizr';

const dealSchema = new schema.Entity('deals');

// or use shorthand syntax:
const dealListSchema = [dealSchema];*/

export function deals(state = {}, action) {
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


        default:
            return state
    }
}
