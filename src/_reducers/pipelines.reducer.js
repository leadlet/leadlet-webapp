import { pipelineConstants } from '../_constants';
import {stageConstants} from "../_constants/stage.constants";

export function pipelines(state = {}, action) {
  switch (action.type) {
    case pipelineConstants.GETALL_REQUEST:
        return {
          loading: true
        };
      case pipelineConstants.GETALL_SUCCESS:
        return {
            items: action.items
        };
    case pipelineConstants.GETALL_FAILURE:
        return {
          error: action.error
        };

    default:
      return state
  }
}