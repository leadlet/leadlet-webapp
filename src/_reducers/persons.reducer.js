import { contactConstants } from '../_constants';

export function persons(state = {}, action) {
  switch (action.type) {
    case contactConstants.PERSONS_GETALL_REQUEST:
      return {
        loading: true
      };
    case contactConstants.PERSONS_GETALL_SUCCESS:
      return {
        items: action.contacts
      };
    case contactConstants.PERSONS_GETALL_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}