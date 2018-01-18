import {organizationConstants} from "../constants/organization.constants";
import {normalize, schema} from 'normalizr';

const organizationSchema = new schema.Entity('organizations');

// or use shorthand syntax:
const organizationListSchema = [organizationSchema];

export function organizations(state = {}, action) {
    switch (action.type) {
        /* get by id */
        case organizationConstants.GET_REQUEST:
            return {
                loading: true
            };
        case organizationConstants.GET_SUCCESS:
            return {
                ...state,
                viewedOrganization: action.organization
            };
        case organizationConstants.GET_FAILURE:
            return {
                error: action.error
            };

        /* ALL organizationS */
        case organizationConstants.GETALL_REQUEST:
            return {
                ...state,
                loading: true
            };
        case organizationConstants.GETALL_SUCCESS:
            const _items = normalize(action.data.items, organizationListSchema);
            return {
                ...state,
                items: _items.entities.organizations,
                ids: _items.result,
                dataTotalSize: action.data.dataTotalSize
            };
        case organizationConstants.GETALL_FAILURE:
            return {
                error: action.error
            };

        /* NEW organization */
        case organizationConstants.CREATE_REQUEST:
            return state;
        case organizationConstants.CREATE_SUCCESS:
            let _state = {
                ...state,
                items: {
                    ...state.items,
                    [action.organization.id]: action.organization
                },
                ids: [ ...state.ids, action.organization.id]
            };

            return _state;

        case organizationConstants.CREATE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        /* UPDATE organization */
        case organizationConstants.UPDATE_REQUEST:
            return state;
        case organizationConstants.UPDATE_SUCCESS:
            _state = {
                ...state,
                items: {
                    ...state.items,
                    [action.organization.id]: action.organization
                }
            };

            return _state;
        case organizationConstants.UPDATE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        /* DELETE organization */
        case organizationConstants.DELETE_REQUEST:
            return state;
        case organizationConstants.DELETE_SUCCESS:
            action.ids.forEach(id => {
                delete state.items[id];
            })
            return {
                ...state,
                items: state.items,
                ids: state.ids.filter(id => !action.ids.includes(id)),
            };

        default:
            return state
    }
}
