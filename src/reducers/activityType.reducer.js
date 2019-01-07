import {normalize, schema} from 'normalizr';
import {activityTypeConstants} from "../constants/activityType.constants";

const activityTypeSchema = new schema.Entity('activityTypes');

// or use shorthand syntax:
const activityTypeListSchema = [activityTypeSchema];

export function activityTypes(state = {items: {}, ids: []}, action) {
    switch (action.type) {
        /* get by id */
        case activityTypeConstants.GET_REQUEST:
            return {

            };
        case activityTypeConstants.GET_SUCCESS:
            return {

            };
        case activityTypeConstants.GET_FAILURE:
            return {

            };

        /* ALL activityTypes */
        case activityTypeConstants.GETALL_REQUEST:
            return {
                ...state
            };
        case activityTypeConstants.GETALL_SUCCESS:
            const _items = normalize(action.payload, activityTypeListSchema);
            return {
                ...state,
                items: _items.entities.activityTypes,
                ids: _items.result
            };
        case activityTypeConstants.GETALL_FAILURE:
            return {
                error: action.error
            };

        /* NEW activityType */
        case activityTypeConstants.CREATE_REQUEST:
            return state;
        case activityTypeConstants.CREATE_SUCCESS:
            let _state = {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.id]: action.payload
                },
                ids: [...state.ids, action.payload.id]
            };

            return _state;

        case activityTypeConstants.CREATE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        /* UPDATE activityType */
        case activityTypeConstants.UPDATE_REQUEST:
            return state;
        case activityTypeConstants.UPDATE_SUCCESS:
            _state = {
                ...state,
                items: {
                    ...state.items,
                    [action.activityType.id]: action.activityType
                }
            };

            return _state;
        case activityTypeConstants.UPDATE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        /* DELETE activityType */
        case activityTypeConstants.DELETE_REQUEST:
            return state;
        case activityTypeConstants.DELETE_SUCCESS:
            delete state.items[action.id];

            return {
                ...state,
                items: state.items,
                ids: state.ids.filter(id => action.id !== id)
            };

        default:
            return state
    }
}
