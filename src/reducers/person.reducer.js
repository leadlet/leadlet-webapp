import {personConstants} from "../constants/person.constants";
import {normalize, schema} from 'normalizr';

const personSchema = new schema.Entity('persons');

// or use shorthand syntax:
const personListSchema = [personSchema];

export function persons(state = {}, action) {
    switch (action.type) {
        /* get by id */
        case personConstants.GET_REQUEST:
            return {
                loading: true
            };
        case personConstants.GET_SUCCESS:
            return {
                ...state,
                viewedPerson: action.person
            };
        case personConstants.GET_FAILURE:
            return {
                error: action.error
            };

        /* ALL personS */
        case personConstants.GETALL_REQUEST:
            return {
                ...state,
                loading: true
            };
        case personConstants.GETALL_SUCCESS:
            const _items = normalize(action.data.items, personListSchema);
            return {
                ...state,
                items: _items.entities.persons,
                ids: _items.result,
                dataTotalSize: action.data.dataTotalSize
            };
        case personConstants.GETALL_FAILURE:
            return {
                error: action.error
            };

        /* NEW person */
        case personConstants.CREATE_REQUEST:
            return state;
        case personConstants.CREATE_SUCCESS:
            let _state = {
                ...state,
                items: {
                    ...state.items,
                    [action.person.id]: action.person
                },
                ids: [ ...state.ids, action.person.id],
                dataTotalSize: state.dataTotalSize + 1
            };

            return _state;

        case personConstants.CREATE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        /* UPDATE person */
        case personConstants.UPDATE_REQUEST:
            return state;
        case personConstants.UPDATE_SUCCESS:
            _state = {
                ...state,
                items: {
                    ...state.items,
                    [action.person.id]: action.person
                }
            };

            return _state;
        case personConstants.UPDATE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        /* DELETE person */
        case personConstants.DELETE_REQUEST:
            return state;
        case personConstants.DELETE_SUCCESS:
            action.ids.forEach(id => {
                delete state.items[id];
            })
            return {
                ...state,
                items: state.items,
                ids: state.ids.filter(id => !action.ids.includes(id)),
                dataTotalSize: state.dataTotalSize - action.ids.length
            };

        default:
            return state
    }
}
