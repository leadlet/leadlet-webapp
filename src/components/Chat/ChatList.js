import React, {Component} from 'react';

class ChatList extends Component {

    render() {
        return (
            <div>
                <div className="chat-users">

                    <div className="users-list">
                        <div className="chat-user">
                            <img className="chat-avatar" src="img/a4.jpg" alt=""/>
                            <div className="chat-user-name">
                                <a href="#">Karl Jordan</a>
                            </div>
                        </div>
                        <div className="chat-user">
                            <img className="chat-avatar" src="img/a1.jpg" alt=""/>
                            <div className="chat-user-name">
                                <a href="#">Monica Smith</a>
                            </div>
                        </div>
                        <div className="chat-user">
                            <span className="pull-right label label-primary">Online</span>
                            <img className="chat-avatar" src="img/a2.jpg" alt=""/>
                            <div className="chat-user-name">
                                <a href="#">Michael Smith</a>
                            </div>
                        </div>
                        <div className="chat-user">
                            <span className="pull-right label label-primary">Online</span>
                            <img className="chat-avatar" src="img/a3.jpg" alt=""/>
                            <div className="chat-user-name">
                                <a href="#">Janet Smith</a>
                            </div>
                        </div>
                        <div className="chat-user">
                            <img className="chat-avatar" src="img/a5.jpg" alt=""/>
                            <div className="chat-user-name">
                                <a href="#">Alice Smith</a>
                            </div>
                        </div>
                        <div className="chat-user">
                            <img className="chat-avatar" src="img/a6.jpg" alt=""/>
                            <div className="chat-user-name">
                                <a href="#">Monica Cale</a>
                            </div>
                        </div>
                        <div className="chat-user">
                            <img className="chat-avatar" src="img/a2.jpg" alt=""/>
                            <div className="chat-user-name">
                                <a href="#">Mark Jordan</a>
                            </div>
                        </div>
                        <div className="chat-user">
                            <span className="pull-right label label-primary">Online</span>
                            <img className="chat-avatar" src="img/a3.jpg" alt=""/>
                            <div className="chat-user-name">
                                <a href="#">Janet Smith</a>
                            </div>
                        </div>


                    </div>

                </div>
            </div>
        );
    }
}

export default ChatList;