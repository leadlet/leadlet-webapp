import {contactConstants} from "../constants/contact.constants";
import {normalize, schema} from 'normalizr';

const contactSchema = new schema.Entity('contacts');

// or use shorthand syntax:
const contactListSchema = [contactSchema];

export function contacts(state = {}, action) {
    switch (action.type) {
        /* get by id */
        case contactConstants.GET_REQUEST:
            return {
                loading: true
            };
        case contactConstants.GET_SUCCESS:
            return {
                ...state,
                viewedContact: action.contact
            };
        case contactConstants.GET_FAILURE:
            return {
                error: action.error
            };

        /* ALL contactS */
        case contactConstants.GETALL_REQUEST:
            return {
                ...state,
                loading: true
            };
        case contactConstants.GETALL_SUCCESS:
            const _items = normalize(action.data.items, contactListSchema);
            return {
                ...state,
                items: _items.entities.contacts,
                ids: _items.result,
                dataTotalSize: action.data.dataTotalSize
            };
        case contactConstants.GETALL_FAILURE:
            return {
                error: action.error
            };

        /* NEW contact */
        case contactConstants.CREATE_REQUEST:
            return state;
        case contactConstants.CREATE_SUCCESS:
            let _state = {
                ...state,
                items: {
                    ...state.items,
                    [action.contact.id]: action.contact
                },
                ids: [action.contact.id, ...state.ids],
                dataTotalSize: state.dataTotalSize + 1
            };

            return _state;

        case contactConstants.CREATE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        /* UPDATE contact */
        case contactConstants.UPDATE_REQUEST:
            return state;
        case contactConstants.UPDATE_SUCCESS:
            _state = {
                ...state,
                items: {
                    ...state.items,
                    [action.contact.id]: action.contact
                }
            };

            return _state;
        case contactConstants.UPDATE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        /* DELETE contact */
        case contactConstants.DELETE_REQUEST:
            return state;
        case contactConstants.DELETE_SUCCESS:
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
