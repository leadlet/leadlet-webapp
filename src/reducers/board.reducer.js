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
    stages: [ stages ]
});

export function boards(state = {}, action) {
    switch (action.type) {
        case dealConstants.MOVE_REQUEST:
            return state;
        case dealConstants.MOVE_SUCCESS:
            return state;
        case dealConstants.MOVE_FAILURE:
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
                [action.pipelineId] : {
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
                [_board.ids.pipeline] : _board
            };
        case boardConstants.GET_FAILURE:
            return state;

        default:
            return state
    }
}
