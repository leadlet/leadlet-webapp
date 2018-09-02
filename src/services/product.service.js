import { authHeader } from '../helpers';
import {userActions} from "../actions/user.actions";

export const productService = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    _deleteProduct
};

function createProduct(product, callback) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    };

    return fetch('/api/products/', requestOptions).then(handleResponse);
}

function updateProduct(product, callback) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    };

    return fetch('/api/products/', requestOptions).then(handleResponse);
}

function getProductById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/api/products/' + id, requestOptions).then(handleResponse);
}

function getAllProducts(filter , page, size) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/products?filter=${filter}&page=${page}&size=${size}` , requestOptions).then(handleResponse);
}

function _deleteProduct(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch('/api/products/' + id, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (response.ok !== true) {
        if( response.status === 401 ) {
            userActions.logout();
        }
        return Promise.reject(response.statusText);
    }

    return response.json();

}
