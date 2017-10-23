import {pipelineConstants} from "../_constants/pipeline.constants";

export function getAllPipes(filter={}) {
    return dispatch => {
        dispatch(request());

        /*
        contactService.getAll(filter + ",type:PERSON")
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error))
            );
            */
        dispatch(success());

    };

    function request() { return { type: pipelineConstants.GETALL_REQUEST } }
    function success(data) { return { type: pipelineConstants.GETALL_SUCCESS } }
    function failure(error) { return { type: pipelineConstants.GETALL_FAILURE, error } }

}
