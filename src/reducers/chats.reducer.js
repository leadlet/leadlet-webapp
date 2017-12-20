import {chatConstants} from '../constants';

export function chats(state = {}, action) {
    switch (action.type) {
        case chatConstants.CHATS_GETALL_SUCCESS:
            return {
                items: action.payload
            };
        case chatConstants.MESSAGE_CREATE_SUCCESS:
            let _state = state;

            _state.items.map((chat) => {
                if (chat.userName === action.payload.userName) {
                    chat.chatContent.push(
                        {
                            from: 'me',
                            message: action.payload.msg
                        }
                    );
                }
            });

            return _state;

        default:
            return state
    }
}