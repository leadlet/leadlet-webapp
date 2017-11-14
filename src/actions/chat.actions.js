import {chatConstants} from "../constants/chat.constants";

export function getAllChats() {

    return {
        type: chatConstants.CHATS_GETALL_SUCCESS,
        payload: [
            {
                userName: 'yavuz',
                online: true,
                chatContent: [
                    {
                        from: 'me',
                        message: 'nasılsın'
                    },
                    {
                        from: 'yavuz',
                        message: 'iyilik sen nasılsın?'
                    }
                ]
            },
            {
                userName: 'caner',
                online: false,
                chatContent: [
                    {
                        from: 'caner',
                        message: 'abla bu aksam size gelecem'
                    },
                    {
                        from: 'me',
                        message: 'ok..'
                    },
                    {
                        from: 'me',
                        message: 'gel tabi...'
                    }
                ]
            }
        ]

    }

}