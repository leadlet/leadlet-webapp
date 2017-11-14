import React, {Component} from 'react';
import ChatList from "./ChatList";
import ChatDetail from "./ChatDetail";

class Chats extends Component {

    render() {
        return (
            <div className="wrapper wrapper-content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ibox float-e-margins">
                                <div className="ibox-content">

                                    <strong>Chat room </strong> can be used to create chat room in your app.
                                    You can also use a small chat in the right corner to provide live discussion.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ibox chat-view">
                                <div className="ibox-title">
                                    <small className="pull-right text-muted">Last message: Mon Jan 26 2015 - 18:39:23
                                    </small>
                                    Chat room panel
                                </div>
                                <div className="ibox-content">
                                    <div className="row">
                                        <div className="col-md-9 ">
                                            <ChatDetail/>
                                        </div>

                                        <div className="col-md-3">
                                            <ChatList/>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="chat-message-form">
                                                <div className="form-group">
                                                    <textarea className="form-control message-input" name="message"
                                                              placeholder="Enter message text"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chats;