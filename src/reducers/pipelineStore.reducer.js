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

            const id = action.payload;
            delete state.items[id];
            return {
                ...state,
                items: state.items,
                ids: state.ids.filter(stateId => stateId!==id),
            };
            break;

        default:
            return state
    }
}
