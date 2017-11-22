import {pipelineConstants} from '../constants';

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

        /* CREATE */
        case pipelineConstants.CREATE_REQUEST:
            return state;
        case pipelineConstants.CREATE_SUCCESS:
            return {
                items: [ ...state.items, action.pipeline ]
            };
        case pipelineConstants.CREATE_FAILURE:
            return {
                error: action.error
            };

        /* DELETE */
        case pipelineConstants.DELETE_REQUEST:
            return state;
        case pipelineConstants.DELETE_SUCCESS:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.id)
            };
        case pipelineConstants.DELETE_FAILURE:
            return {
                error: action.error
            };

        default:
            return state
    }
}
