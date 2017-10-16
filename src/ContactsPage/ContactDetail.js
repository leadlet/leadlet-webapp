import React, { Component } from 'react';
import {Scrollbars} from "react-custom-scrollbars";
import { connect } from 'react-redux';
import Link from "react-router-dom/es/Link";


class ContactDetail extends Component {

    renderDetail() {
        const contact = this.props.contact.item;

        return (

            <div>
                <div>
                    <div className="text-center">
                        <h3 className="m-b-xs"><strong>{contact.name}</strong></h3>

                        <div className="font-bold">{contact.title}</div>
                        <address className="m-t-md">
                            {contact.location}
                        </address>
                        <div className="contact-box-footer">
                            <div className="m-t-xs btn-group">
                                <Link to={ "/contacts/" + contact.id } className="btn btn-xs btn-white"><i className="fa fa-pencil"></i> Edit </Link>
                                <a className="btn btn-xs btn-white"><i className="fa fa-phone"></i> Call </a>
                                <a className="btn btn-xs btn-white"><i className="fa fa-envelope"></i> Email</a>
                            </div>
                        </div>
                    </div>
                </div>

            <div className="client-detail">
                <br/>

                <Scrollbars style={{ height: '100%' }}>

                    <strong>Last activity</strong>

                    <ul className="list-group clear-list">
                        <li className="list-group-item fist-item">
                            <span className="pull-right"> 09:00 pm </span>
                            Please contact me
                        </li>
                        <li className="list-group-item">
                            <span className="pull-right"> 10:16 am </span>
                            Sign a contract
                        </li>
                        <li className="list-group-item">
                            <span className="pull-right"> 08:22 pm </span>
                            Open new shop
                        </li>
                        <li className="list-group-item">
                            <span className="pull-right"> 11:06 pm </span>
                            Call back to Sylvia
                        </li>
                        <li className="list-group-item">
                            <span className="pull-right"> 12:00 am </span>
                            Write a letter to Sandra
                        </li>
                    </ul>
                    <strong>Notes</strong>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <hr/>
                    <strong>Timeline activity</strong>
                    <div id="vertical-timeline" className="vertical-container dark-timeline">
                        <div className="vertical-timeline-block">
                            <div className="vertical-timeline-icon gray-bg">
                                <i className="fa fa-coffee" />
                            </div>
                            <div className="vertical-timeline-content">
                                <p>Conference on the sales results for the previous year.
                                </p>
                                <span className="vertical-date small text-muted"> 2:10 pm - 12.06.2014 </span>
                            </div>
                        </div>
                        <div className="vertical-timeline-block">
                            <div className="vertical-timeline-icon gray-bg">
                                <i className="fa fa-briefcase" />
                            </div>
                            <div className="vertical-timeline-content">
                                <p>Many desktop publishing packages and web page editors now use Lorem.
                                </p>
                                <span className="vertical-date small text-muted"> 4:20 pm - 10.05.2014 </span>
                            </div>
                        </div>
                        <div className="vertical-timeline-block">
                            <div className="vertical-timeline-icon gray-bg">
                                <i className="fa fa-bolt" />
                            </div>
                            <div className="vertical-timeline-content">
                                <p>There are many variations of passages of Lorem Ipsum available.
                                </p>
                                <span className="vertical-date small text-muted"> 06:10 pm - 11.03.2014 </span>
                            </div>
                        </div>
                        <div className="vertical-timeline-block">
                            <div className="vertical-timeline-icon navy-bg">
                                <i className="fa fa-warning" />
                            </div>
                            <div className="vertical-timeline-content">
                                <p>The generated Lorem Ipsum is therefore.
                                </p>
                                <span className="vertical-date small text-muted"> 02:50 pm - 03.10.2014 </span>
                            </div>
                        </div>
                        <div className="vertical-timeline-block">
                            <div className="vertical-timeline-icon gray-bg">
                                <i className="fa fa-coffee" />
                            </div>
                            <div className="vertical-timeline-content">
                                <p>Conference on the sales results for the previous year.
                                </p>
                                <span className="vertical-date small text-muted"> 2:10 pm - 12.06.2014 </span>
                            </div>
                        </div>
                        <div className="vertical-timeline-block">
                            <div className="vertical-timeline-icon gray-bg">
                                <i className="fa fa-briefcase" />
                            </div>
                            <div className="vertical-timeline-content">
                                <p>Many desktop publishing packages and web page editors now use Lorem.
                                </p>
                                <span className="vertical-date small text-muted"> 4:20 pm - 10.05.2014 </span>
                            </div>
                        </div>
                    </div>
                </Scrollbars>
            </div>
            </div>

        );

    }

    render() {
        const { contact } = this.props;

        return (
            <div className="tab-content">
                {contact.loading && <em>Loading users...</em>}
                {contact.error && <span className="text-danger">ERROR: {contact.error}</span>}
                {contact.item && this.renderDetail()}
            </div>

        );
    }
}

function mapStateToProps(state){
    return {
        contact: state.contact
    };
}

export default connect(mapStateToProps)(ContactDetail);