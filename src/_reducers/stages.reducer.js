import { pipelineConstants } from '../_constants';
import {stageConstants} from "../_constants/stage.constants";

export function stages(state = {}, action) {
  switch (action.type) {
    case stageConstants.GETALL_REQUEST:
        return {
          loading: true
        };
      case stageConstants.GETALL_SUCCESS:
        return {
            items: action.payload
        };
    case stageConstants.GETALL_FAILURE:
        return {
          error: action.error
        };
      
    default:
      return state
  }
}