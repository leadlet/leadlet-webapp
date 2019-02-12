import { authHeader } from '../helpers';
import { handleResponse} from "../helpers/service.utils";

export const stageService = {
    getByPipelineId,
    getById,
    createStage,
    updateStage,
    _delete
};

function createStage(stage) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(stage)
    };

    return fetch('/api/stages/', requestOptions).then(handleResponse);
}

function updateStage(stage) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(stage)
    };

    return fetch('/api/stages/', requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/api/stages/' + id, requestOptions).then(handleResponse);
}

function getByPipelineId(id) {
    // TODO ygokirmak - add pipelineId filter
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/api/stages/pipeline/'+id, requestOptions).then(handleResponse);
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch('/api/stages/' + id, requestOptions).then(handleResponse);
}
