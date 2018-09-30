import {normalize, schema} from 'normalizr';
import {pipelineConstants} from "../constants/pipeline.constants";

const pipelineSchema = new schema.Entity('pipelines');

// or use shorthand syntax:
const pipelineListSchema = [pipelineSchema];

export function pipelineStore(state = {}, action) {
    switch (action.type) {
        case pipelineConstants.GETALL_SUCCESS:
            const pipelines = normalize(action.payload, pipelineListSchema);
            return {
                ...state,
                items: pipelines.entities.pipelines,
                ids: pipelines.result
            };

        case pipelineConstants.CREATE_SUCCESS:
            return  {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.id]: action.payload
                },
                ids: [...new Set([...state.ids, action.payload.id])]
            };

        case pipelineConstants.UPDATE_SUCCESS:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.id]: action.payload
                }
            };

        case pipelineConstants.DELETE_SUCCESS:

            // TODO
            break;
        default:
            return state
    }
}
