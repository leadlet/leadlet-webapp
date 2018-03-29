import {normalize, schema} from 'normalizr';
import {objectiveConstants} from "../constants/objective.constants";

const objectiveSchema = new schema.Entity('objectives');

// or use shorthand syntax:
const objectiveListSchema = [objectiveSchema];

export function objectives(state = {items: {}, ids: []}, action) {
    switch (action.type) {

        /* get by id */
        case objectiveConstants.GET_REQUEST:
            return {
                ...state,
                loading: true
            };

        case objectiveConstants.GET_SUCCESS:
            let _state2 = {
                ...state,
                items: {
                    ...state.items,
                    [action.objective.id]: action.objective
                },
                ids: [...state.ids, action.objective.id]
            };
            return _state2;

        case objectiveConstants.GET_FAILURE:
            return {
                error: action.error
            };

        /* ALL objectiveS */
        case objectiveConstants.GETALL_REQUEST:
            return {
                ...state,
                loading: true
            };

        case objectiveConstants.GETALL_SUCCESS:
            const _items = normalize(action.data.items, objectiveListSchema);
            return {
                ...state,
                items: _items.entities.objectives,
                ids: _items.result,
                dataTotalSize: action.data.dataTotalSize
            };

        case objectiveConstants.GETALL_FAILURE:
            return {
                error: action.error
            };

        /* NEW objective */
        case objectiveConstants.CREATE_REQUEST:
            return state;

        case objectiveConstants.CREATE_SUCCESS:
            let _state = {
                ...state,
                items: {
                    ...state.items,
                    [action.objective.id]: action.objective
                },
                ids: [...state.ids, action.objective.id]
            };
            return _state;

        case objectiveConstants.CREATE_FAILURE:
            return {
                ...state,
                error: action.error
            };

        /* UPDATE objective */
        case objectiveConstants.UPDATE_REQUEST:
            return state;

        case objectiveConstants.UPDATE_SUCCESS:
            _state = {
                ...state,
                items: {
                    ...state.items,
                    [action.objective.id]: action.objective
                }
            };
            return _state;

        case objectiveConstants.UPDATE_FAILURE:
            return {
                ...state,
                error: action.error
            };

        /* DELETE objective */
        case objectiveConstants.DELETE_REQUEST:
            return state;

        case objectiveConstants.DELETE_SUCCESS:
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
