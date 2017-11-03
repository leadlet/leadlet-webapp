import { pipelineConstants } from '../constants';
import {stageConstants} from "../constants/stage.constants";
import { normalize, schema } from 'normalizr';

const stageSchema = new schema.Entity('stages');

// or use shorthand syntax:
const stageListSchema = [ stageSchema ];


export function stages(state = {}, action) {
  switch (action.type) {
    case stageConstants.GETALL_REQUEST:
        return {
          loading: true
        };
      case stageConstants.GETALL_SUCCESS:
          const _items =  normalize(action.items,stageListSchema);
          const stageList = _items.entities.stages;
        return {
            ...state,
            stageList
        };
    case stageConstants.GETALL_FAILURE:
        return {
          error: action.error
        };
      
    default:
      return state
  }
}