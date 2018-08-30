import {sourceConstants} from "../constants/source.constants";
import {normalize, schema} from 'normalizr';

const sourceSchema = new schema.Entity('sources');

// or use shorthand syntax:
const sourceListSchema = [sourceSchema];

export function sources(state = {}, action) {
    switch (action.type) {
        /* get by id */
        case sourceConstants.GET_REQUEST:
            return {
                loading: true
            };
        case sourceConstants.GET_SUCCESS:
            return {
                ...state,
                viewedSource: action.source
            };
        case sourceConstants.GET_FAILURE:
            return {
                error: action.error
            };

        /* ALL sourceS */
        case sourceConstants.GETALL_REQUEST:
            return {
                ...state,
                loading: true
            };
        case sourceConstants.GETALL_SUCCESS:
            const _items = normalize(action.data.items, sourceListSchema);
            return {
                ...state,
                items: _items.entities.sources,
                ids: _items.result,
                dataTotalSize: action.data.dataTotalSize
            };
        case sourceConstants.GETALL_FAILURE:
            return {
                error: action.error
            };

        /* NEW source */
        case sourceConstants.CREATE_REQUEST:
            return state;
        case sourceConstants.CREATE_SUCCESS:
            let _state = {
                ...state,
                items: {
                    ...state.items,
                    [action.source.id]: action.source
                },
                ids: [ ...state.ids, action.source.id],
                dataTotalSize: state.dataTotalSize + 1
            };

            return _state;

        case sourceConstants.CREATE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        /* UPDATE source */
        case sourceConstants.UPDATE_REQUEST:
            return state;
        case sourceConstants.UPDATE_SUCCESS:
            _state = {
                ...state,
                items: {
                    ...state.items,
                    [action.source.id]: action.source
                }
            };

            return _state;
        case sourceConstants.UPDATE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        /* DELETE source */
        case sourceConstants.DELETE_REQUEST:
            return state;
        case sourceConstants.DELETE_SUCCESS:
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
