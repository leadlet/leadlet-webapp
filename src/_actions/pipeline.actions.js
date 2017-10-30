import {pipelineConstants} from "../_constants/pipeline.constants";
import {pipelineService} from "../_services/pipeline.service";

export function getAll() {
    return dispatch => {
        dispatch(request());


        pipelineService.getAll()
            .then(
                items => dispatch(success(items)),
                error => dispatch(failure(error))
            );

        dispatch(success());

    };

    function request() { return { type: pipelineConstants.GETALL_REQUEST } }
    function success(items) { return { type: pipelineConstants.GETALL_SUCCESS, items } }
    function failure(error) { return { type: pipelineConstants.GETALL_FAILURE, error } }

}

function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        dispatch(success(id));

        /*
        contactService.delete(id)
            .then(
                contact => {
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
            */
    };

    function request(id) { return { type: pipelineConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: pipelineConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: pipelineConstants.DELETE_FAILURE, id, error } }
}