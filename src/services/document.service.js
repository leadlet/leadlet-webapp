import { authHeader } from '../helpers';
import {userActions} from "../actions/user.actions";

export const documentService = {
    createDocument,
    updateDocument,
    getByDocumentId,
    getAllDocuments,
    deleteDocument,
    getByDealId,
    getByPersonId,
    getByOrganizationId,
    uploadDocuments
};

function uploadDocuments(files, personId){

    let data = new FormData();
    /*
    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        data.append("file" + i, file, file.name);
    }
    */

    data.append("file", files[0], files[0].name);
    data.append("personId", personId);


    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader() },
        body: data
    };

    return fetch('/api/documents/', requestOptions).then(handleResponse);

}
function createDocument(document, callback) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(document)
    };

    return fetch('/api/documents/', requestOptions).then(handleResponse);
}

function updateDocument(document, callback) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(document)
    };

    return fetch('/api/documents/', requestOptions).then(handleResponse);
}

function getByDocumentId(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/api/documents/' + id, requestOptions).then(handleResponse);
}

function getAllDocuments() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/documents/`, requestOptions).then(handlePaginationResponse);
}

function getByDealId(dealId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/documents/deal/` + dealId , requestOptions).then(handlePaginationResponse);
}

function getByPersonId(personId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/documents/person/` + personId, requestOptions).then(handlePaginationResponse);
}

function getByOrganizationId(organizationId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/documents/organization/` + organizationId, requestOptions).then(handlePaginationResponse);
}

function deleteDocument(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch('/api/documents/' + id, requestOptions).then(handleResponse);
}


function handlePaginationResponse(response) {
    if (response.ok !== true) {
        if( response.status === 401 ) {
            userActions.logout();
        }
        return Promise.reject(response.statusText);
    }
    return Promise.all([ response.json(), response.headers.get("x-total-count")]);

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
