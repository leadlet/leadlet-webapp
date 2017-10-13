import {contactConstants} from "../_constants/contact.constants";
import {contactService} from "../_services/contact.service";

export const contactActions = {
    getAll
};

function getAll() {
    return dispatch => {
        dispatch(request());

        contactService.getAll()
            .then(
                contacts => dispatch(success(contacts)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: contactConstants.GETALL_REQUEST } }
    function success(contacts) { return { type: contactConstants.GETALL_SUCCESS, contacts } }
    function failure(error) { return { type: contactConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        contactService.delete(id)
            .then(
                contact => {
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) { return { type: contactConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: contactConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: contactConstants.DELETE_FAILURE, id, error } }
}