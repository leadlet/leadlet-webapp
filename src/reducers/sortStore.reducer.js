import {searchConstants} from "../constants/search.constants";

export function sortStore(state = {}, action) {

    switch (action.type) {
        case searchConstants.SORT_CHANGED:
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        case searchConstants.SORT_CLEARED:
            let newState = delete state[action.payload.id];
            return newState;
        default:
            return state
    }
}
