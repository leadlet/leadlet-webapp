import {normalize, schema} from 'normalizr';
import {documentConstants} from "../constants/document.constants";

const documentSchema = new schema.Entity('documents');

// or use shorthand syntax:
const documentListSchema = [documentSchema];

export function documents(state = {items: {}, ids: []}, action) {
    switch (action.type) {
        /* get by id */
        case documentConstants.GET_REQUEST:
            return {
                ...state,
                loading: true
            };
        case documentConstants.GET_SUCCESS:
            let _state2 = {
                ...state,
                items: {
                    ...state.items,
                    [action.document.id]: action.document
                },
                ids: [...state.ids, action.document.id]
            };

            return _state2;
        case documentConstants.GET_FAILURE:
            return {
                error: action.error
            };

        /* ALL documents */
        case documentConstants.GETALL_REQUEST:
            return {
                ...state,
                loading: true
            };
        case documentConstants.GETALL_SUCCESS:
            const _items = normalize(action.data.items, documentListSchema);
            return {
                ...state,
                items: _items.entities.documents,
                ids: _items.result,
                dataTotalSize: action.data.dataTotalSize
            };
        case documentConstants.GETALL_FAILURE:
            return {
                error: action.error
            };

        /* NEW document */
        case documentConstants.CREATE_REQUEST:
            return state;
        case documentConstants.CREATE_SUCCESS:
            let _state = {
                ...state,
                items: {
                    ...state.items,
                    [action.document.id]: action.document
                },
                ids: [...state.ids, action.document.id]
            };

            return _state;

        case documentConstants.CREATE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        /* UPDATE document */
        case documentConstants.UPDATE_REQUEST:
            return state;
        case documentConstants.UPDATE_SUCCESS:
            _state = {
                ...state,
                items: {
                    ...state.items,
                    [action.document.id]: action.document
                }
            };

            return _state;
        case documentConstants.UPDATE_FAILURE:
            return {
                ...state,
                error: action.error
            };

        /* DELETE document */
        case documentConstants.DELETE_REQUEST:
            return state;
        case documentConstants.DELETE_SUCCESS:
            delete state.items[action.id];
            return {
                ...state,
                items: state.items,
                ids: state.ids.filter(item => item !== action.id),
            };
        default:
            return state
    }
}
