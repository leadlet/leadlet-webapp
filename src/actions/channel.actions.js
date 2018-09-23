import {channelService} from "../services/channel.service";

/*
export function getChannelById(channelId) {
    return dispatch => {
        dispatch(request(channelId));

        channelService.getChannelById(channelId)
            .then(
                channel => dispatch(success(channel)),
                error => dispatch(failure(error))
            );
    };

    function request() {
        return {type: channelConstants.GET_REQUEST}
    }

    function success(channel) {
        return {type: channelConstants.GET_SUCCESS, channel}
    }

    function failure(error) {
        return {type: channelConstants.GET_FAILURE, error}
    }
}

export function getAllChannels(filter, page, size) {
    return dispatch => {
        dispatch(request());

        channelService.getAllChannels(filter, page, size)
            .then(
                response => dispatch(success({items: response[0], dataTotalSize: response[1]})),
                error => dispatch(failure(error))
            );
    };

    function request() {
        return {type: channelConstants.GETALL_REQUEST}
    }

    function success(data) {
        return {type: channelConstants.GETALL_SUCCESS, data}
    }

    function failure(error) {
        return {type: channelConstants.GETALL_FAILURE, error}
    }
}

export function createChannel(channel, successCallback) {
    return dispatch => {
        dispatch(request());

        return channelService.createChannel(channel)
            .then(
                channel => {
                    dispatch(successCallback);
                    dispatch(success(channel));
                    dispatch(alertActions.success('Channel create successful'));
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
        return {type: channelConstants.CREATE_REQUEST}
    }

    function success(channel) {
        return {type: channelConstants.CREATE_SUCCESS, channel}
    }

    function failure(error) {
        return {type: channelConstants.CREATE_FAILURE, error}
    }
}

export function updateChannel(channel, successCallback) {
    return dispatch => {
        dispatch(request());

        return channelService.updateChannel(channel)
            .then(
                channel => {
                    dispatch(success(channel));
                    dispatch(alertActions.success('Channel update successful'));
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
        return {type: channelConstants.UPDATE_REQUEST}
    }

    function success(channel) {
        return {type: channelConstants.UPDATE_SUCCESS, channel}
    }

    function failure(error) {
        return {type: channelConstants.UPDATE_FAILURE, error}
    }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _deleteChannel(id) {
    return dispatch => {
        dispatch(request(id));

        channelService._deleteChannel(id)
            .then(
                channel => {
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) {
        return {type: channelConstants.DELETE_REQUEST, id}
    }

    function success(id) {
        return {type: channelConstants.DELETE_SUCCESS, id}
    }

    function failure(id, error) {
        return {type: channelConstants.DELETE_FAILURE, id, error}
    }
}
*/
export function getAllChannelByFilterAndReturn(filter, successCallback, failCallback) {
    channelService.getAllChannels(filter, 0, 20)
        .then(
            response => successCallback(response),
            error => failCallback(error)
        );
}