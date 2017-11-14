import { chatConstants } from '../constants';

export function chats(state = {}, action) {
    switch (action.type) {
        case chatConstants.CHATS_GETALL_SUCCESS:
            return {
                items: action.payload
            };
        default:
            return state
    }
}