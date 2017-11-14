import React, {Component} from 'react';

class ChatDetail extends Component {

    render() {
        return (
            <div>
                <div className="chat-discussion">

                    <div className="chat-message left">
                        <img className="message-avatar" src="img/a1.jpg" alt=""/>
                        <div className="message">
                            <a className="message-author" href="#"> Michael Smith </a>
                            <span
                                className="message-date"> Mon Jan 26 2015 - 18:39:23 </span>
                            <span className="message-content">
											Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                                            </span>
                        </div>
                    </div>
                    <div className="chat-message right">
                        <img className="message-avatar" src="img/a4.jpg" alt=""/>
                        <div className="message">
                            <a className="message-author" href="#"> Karl Jordan </a>
                            <span
                                className="message-date">  Fri Jan 25 2015 - 11:12:36 </span>
                            <span className="message-content">
											Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover.
                                            </span>
                        </div>
                    </div>
                    <div className="chat-message right">
                        <img className="message-avatar" src="img/a2.jpg" alt=""/>
                        <div className="message">
                            <a className="message-author" href="#"> Michael Smith </a>
                            <span
                                className="message-date">  Fri Jan 25 2015 - 11:12:36 </span>
                            <span className="message-content">
											There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.
                                            </span>
                        </div>
                    </div>
                    <div className="chat-message left">
                        <img className="message-avatar" src="img/a5.jpg" alt=""/>
                        <div className="message">
                            <a className="message-author" href="#"> Alice Jordan </a>
                            <span
                                className="message-date">  Fri Jan 25 2015 - 11:12:36 </span>
                            <span className="message-content">
											All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.
                                                It uses a dictionary of over 200 Latin words.
                                            </span>
                        </div>
                    </div>
                    <div className="chat-message right">
                        <img className="message-avatar" src="img/a6.jpg" alt=""/>
                        <div className="message">
                            <a className="message-author" href="#"> Mark Smith </a>
                            <span
                                className="message-date">  Fri Jan 25 2015 - 11:12:36 </span>
                            <span className="message-content">
											All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.
                                                It uses a dictionary of over 200 Latin words.
                                            </span>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default ChatDetail;