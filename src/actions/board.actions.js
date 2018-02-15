import {boardConstants} from "../constants/board.constants";
import {boardService} from "../services/board.service";

export function loadMoreDeals(stageId, page) {
    return dispatch => {
        dispatch(request(stageId));

        boardService.getDealsByStage(stageId, page)
            .then(
                deal => {
                    dispatch(success(deal));
                },
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: boardConstants.LOAD_MORE_DEALS_REQUEST } }
    function success(deal) { return { type: boardConstants.LOAD_MORE_DEALS_SUCCESS, deal } }
    function failure(error) { return { type: boardConstants.LOAD_MORE_DEALS_FAILURE, error } }
}

export function getBoardByPipelineId(pipelineId) {
    return dispatch => {
        dispatch(request(pipelineId));

        boardService.getBoardByPipelineId(pipelineId)
            .then(
                board => {
                    dispatch(success(board));
                },
                error => dispatch(failure(error))
            );
    };

    function request(pipelineId) { return { type: boardConstants.GET_REQUEST, pipelineId} }
    function success(board) { return { type: boardConstants.GET_SUCCESS, board } }
    function failure(error) { return { type: boardConstants.GET_FAILURE, error } }
}
