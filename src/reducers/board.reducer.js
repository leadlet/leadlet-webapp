import {boardConstants} from "../constants/board.constants";
import {normalize, schema} from 'normalizr';
import {dealConstants} from "../constants/deal.constants";

// Define a users schema
const pipeline = new schema.Entity('pipeline');

// Define your comments schema
const dealList = new schema.Entity('dealList');

// Define your comments schema
const stages = new schema.Entity('stages', {
    dealList: [dealList]
});

// Define your article
const board = new schema.Object({
    pipeline: pipeline,
    stages: [stages]
});

export function boards(state = {}, action) {
    switch (action.type) {
        case dealConstants.UPDATE_REQUEST:
            return state;
        case dealConstants.UPDATE_SUCCESS:
            if (state[action.deal.pipelineId]) {
                let _state = state;

                let _newDeal = action.deal;

                let _oldDeal = _state[_newDeal.pipelineId].entities.dealList[_newDeal.id];
                let pipelineId = _newDeal.pipelineId;
                let oldStageId = _oldDeal.stageId;
                let newStageId = _newDeal.stageId;


                if (oldStageId !== newStageId) {
                    // remove from old stageList
                    _state[pipelineId].entities.stages[oldStageId].dealList
                        = _state[pipelineId].entities.stages[oldStageId].dealList.filter(id => id !== _oldDeal.id);

                    // add to new list
                    _state[pipelineId].entities.stages[newStageId].dealList.push(_newDeal.id);

                    if(_newDeal.dealValue && _newDeal.dealValue.potentialValue){
                        _state[pipelineId].entities.stages[newStageId].dealTotalPotential += _newDeal.dealValue.potentialValue;
                        _state[pipelineId].entities.stages[oldStageId].dealTotalPotential -= _newDeal.dealValue.potentialValue;

                    }

                }

                // update deal
                _state[pipelineId].entities.dealList[_newDeal.id] = _newDeal;

                // sort list
                _state[pipelineId].entities.stages[newStageId].dealList.sort((firstId, secondId) => {
                    return _state[pipelineId].entities.dealList[firstId].priority -
                        _state[pipelineId].entities.dealList[secondId].priority;
                });

                return _state;
            }

            return state;
        case dealConstants.UPDATE_FAILURE:
            return state;

        case boardConstants.LOAD_MORE_DEALS_REQUEST:
            return state;
        case boardConstants.LOAD_MORE_DEALS_SUCCESS:
            return state;
        case boardConstants.LOAD_MORE_DEALS_FAILURE:
            return state;

        /* ALL dealS */
        case boardConstants.GET_REQUEST:

            return {
                ...state,
                [action.pipelineId]: {
                    loading: true
                }
            };
        case boardConstants.GET_SUCCESS:
            const _normalized = normalize(action.board, board);
            let _board = {};

            _board.ids = _normalized.result;
            _board.entities = _normalized.entities;

            return {
                ...state,
                [_board.ids.pipeline]: _board
            };
        case boardConstants.GET_FAILURE:
            return state;

        /* NEW deal */
        case dealConstants.CREATE_REQUEST:
            return state;
        case dealConstants.CREATE_SUCCESS:
            if (state[action.deal.pipelineId]) {
                let _state = state;

                let _newDeal = action.deal;

                let pipelineId = _newDeal.pipelineId;
                let newStageId = _newDeal.stageId;


                _state[pipelineId].entities.stages[newStageId].dealList.push(_newDeal.id);

                if(_newDeal.dealValue && _newDeal.dealValue.potentialValue){
                    _state[pipelineId].entities.stages[newStageId].dealTotalPotential += _newDeal.dealValue.potentialValue;
                }

                // update deal
                _state[pipelineId].entities.dealList[_newDeal.id] = _newDeal;

                // sort list
                _state[pipelineId].entities.stages[newStageId].dealList.sort((firstId, secondId) => {
                    return _state[pipelineId].entities.dealList[firstId].priority -
                        _state[pipelineId].entities.dealList[secondId].priority;
                });

                return _state;
            }

            return state;

        case dealConstants.CREATE_FAILURE:
            return state;

        /* NEW deal */
        case dealConstants.DELETE_REQUEST:
            return state;
        case dealConstants.DELETE_SUCCESS:
            let _state = state;
            delete _state[action.deal.pipelineId].entities.dealList[action.deal.id];
            _state[action.deal.pipelineId].entities.stages[action.deal.stageId].dealList = _state[action.deal.pipelineId].entities.stages[action.deal.stageId].dealList.filter(id => id !== action.deal.id);

            return _state;
        case dealConstants.DELETE_FAILURE:
            return state;

        default:
            return state
    }
}
