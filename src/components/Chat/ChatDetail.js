import React from 'react';

export const ChatDetail = function (props) {

    const {chat} = props;

    if (!chat) {
        return (<em> Select chat </em>);
    }

    function renderChatList(){
        return chat.chatContent.map((chatItem) => {
           return(
               <div className="chat-message left">
                   <img className="message-avatar" src="img/a1.jpg" alt=""/>
                   <div className="message">
                       <a className="message-author" href="#">{chatItem.from}</a>
                       <span
                           className="message-date"> Mon Jan 26 2015 - 18:39:23 </span>
                       <span className="message-content">{chatItem.message}</span>
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