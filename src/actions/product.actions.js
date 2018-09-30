import {productService} from "../services/product.service";

/*
export function getProductById(productId) {
    return dispatch => {
        dispatch(request(productId));

        productService.getProductById(productId)
            .then(
                product => dispatch(success(product)),
                error => dispatch(failure(error))
            );
    };

    function request() {
        return {type: productConstants.GET_REQUEST}
    }

    function success(product) {
        return {type: productConstants.GET_SUCCESS, product}
    }

    function failure(error) {
        return {type: productConstants.GET_FAILURE, error}
    }
}

export function getAllProducts(filter, page, size) {
    return dispatch => {
        dispatch(request());

        productService.getAllProducts(filter, page, size)
            .then(
                response => dispatch(success({items: response[0], dataTotalSize: response[1]})),
                error => dispatch(failure(error))
            );
    };

    function request() {
        return {type: productConstants.GETALL_REQUEST}
    }

    function success(data) {
        return {type: productConstants.GETALL_SUCCESS, data}
    }

    function failure(error) {
        return {type: productConstants.GETALL_FAILURE, error}
    }
}

export function createProduct(product, successCallback) {
    return dispatch => {
        dispatch(request());

        return productService.createProduct(product)
            .then(
                product => {
                    dispatch(successCallback);
                    dispatch(success(product));
                    dispatch(alertActions.success('Product create successful'));
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
        return {type: productConstants.CREATE_REQUEST}
    }

    function success(product) {
        return {type: productConstants.CREATE_SUCCESS, product}
    }

    function failure(error) {
        return {type: productConstants.CREATE_FAILURE, error}
    }
}

export function updateProduct(product, successCallback) {
    return dispatch => {
        dispatch(request());

        return productService.updateProduct(product)
            .then(
                product => {
                    dispatch(success(product));
                    dispatch(alertActions.success('Product update successful'));
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
        return {type: productConstants.UPDATE_REQUEST}
    }

    function success(product) {
        return {type: productConstants.UPDATE_SUCCESS, product}
    }

    function failure(error) {
        return {type: productConstants.UPDATE_FAILURE, error}
    }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _deleteProduct(id) {
    return dispatch => {
        dispatch(request(id));

        productService._deleteProduct(id)
            .then(
                product => {
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) {
        return {type: productConstants.DELETE_REQUEST, id}
    }

    function success(id) {
        return {type: productConstants.DELETE_SUCCESS, id}
    }

    function failure(id, error) {
        return {type: productConstants.DELETE_FAILURE, id, error}
    }
}
*/
export function getAllProductByFilterAndReturn(filter, successCallback, failCallback) {
    productService.getAllProducts(filter, 0, 20)
        .then(
            response => successCallback(response),
            error => failCallback(error)
        );
}