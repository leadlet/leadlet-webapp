import { contactConstants } from '../_constants';

export function contact(state = {}, action) {
  switch (action.type) {
    case contactConstants.GET_REQUEST:
        return {
            loading: true
        };
    case contactConstants.GET_SUCCESS:
        return {
            item: action.contact
        };
    case contactConstants.GET_FAILURE:
        return {
            error: action.error
        };
    default:
      return state
  }
}