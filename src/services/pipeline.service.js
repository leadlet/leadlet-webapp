import { authHeader } from '../helpers';
import { handleResponse} from "../helpers/service.utils";

export const pipelineService = {
    getAll,
    getById,
    create,
    update,
    _delete
};

function create(stage) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(stage)
    };

    return fetch('/api/pipelines/', requestOptions).then(handleResponse);
}

function update(stage) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(stage)
    };

    return fetch('/api/pipelines/', requestOptions).then(handleResponse);
}


function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/api/pipelines/' + id, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/api/pipelines', requestOptions).then(handleResponse);
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch('/api/pipelines/' + id, requestOptions).then(handleResponse);
}
