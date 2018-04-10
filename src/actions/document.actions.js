import {alertActions} from "./alert.actions";
import {documentService} from "../services/document.service";
import {documentConstants} from "../constants/document.constants";

export function getByDocumentId(documentId) {
    return dispatch => {
        dispatch(request(documentId));

        documentService.getByDocumentId(documentId)
            .then(
                document => dispatch(success(document)),
                error => dispatch(failure(error))
            );
    };

    function request() {
        return {type: documentConstants.GET_REQUEST}
    }

    function success(document) {
        return {type: documentConstants.GET_SUCCESS, document}
    }

    function failure(error) {
        return {type: documentConstants.GET_FAILURE, error}
    }
}

export function getDocumentByDealId(id) {
    return dispatch => {
        dispatch(request());

        documentService.getByDealId(id)
            .then(
                response => dispatch(success({items: response[0], dataTotalSize: response[1]})),
                error => dispatch(failure(error))
            );

    };

    function request() {
        return {type: documentConstants.GETALL_REQUEST}
    }

    function success(data) {
        return {type: documentConstants.GETALL_SUCCESS, data}
    }

    function failure(error) {
        return {type: documentConstants.GETALL_FAILURE, error}
    }
}

export function getDocumentByPersonId(id) {
    return dispatch => {
        dispatch(request());

        documentService.getByPersonId(id)
            .then(
                response => dispatch(success({items: response[0], dataTotalSize: parseInt(response[1])})),
                error => dispatch(failure(error))
            );

    };

    function request() {
        return {type: documentConstants.GETALL_REQUEST}
    }

    function success(data) {
        return {type: documentConstants.GETALL_SUCCESS, data}
    }

    function failure(error) {
        return {type: documentConstants.GETALL_FAILURE, error}
    }
}

export function getDocumentByOrganizationId(id) {
    return dispatch => {
        dispatch(request());

        documentService.getByOrganizationId(id)
            .then(
                response => dispatch(success({items: response[0], dataTotalSize: response[1]})),
                error => dispatch(failure(error))
            );

    };

    function request() {
        return {type: documentConstants.GETALL_REQUEST}
    }

    function success(data) {
        return {type: documentConstants.GETALL_SUCCESS, data}
    }

    function failure(error) {
        return {type: documentConstants.GETALL_FAILURE, error}
    }
}

export function getAllDocuments() {
    return dispatch => {
        dispatch(request());

        documentService.getAllDocuments()
            .then(
                response => dispatch(success({items: response[0], dataTotalSize: response[1]})),
                error => dispatch(failure(error))
            );
    };

    function request() {
        return {type: documentConstants.GETALL_REQUEST}
    }

    function success(data) {
        return {type: documentConstants.GETALL_SUCCESS, data}
    }

    function failure(error) {
        return {type: documentConstants.GETALL_FAILURE, error}
    }
}
export function uploadDocuments(files, personId, successCallback) {
    return dispatch => {
        dispatch(request());

        return documentService.uploadDocuments(files,personId)
            .then(
                document => {
                    dispatch(successCallback);
                    dispatch(success(document));
                    dispatch(alertActions.success('Document create successful'));
                },
                error => {
                    // TODO catch validation error here and throw submission error
                    // throw new SubmissionError({name: 'hedeler' , title: 'hedeler2', _error: 'olmadi'});
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() {
        return {type: documentConstants.CREATE_REQUEST}
    }

    function success(document) {
        return {type: documentConstants.CREATE_SUCCESS, document}
    }

    function failure(error) {
        return {type: documentConstants.CREATE_FAILURE, error}
    }
}

export function uploadDocumentsForOrganization(files, organizationId, successCallback) {
    return dispatch => {
        dispatch(request());

        return documentService.uploadDocumentsForOrganization(files,organizationId)
            .then(
                document => {
                    dispatch(successCallback);
                    dispatch(success(document));
                    dispatch(alertActions.success('Document create successful'));
                },
                error => {
                    // TODO catch validation error here and throw submission error
                    // throw new SubmissionError({name: 'hedeler' , title: 'hedeler2', _error: 'olmadi'});
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() {
        return {type: documentConstants.CREATE_REQUEST}
    }

    function success(document) {
        return {type: documentConstants.CREATE_SUCCESS, document}
    }

    function failure(error) {
        return {type: documentConstants.CREATE_FAILURE, error}
    }
}

export function createDocument(document) {
    return dispatch => {
        dispatch(request());

        return documentService.createDocument(document)
            .then(
                document => {
                    dispatch(success(document));
                    dispatch(alertActions.success('Document create successful'));
                },
                error => {
                    // TODO catch validation error here and throw submission error
                    // throw new SubmissionError({name: 'hedeler' , title: 'hedeler2', _error: 'olmadi'});
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() {
        return {type: documentConstants.CREATE_REQUEST}
    }

    function success(document) {
        return {type: documentConstants.CREATE_SUCCESS, document}
    }

    function failure(error) {
        return {type: documentConstants.CREATE_FAILURE, error}
    }
}

export function updateDocument(document) {
    return dispatch => {
        dispatch(request());

        return documentService.updateDocument(document)
            .then(
                document => {
                    dispatch(success(document));
                    dispatch(alertActions.success('Document update successful'));
                },
                error => {
                    // TODO catch validation error here and throw submission error
                    // throw new SubmissionError({name: 'hedeler' , title: 'hedeler2', _error: 'olmadi'});
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() {
        return {type: documentConstants.UPDATE_REQUEST}
    }

    function success(document) {
        return {type: documentConstants.UPDATE_SUCCESS, document}
    }

    function failure(error) {
        return {type: documentConstants.UPDATE_FAILURE, error}
    }
}

export function deleteDocument(id) {
    return dispatch => {
        dispatch(request(id));

        documentService.deleteDocument(id)
            .then(
                document => {
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) {
        return {type: documentConstants.DELETE_REQUEST, id}
    }

    function success(id) {
        return {type: documentConstants.DELETE_SUCCESS, id}
    }

    function failure(id, error) {
        return {type: documentConstants.DELETE_FAILURE, id, error}
    }
}