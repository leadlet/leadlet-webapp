import { contactConstants } from '../_constants';

export function organizations(state = {}, action) {
  switch (action.type) {
    case contactConstants.ORGANIZATIONS_GETALL_REQUEST:
      return {
        loading: true
      };
    case contactConstants.ORGANIZATIONS_GETALL_SUCCESS:
      return {
        items: action.contacts
      };
    case contactConstants.ORGANIZATIONS_GETALL_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}