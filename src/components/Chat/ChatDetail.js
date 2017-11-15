import React from 'react';

export const ChatDetail = function (props) {

    const {chat} = props;

    if (!chat) {
        return (<em> Select chat </em>);
    }

    function renderChatList() {
        return chat.chatContent.map((chatItem) => {
            return (
                <div className={"chat-bubble-k " + (chatItem.from === 'me'? 'left': 'rigth')}>
                    <div className={"talk-bubble round tri-right " + (chatItem.from === 'me' ? 'right-in' : 'left-in')}>
                        <div className="message">
                            <a className="message-author" href="#">{chatItem.from}</a>
                            <span className="message-content">{chatItem.message}</span>
                            <span
                                className="message-date">18:39:23 </span>
                        </div>
                    </div>
                </div>
            );
        });
    }

    return (
        <div>
            <div className="chat-discussion">
                {renderChatList()}
            </div>
        </div>
    );
}