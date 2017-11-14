import React from 'react';

export const ChatList = function (props) {

    const {chats, onUserSelect} = props;

    function renderList() {

        return chats.items.map((chat) => {
            return (
                <div className="chat-user">
                    <img className="chat-avatar" src="img/a4.jpg" alt=""/>
                    <div className="chat-user-name" onClick={() => onUserSelect(chat)}>
                        <a href="#">{chat.userName}</a>
                    </div>
                </div>
            );
        });
    }

    return (
        <div>
            <div className="chat-users">
                <div className="users-list">
                    {chats.items && renderList()}
                    {!chats.items && <em>loading</em>}
                </div>

            </div>
        </div>
    );
}