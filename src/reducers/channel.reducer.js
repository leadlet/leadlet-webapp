import {channelConstants} from "../constants/channel.constants";
import {normalize, schema} from 'normalizr';

const channelSchema = new schema.Entity('channels');

// or use shorthand syntax:
const channelListSchema = [channelSchema];

export function channels(state = {}, action) {
    switch (action.type) {
        /* get by id */
        case channelConstants.GET_REQUEST:
            return {
                loading: true
            };
        case channelConstants.GET_SUCCESS:
            return {
                ...state,
                viewedChannel: action.channel
            };
        case channelConstants.GET_FAILURE:
            return {
                error: action.error
            };

        /* ALL channelS */
        case channelConstants.GETALL_REQUEST:
            return {
                ...state
            };
        case channelConstants.GETALL_SUCCESS:
            const _items = normalize(action.data, channelListSchema);
            return {
                ...state,
                items: _items.entities.channels,
                ids: _items.result,
                dataTotalSize: action.data.dataTotalSize
            };
        case channelConstants.GETALL_FAILURE:
            return {
                error: action.error
            };

        /* NEW channel */
        case channelConstants.CREATE_REQUEST:
            return state;
        case channelConstants.CREATE_SUCCESS:
            let _state = {
                ...state,
                items: {
                    ...state.items,
                    [action.channel.id]: action.channel
                },
                ids: [ ...state.ids, action.channel.id],
                dataTotalSize: state.dataTotalSize + 1
            };

            return _state;

        case channelConstants.CREATE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        /* UPDATE channel */
        case channelConstants.UPDATE_REQUEST:
            return state;
        case channelConstants.UPDATE_SUCCESS:
            _state = {
                ...state,
                items: {
                    ...state.items,
                    [action.channel.id]: action.channel
                }
            };

            return _state;
        case channelConstants.UPDATE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        /* DELETE channel */
        case channelConstants.DELETE_REQUEST:
            return state;
        case channelConstants.DELETE_SUCCESS:
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
