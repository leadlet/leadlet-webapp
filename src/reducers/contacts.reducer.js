import { contactConstants } from '../constants';

export function contacts(state = { persons: { total: 0}, organizations: { total: 0}}, action) {
  switch (action.type) {
      case contactConstants.ORGANIZATIONS_GETALL_REQUEST:
      return {
          ...state,
        organizations : {
            loading: true
        }
      };
    case contactConstants.ORGANIZATIONS_GETALL_SUCCESS:
      return {
          ...state,
          organizations : {
              items: action.data[0],
              total: action.data[1]
          }
      };
    case contactConstants.ORGANIZATIONS_GETALL_FAILURE:
      return {
          ...state,
          organizations : {
              error: action.error
          }
      };

    case contactConstants.PERSONS_GETALL_REQUEST:
        return {
            ...state,
            persons : {
                loading: true
            }
        };
    case contactConstants.PERSONS_GETALL_SUCCESS:
        return {
            ...state,
            persons : {
                items: action.data[0],
                total: action.data[1]
            }
        };
    case contactConstants.PERSONS_GETALL_FAILURE:
        return {
            ...state,
            persons : {
                error: action.error
            }
        };
      case contactConstants.CREATE_REQUEST:
        return {
            ...state,
            newContact: {
                loading: true
            }
        };
      case contactConstants.CREATE_SUCCESS:
        // TODO check here
        const newState = { ...state };
        newState.persons.items.push(action.data[0]);
        newState.persons.total++;
        return newState;
    case contactConstants.CREATE_FAILURE:
        return {
            ...state,
            newContact: {
                error: action.error
            }
        };
    default:
      return state
  }
}