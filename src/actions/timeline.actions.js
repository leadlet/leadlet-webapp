import {timelineConstants} from "../constants/timeline.constants";
import {timelineService} from "../services/timeline.service";

export function getPaginated(filter, page, size) {
    return dispatch => {
        dispatch(request());

        timelineService.getPaginated(filter, page, size)
            .then(
                response => dispatch(success({items: response[0], dataTotalSize: response[1]})),
                error => dispatch(failure(error))
            );
    };

    function request() {
        return {type: timelineConstants.GETALL_REQUEST}
    }

    function success(data) {
        return {type: timelineConstants.GETALL_SUCCESS, data}
    }

    function failure(error) {
        return {type: timelineConstants.GETALL_FAILURE, error}
    }
}

export function getTimelineByDealIdAndRefresh(filter, page, size, id) {
    return dispatch => {
        dispatch(request());

        timelineService.getByDealId(filter, page, size, id)
            .then(
                response => dispatch(success({items: response[0], dataTotalSize: response[1]})),
                error => dispatch(failure(error))
            );

    };

    function request() {
        return {type: timelineConstants.GETALL_REQUEST_REFRESH}
    }

    function success(data) {
        return {type: timelineConstants.GETALL_SUCCESS_REFRESH, data}
    }

    function failure(error) {
        return {type: timelineConstants.GETALL_FAILURE_REFRESH, error}
    }
}

export function getTimelineByDealId(filter, page, size, id) {
    return dispatch => {
        dispatch(request());

        timelineService.getByDealId(filter, page, size, id)
            .then(
                response => dispatch(success({items: response[0], dataTotalSize: response[1]})),
                error => dispatch(failure(error))
            );

    };

    function request() {
        return {type: timelineConstants.GETALL_REQUEST}
    }

    function success(data) {
        return {type: timelineConstants.GETALL_SUCCESS, data}
    }

    function failure(error) {
        return {type: timelineConstants.GETALL_FAILURE, error}
    }
}


export function getTimelineByPersonIdAndRefresh(filter, page, size, id) {
    return dispatch => {
        dispatch(request());

        timelineService.getByPersonId(filter, page, size, id)
            .then(
                response => dispatch(success({items: response[0], dataTotalSize: response[1]})),
                error => dispatch(failure(error))
            );

    };

    function request() {
        return {type: timelineConstants.GETALL_REQUEST_REFRESH}
    }

    function success(data) {
        return {type: timelineConstants.GETALL_SUCCESS_REFRESH, data}
    }

    function failure(error) {
        return {type: timelineConstants.GETALL_FAILURE_REFRESH, error}
    }
}

export function getTimelineByPersonId(filter, page, size, id) {
    return dispatch => {
        dispatch(request());

        timelineService.getByPersonId(filter, page, size, id)
            .then(
                response => dispatch(success({items: response[0], dataTotalSize: response[1]})),
                error => dispatch(failure(error))
            );

    };

    function request() {
        return {type: timelineConstants.GETALL_REQUEST}
    }

    function success(data) {
        return {type: timelineConstants.GETALL_SUCCESS, data}
    }

    function failure(error) {
        return {type: timelineConstants.GETALL_FAILURE, error}
    }
}

export function getTimelineByOrganizationIdAndRefresh(filter, page, size, id) {
    return dispatch => {
        dispatch(request());

        timelineService.getByOrganizationId(filter, page, size, id)
            .then(
                response => dispatch(success({items: response[0], dataTotalSize: response[1]})),
                error => dispatch(failure(error))
            );

    };

    function request() {
        return {type: timelineConstants.GETALL_REQUEST_REFRESH}
    }

    function success(data) {
        return {type: timelineConstants.GETALL_SUCCESS_REFRESH, data}
    }

    function failure(error) {
        return {type: timelineConstants.GETALL_FAILURE_REFRESH, error}
    }
}

export function getTimelineByOrganizationId(filter, page, size, id) {
    return dispatch => {
        dispatch(request());

        timelineService.getByOrganizationId(filter, page, size, id)
            .then(
                response => dispatch(success({items: response[0], dataTotalSize: response[1]})),
                error => dispatch(failure(error))
            );

    };

    function request() {
        return {type: timelineConstants.GETALL_REQUEST}
    }

    function success(data) {
        return {type: timelineConstants.GETALL_SUCCESS, data}
    }

    function failure(error) {
        return {type: timelineConstants.GETALL_FAILURE, error}
    }
}

export function getTimelineByUserId(filter, page, size, id) {
    return dispatch => {
        dispatch(request());

        timelineService.getByUserId(filter, page, size, id)
            .then(
                response => dispatch(success({items: response[0], dataTotalSize: response[1]})),
                error => dispatch(failure(error))
            );

    };

    function request() {
        return {type: timelineConstants.GETALL_REQUEST}
    }

    function success(data) {
        return {type: timelineConstants.GETALL_SUCCESS, data}
    }

    function failure(error) {
        return {type: timelineConstants.GETALL_FAILURE, error}
    }
}

export function getTimelineByUserIdAndRefresh(filter, page, size, id) {
    return dispatch => {
        dispatch(request());

        timelineService.getByUserId(filter, page, size, id)
            .then(
                response => dispatch(success({items: response[0], dataTotalSize: response[1]})),
                error => dispatch(failure(error))
            );

    };

    function request() {
        return {type: timelineConstants.GETALL_REQUEST_REFRESH}
    }

    function success(data) {
        return {type: timelineConstants.GETALL_SUCCESS_REFRESH, data}
    }

    function failure(error) {
        return {type: timelineConstants.GETALL_FAILURE_REFRESH, error}
    }
}
