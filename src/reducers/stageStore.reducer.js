import {normalize, schema} from 'normalizr';
import {pipelineConstants} from "../constants/pipeline.constants";
import {stageConstants} from "../constants/stage.constants";

const stageSchema = new schema.Entity('stages');

// or use shorthand syntax:
const stageListSchema = [stageSchema];

export function stageStore(state = {}, action) {
    switch (action.type) {
        case stageConstants.GETALL_SUCCESS:
            const stages = normalize(action.payload, stageListSchema);
            return {
                ...state,
                items: stages.entities.stages,
                ids: stages.result
            };

            break;
        case stageConstants.CREATE_SUCCESS:
            return  {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.id]: action.payload
                },
                ids: [ ...state.ids, action.payload.id]
            };
            break;
        case stageConstants.UPDATE_SUCCESS:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.id]: action.payload
                }
            };
            break;
        case stageConstants.DELETE_SUCCESS:

            // TODO

        default:
            return state
    }
}
