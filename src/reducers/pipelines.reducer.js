import {pipelineConstants} from '../constants';
import {normalize, schema} from 'normalizr';

const pipelineSchema = new schema.Entity('pipelines');

// or use shorthand syntax:
const pipelineListSchema = [pipelineSchema];

export function pipelines(state = {}, action) {
    switch (action.type) {
        /* ALL STAGES */
        case pipelineConstants.GETALL_REQUEST:
            return {
                ...state,
                loading: true
            };
        case pipelineConstants.GETALL_SUCCESS:
            const _items = normalize(action.items, pipelineListSchema);
            return {
                ...state,
                items: _items.entities.pipelines,
                ids: _items.result
            };
        case pipelineConstants.GETALL_FAILURE:
            return {
                error: action.error
            };

        /* NEW STAGE */
        case pipelineConstants.CREATE_REQUEST:
            return state;
        case pipelineConstants.CREATE_SUCCESS:
            let _state = {
                ...state,
                items: {
                    ...state.items,
                    [action.pipeline.id]: action.pipeline
                },
                ids: [ ...state.ids, action.pipeline.id]
            };

            return _state;

        case pipelineConstants.CREATE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        /* UPDATE STAGE */
        case pipelineConstants.UPDATE_REQUEST:
            return state;
        case pipelineConstants.UPDATE_SUCCESS:
            _state = {
                ...state,
                items: {
                    ...state.items,
                    [action.pipeline.id]: action.pipeline
                }
            };

            return _state;
        case pipelineConstants.UPDATE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        /* DELETE STAGE */
        case pipelineConstants.DELETE_REQUEST:
            return state;
        case pipelineConstants.DELETE_SUCCESS:
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