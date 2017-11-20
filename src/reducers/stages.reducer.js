import {pipelineConstants} from '../constants';
import {stageConstants} from "../constants/stage.constants";
import {normalize, schema} from 'normalizr';

const stageSchema = new schema.Entity('stages');

// or use shorthand syntax:
const stageListSchema = [stageSchema];


export function stages(state = {}, action) {
    switch (action.type) {
        /* ALL STAGES */
        case stageConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case stageConstants.GETALL_SUCCESS:
            const _items = normalize(action.items, stageListSchema);
            return {
                ...state,
                items: _items.entities.stages,
                ids: _items.result
            };
        case stageConstants.GETALL_FAILURE:
            return {
                error: action.error
            };

        /* NEW STAGE */
        case stageConstants.CREATE_REQUEST:
            return state;
        case stageConstants.CREATE_SUCCESS:
            console.log("test");

            return {
                ...state,
                items: {
                    ...state.items,
                    [action.stage.id]: action.stage
                },
                ids: [ ...state.ids, action.stage.id]
            };
        case stageConstants.CREATE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        /* UPDATE STAGE */
        case stageConstants.UPDATE_REQUEST:
            return state;
        case stageConstants.UPDATE_SUCCESS:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.stage.id]: action.stage
                },
                ids: [ ...state.ids, action.stage.id]
            };
        case stageConstants.UPDATE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        /* DELETE STAGE */
        case stageConstants.DELETE_REQUEST:
            return state;
        case stageConstants.DELETE_SUCCESS:
            delete state.items[action.id];
            return {
                ...state,
                items: state.items,
                ids: state.ids.filter(item => item !== action.id),
            };
        case stageConstants.UPDATE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        default:
            return state
    }
}
