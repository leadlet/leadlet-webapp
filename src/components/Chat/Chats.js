import React, {Component} from 'react';
import { connect } from 'react-redux';
import {ChatList} from "./ChatList";
import {getAllChats} from "../../actions/chat.actions";
import {ChatDetail} from "./ChatDetail";

class Chats extends Component {

    constructor(props){
        super(props);

        this.state = {
            selectedChat: null
        };

        this.onUserSelect = this.onUserSelect.bind(this);
    }

    onUserSelect(chat){
        this.setState({ selectedChat : chat});
    }

    componentDidMount() {
        this.props.getAllChats();
    }

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
                                            <ChatDetail
                                                chat={this.state.selectedChat}
                                            />
                                        </div>

                                        <div className="col-md-3">
                                            <ChatList
                                                chats={this.props.chats}
                                                onUserSelect={this.onUserSelect}
                                            />
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
function mapStateToProps(state){
    return{
        chats: state.chats
    }
}

export default connect(mapStateToProps, {getAllChats})(Chats);