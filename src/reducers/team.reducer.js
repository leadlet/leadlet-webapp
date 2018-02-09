import {normalize, schema} from 'normalizr';
import {teamConstants} from "../constants/team.constants";

const teamSchema = new schema.Entity('teams');

// or use shorthand syntax:
const teamListSchema = [teamSchema];

export function teams(state = {}, action) {
    switch (action.type) {
        /* get by id */
        case teamConstants.GET_REQUEST:
            return {
                loading: true
            };
        case teamConstants.GET_SUCCESS:
            return {
                ...state,
                viewedTeam: action.team
            };
        case teamConstants.GET_FAILURE:
            return {
                error: action.error
            };

        /* ALL teamS */
        case teamConstants.GETALL_REQUEST:
            return {
                ...state,
                loading: true
            };
        case teamConstants.GETALL_SUCCESS:
            const _items = normalize(action.data.items, teamListSchema);
            return {
                ...state,
                items: _items.entities.teams,
                ids: _items.result,
                dataTotalSize: action.data.dataTotalSize
            };
        case teamConstants.GETALL_FAILURE:
            return {
                error: action.error
            };

        /* NEW team */
        case teamConstants.CREATE_REQUEST:
            return state;
        case teamConstants.CREATE_SUCCESS:
            let _state = {
                ...state,
                items: {
                    ...state.items,
                    [action.team.id]: action.team
                },
                ids: [...state.ids, action.team.id]
            };

            return _state;

        case teamConstants.CREATE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        /* UPDATE team */
        case teamConstants.UPDATE_REQUEST:
            return state;
        case teamConstants.UPDATE_SUCCESS:
            _state = {
                ...state,
                items: {
                    ...state.items,
                    [action.team.id]: action.team
                }
            };

            return _state;
        case teamConstants.UPDATE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        /* DELETE team */
        case teamConstants.DELETE_REQUEST:
            return state;
        case teamConstants.DELETE_SUCCESS:
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
