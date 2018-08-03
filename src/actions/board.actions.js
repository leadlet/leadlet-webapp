import {boardConstants} from "../constants/board.constants";
import {stageConstants} from "../constants/stage.constants";
import {boardService} from "../services/board.service";
import {stageService} from "../services/stage.service";
import {dealConstants} from "../constants/deal.constants";
import {dealService} from "../services/deal.service";


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

        return stageService.getAll()
            .then(
                stages => {
                        dispatch(successStages(stages));
                        stages.forEach(stage =>
                            dealService.getDealsByStageId(stage.id)
                                .then(
                                    deals => {
                                        dispatch(successDeals(deals));
                                    },
                                    error => dispatch(failureDeals(error))
                                )
                        )
                    },
                error => dispatch(failureStages(error))
            );

    };

    function successStages(payload) {
        return { type: stageConstants.GETALL_SUCCESS, payload }
    }

    function failureStages(error) {
        return { type: stageConstants.GETALL_FAILURE, error }
    }

    function successDeals(payload) { return { type: dealConstants.GET_ALL_SUCCESS, payload } }
    function failureDeals(error) { return { type: dealConstants.GET_ALL_FAILURE, error } }


}
