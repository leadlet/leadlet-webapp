import { contactConstants } from '../_constants';

export function contacts(state = {}, action) {
  switch (action.type) {
    case contactConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case contactConstants.GETALL_SUCCESS:
      return {
        items: action.contacts
      };
    case contactConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}