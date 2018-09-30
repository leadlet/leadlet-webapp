import {normalize, schema} from 'normalizr';
import {stageConstants} from "../constants/stage.constants";
import {dealConstants} from "../constants/deal.constants";

const stageSchema = new schema.Entity('stages');

// or use shorthand syntax:
const stageListSchema = [stageSchema];

export function stageStore(state = {}, action) {
    switch (action.type) {
        case dealConstants.APPEND_STAGE_DEALS_SUCCESS:
        case dealConstants.LOAD_STAGE_DEALS_SUCCESS:

            return {
                ...state,
                items: {
                    ...state.items,
                    [ action.payload.stageId ]: {
                        ...state.items[action.payload.stageId],
                        maxDealCount: action.payload.maxDealCount
                    }
                },
            };

        case stageConstants.GETALL_SUCCESS:
            const stages = normalize(action.payload, stageListSchema);
            return {
                ...state,
                items: stages.entities.stages,
                ids: stages.result
            };
        case stageConstants.CREATE_SUCCESS:
            return  {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.id]: action.payload
                },
                ids: [ ...state.ids, action.payload.id]
            };
        case stageConstants.UPDATE_SUCCESS:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.id]: action.payload
                }
            };
        case stageConstants.DELETE_SUCCESS:

            // TODO
            break;

        default:
            return state
    }
}
