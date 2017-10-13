import React, { Component } from 'react';
import {Scrollbars} from "react-custom-scrollbars";
import {Tab, Tabs} from "react-bootstrap";
import PersonList from "./PersonList";
import OrganizationList from "./OrganizationList";

class Clients extends Component {


    render() {
        return (
            <div className="row">
                <div className="col-sm-8">
                    <div className="ibox">
                        <div className="ibox-content">
                            <span className="text-muted small pull-right">Last modification: <i className="fa fa-clock-o"/> 2:10 pm - 12.06.2014</span>
                            <h2>Clients</h2>
                            <p>
                                All clients need to be verified before you can send email and set a project.
                            </p>
                            <div className="input-group">
                                <input type="text" placeholder="Search client " className="input form-control" />
                                <span className="input-group-btn">
                                        <button type="button" className="btn btn btn-primary"> <i className="fa fa-search"/> Search</button>
                                </span>
                            </div>
                            <div className="clients-list">
                                <div className="tab-content">

                                    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                                        <Tab eventKey={1} title="Person">
                                            <PersonList/>
                                        </Tab>
                                        <Tab eventKey={2} title="Organization">
                                            <OrganizationList/>
                                        </Tab>
                                    </Tabs>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="ibox ">

                        <div className="ibox-content">
                            <div className="tab-content">
                                <div id="contact-1" className="tab-pane active">
                                    <div className="row m-b-lg">
                                        <div className="col-lg-4 text-center">
                                            <h2>Nicki Smith</h2>

                                            <div className="m-b-sm">
                                                <img alt="image" className="img-circle" src="img/a2.jpg"
                                                     style={{width: '62px'}} />
                                            </div>
                                        </div>
                                        <div className="col-lg-8">
                                            <strong>
                                                About me
                                            </strong>

                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                                tempor incididunt ut labore et dolore magna aliqua.
                                            </p>
                                            <button type="button" className="btn btn-primary btn-sm btn-block"><i className="fa fa-envelope" /> Send Message
                                            </button>
                                        </div>
                                    </div>
                                    <div className="client-detail">

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
                                <div id="contact-2" className="tab-pane">
                                    <div className="row m-b-lg">
                                        <div className="col-lg-4 text-center">
                                            <h2>Edan Randall</h2>

                                            <div className="m-b-sm">
                                                <img alt="image" className="img-circle" src="img/a3.jpg"
                                                     style={{width: '62px'}} />
                                            </div>
                                        </div>
                                        <div className="col-lg-8">
                                            <strong>
                                                About me
                                            </strong>

                                            <p>
                                                Many desktop publishing packages and web page editors now use Lorem Ipsum as their default tempor incididunt model text.
                                            </p>
                                            <button type="button" className="btn btn-primary btn-sm btn-block"><i
                                                className="fa fa-envelope" /> Send Message
                                            </button>
                                        </div>
                                    </div>
                                    <div className="client-detail">
                                        <div className="full-height-scroll">

                                            <strong>Last activity</strong>

                                            <ul className="list-group clear-list">
                                                <li className="list-group-item fist-item">
                                                    <span className="pull-right"> 09:00 pm </span>
                                                    Lorem Ipsum available
                                                </li>
                                                <li className="list-group-item">
                                                    <span className="pull-right"> 10:16 am </span>
                                                    Latin words, combined
                                                </li>
                                                <li className="list-group-item">
                                                    <span className="pull-right"> 08:22 pm </span>
                                                    Open new shop
                                                </li>
                                                <li className="list-group-item">
                                                    <span className="pull-right"> 11:06 pm </span>
                                                    The generated Lorem Ipsum
                                                </li>
                                                <li className="list-group-item">
                                                    <span className="pull-right"> 12:00 am </span>
                                                    Content here, content here
                                                </li>
                                            </ul>
                                            <strong>Notes</strong>
                                            <p>
                                                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words.
                                            </p>
                                            <hr/>
                                            <strong>Timeline activity</strong>
                                            <div id="vertical-timeline" className="vertical-container dark-timeline">
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
                                        </div>
                                    </div>
                                </div>
                                <div id="contact-3" className="tab-pane">
                                    <div className="row m-b-lg">
                                        <div className="col-lg-4 text-center">
                                            <h2>Jasper Carson</h2>

                                            <div className="m-b-sm">
                                                <img alt="image" className="img-circle" src="img/a4.jpg"
                                                     style={{width: '62px'}} />
                                            </div>
                                        </div>
                                        <div className="col-lg-8">
                                            <strong>
                                                About me
                                            </strong>

                                            <p>
                                                Latin professor at Hampden-Sydney College in Virginia, looked  embarrassing hidden in the middle.
                                            </p>
                                            <button type="button" className="btn btn-primary btn-sm btn-block"><i
                                                className="fa fa-envelope"/> Send Message
                                            </button>
                                        </div>
                                    </div>
                                    <div className="client-detail">
                                        <div className="full-height-scroll">

                                            <strong>Last activity</strong>

                                            <ul className="list-group clear-list">
                                                <li className="list-group-item fist-item">
                                                    <span className="pull-right"> 09:00 pm </span>
                                                    Aldus PageMaker including
                                                </li>
                                                <li className="list-group-item">
                                                    <span className="pull-right"> 10:16 am </span>
                                                    Finibus Bonorum et Malorum
                                                </li>
                                                <li className="list-group-item">
                                                    <span className="pull-right"> 08:22 pm </span>
                                                    Write a letter to Sandra
                                                </li>
                                                <li className="list-group-item">
                                                    <span className="pull-right"> 11:06 pm </span>
                                                    Standard chunk of Lorem
                                                </li>
                                                <li className="list-group-item">
                                                    <span className="pull-right"> 12:00 am </span>
                                                    Open new shop
                                                </li>
                                            </ul>
                                            <strong>Notes</strong>
                                            <p>
                                                Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.
                                            </p>
                                            <hr/>
                                            <strong>Timeline activity</strong>
                                            <div id="vertical-timeline" className="vertical-container dark-timeline">
                                                <div className="vertical-timeline-block">
                                                    <div className="vertical-timeline-icon gray-bg">
                                                        <i className="fa fa-coffee"/>
                                                    </div>
                                                    <div className="vertical-timeline-content">
                                                        <p>Conference on the sales results for the previous year.
                                                        </p>
                                                        <span className="vertical-date small text-muted"> 2:10 pm - 12.06.2014 </span>
                                                    </div>
                                                </div>
                                                <div className="vertical-timeline-block">
                                                    <div className="vertical-timeline-icon gray-bg">
                                                        <i className="fa fa-briefcase"/>
                                                    </div>
                                                    <div className="vertical-timeline-content">
                                                        <p>Many desktop publishing packages and web page editors now use Lorem.
                                                        </p>
                                                        <span className="vertical-date small text-muted"> 4:20 pm - 10.05.2014 </span>
                                                    </div>
                                                </div>
                                                <div className="vertical-timeline-block">
                                                    <div className="vertical-timeline-icon gray-bg">
                                                        <i className="fa fa-bolt"/>
                                                    </div>
                                                    <div className="vertical-timeline-content">
                                                        <p>There are many variations of passages of Lorem Ipsum available.
                                                        </p>
                                                        <span className="vertical-date small text-muted"> 06:10 pm - 11.03.2014 </span>
                                                    </div>
                                                </div>
                                                <div className="vertical-timeline-block">
                                                    <div className="vertical-timeline-icon navy-bg">
                                                        <i className="fa fa-warning"/>
                                                    </div>
                                                    <div className="vertical-timeline-content">
                                                        <p>The generated Lorem Ipsum is therefore.
                                                        </p>
                                                        <span className="vertical-date small text-muted"> 02:50 pm - 03.10.2014 </span>
                                                    </div>
                                                </div>
                                                <div className="vertical-timeline-block">
                                                    <div className="vertical-timeline-icon gray-bg">
                                                        <i className="fa fa-coffee"/>
                                                    </div>
                                                    <div className="vertical-timeline-content">
                                                        <p>Conference on the sales results for the previous year.
                                                        </p>
                                                        <span className="vertical-date small text-muted"> 2:10 pm - 12.06.2014 </span>
                                                    </div>
                                                </div>
                                                <div className="vertical-timeline-block">
                                                    <div className="vertical-timeline-icon gray-bg">
                                                        <i className="fa fa-briefcase"/>
                                                    </div>
                                                    <div className="vertical-timeline-content">
                                                        <p>Many desktop publishing packages and web page editors now use Lorem.
                                                        </p>
                                                        <span className="vertical-date small text-muted"> 4:20 pm - 10.05.2014 </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="contact-4" className="tab-pane">
                                    <div className="row m-b-lg">
                                        <div className="col-lg-4 text-center">
                                            <h2>Reuben Pacheco</h2>

                                            <div className="m-b-sm">
                                                <img alt="image" className="img-circle" src="img/a5.jpg"
                                                     style={{width: '62px'}} />
                                            </div>
                                        </div>
                                        <div className="col-lg-8">
                                            <strong>
                                                About me
                                            </strong>

                                            <p>
                                                Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,written in 45 BC. This book is a treatise on.
                                            </p>
                                            <button type="button" className="btn btn-primary btn-sm btn-block"><i
                                                className="fa fa-envelope"/> Send Message
                                            </button>
                                        </div>
                                    </div>
                                    <div className="client-detail">
                                        <div className="full-height-scroll">

                                            <strong>Last activity</strong>

                                            <ul className="list-group clear-list">
                                                <li className="list-group-item fist-item">
                                                    <span className="pull-right"> 09:00 pm </span>
                                                    The point of using
                                                </li>
                                                <li className="list-group-item">
                                                    <span className="pull-right"> 10:16 am </span>
                                                    Lorem Ipsum is that it has
                                                </li>
                                                <li className="list-group-item">
                                                    <span className="pull-right"> 08:22 pm </span>
                                                    Text, and a search for 'lorem ipsum'
                                                </li>
                                                <li className="list-group-item">
                                                    <span className="pull-right"> 11:06 pm </span>
                                                    Passages of Lorem Ipsum
                                                </li>
                                                <li className="list-group-item">
                                                    <span className="pull-right"> 12:00 am </span>
                                                    If you are going
                                                </li>
                                            </ul>
                                            <strong>Notes</strong>
                                            <p>
                                                Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                                            </p>
                                            <hr/>
                                            <strong>Timeline activity</strong>
                                            <div id="vertical-timeline" className="vertical-container dark-timeline">
                                                <div className="vertical-timeline-block">
                                                    <div className="vertical-timeline-icon gray-bg">
                                                        <i className="fa fa-coffee"/>
                                                    </div>
                                                    <div className="vertical-timeline-content">
                                                        <p>Conference on the sales results for the previous year.
                                                        </p>
                                                        <span className="vertical-date small text-muted"> 2:10 pm - 12.06.2014 </span>
                                                    </div>
                                                </div>
                                                <div className="vertical-timeline-block">
                                                    <div className="vertical-timeline-icon gray-bg">
                                                        <i className="fa fa-briefcase"/>
                                                    </div>
                                                    <div className="vertical-timeline-content">
                                                        <p>Many desktop publishing packages and web page editors now use Lorem.
                                                        </p>
                                                        <span className="vertical-date small text-muted"> 4:20 pm - 10.05.2014 </span>
                                                    </div>
                                                </div>
                                                <div className="vertical-timeline-block">
                                                    <div className="vertical-timeline-icon gray-bg">
                                                        <i className="fa fa-bolt"/>
                                                    </div>
                                                    <div className="vertical-timeline-content">
                                                        <p>There are many variations of passages of Lorem Ipsum available.
                                                        </p>
                                                        <span className="vertical-date small text-muted"> 06:10 pm - 11.03.2014 </span>
                                                    </div>
                                                </div>
                                                <div className="vertical-timeline-block">
                                                    <div className="vertical-timeline-icon navy-bg">
                                                        <i className="fa fa-warning"/>
                                                    </div>
                                                    <div className="vertical-timeline-content">
                                                        <p>The generated Lorem Ipsum is therefore.
                                                        </p>
                                                        <span className="vertical-date small text-muted"> 02:50 pm - 03.10.2014 </span>
                                                    </div>
                                                </div>
                                                <div className="vertical-timeline-block">
                                                    <div className="vertical-timeline-icon gray-bg">
                                                        <i className="fa fa-coffee"/>
                                                    </div>
                                                    <div className="vertical-timeline-content">
                                                        <p>Conference on the sales results for the previous year.
                                                        </p>
                                                        <span className="vertical-date small text-muted"> 2:10 pm - 12.06.2014 </span>
                                                    </div>
                                                </div>
                                                <div className="vertical-timeline-block">
                                                    <div className="vertical-timeline-icon gray-bg">
                                                        <i className="fa fa-briefcase"/>
                                                    </div>
                                                    <div className="vertical-timeline-content">
                                                        <p>Many desktop publishing packages and web page editors now use Lorem.
                                                        </p>
                                                        <span className="vertical-date small text-muted"> 4:20 pm - 10.05.2014 </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="company-1" className="tab-pane">
                                    <div className="m-b-lg">
                                        <h2>Tellus Institute</h2>

                                        <p>
                                            Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,written in 45 BC. This book is a treatise on.
                                        </p>
                                        <div>
                                            <small>Active project completion with: 48%</small>
                                            <div className="progress progress-mini">
                                                <div style={{width: '48%'}} className="progress-bar"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="client-detail">
                                        <div className="full-height-scroll">

                                            <strong>Last activity</strong>

                                            <ul className="list-group clear-list">
                                                <li className="list-group-item fist-item">
                                                    <span className="pull-right"> <span className="label label-primary">NEW</span> </span>
                                                    The point of using
                                                </li>
                                                <li className="list-group-item">
                                                    <span className="pull-right"> <span className="label label-warning">WAITING</span></span>
                                                    Lorem Ipsum is that it has
                                                </li>
                                                <li className="list-group-item">
                                                    <span className="pull-right"> <span className="label label-danger">BLOCKED</span> </span>
                                                    If you are going
                                                </li>
                                            </ul>
                                            <strong>Notes</strong>
                                            <p>
                                                Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                                            </p>
                                            <hr/>
                                            <strong>Timeline activity</strong>
                                            <div id="vertical-timeline" className="vertical-container dark-timeline">
                                                <div className="vertical-timeline-block">
                                                    <div className="vertical-timeline-icon gray-bg">
                                                        <i className="fa fa-coffee"/>
                                                    </div>
                                                    <div className="vertical-timeline-content">
                                                        <p>Conference on the sales results for the previous year.
                                                        </p>
                                                        <span className="vertical-date small text-muted"> 2:10 pm - 12.06.2014 </span>
                                                    </div>
                                                </div>
                                                <div className="vertical-timeline-block">
                                                    <div className="vertical-timeline-icon gray-bg">
                                                        <i className="fa fa-briefcase"/>
                                                    </div>
                                                    <div className="vertical-timeline-content">
                                                        <p>Many desktop publishing packages and web page editors now use Lorem.
                                                        </p>
                                                        <span className="vertical-date small text-muted"> 4:20 pm - 10.05.2014 </span>
                                                    </div>
                                                </div>
                                                <div className="vertical-timeline-block">
                                                    <div className="vertical-timeline-icon gray-bg">
                                                        <i className="fa fa-bolt"/>
                                                    </div>
                                                    <div className="vertical-timeline-content">
                                                        <p>There are many variations of passages of Lorem Ipsum available.
                                                        </p>
                                                        <span className="vertical-date small text-muted"> 06:10 pm - 11.03.2014 </span>
                                                    </div>
                                                </div>
                                                <div className="vertical-timeline-block">
                                                    <div className="vertical-timeline-icon navy-bg">
                                                        <i className="fa fa-warning"/>
                                                    </div>
                                                    <div className="vertical-timeline-content">
                                                        <p>The generated Lorem Ipsum is therefore.
                                                        </p>
                                                        <span className="vertical-date small text-muted"> 02:50 pm - 03.10.2014 </span>
                                                    </div>
                                                </div>
                                                <div className="vertical-timeline-block">
                                                    <div className="vertical-timeline-icon gray-bg">
                                                        <i className="fa fa-coffee"/>
                                                    </div>
                                                    <div className="vertical-timeline-content">
                                                        <p>Conference on the sales results for the previous year.
                                                        </p>
                                                        <span className="vertical-date small text-muted"> 2:10 pm - 12.06.2014 </span>
                                                    </div>
                                                </div>
                                                <div className="vertical-timeline-block">
                                                    <div className="vertical-timeline-icon gray-bg">
                                                        <i className="fa fa-briefcase"/>
                                                    </div>
                                                    <div className="vertical-timeline-content">
                                                        <p>Many desktop publishing packages and web page editors now use Lorem.
                                                        </p>
                                                        <span className="vertical-date small text-muted"> 4:20 pm - 10.05.2014 </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="company-2" className="tab-pane">
                                    <div className="m-b-lg">
                                        <h2>Penatibus Consulting</h2>

                                        <p>
                                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some.
                                        </p>
                                        <div>
                                            <small>Active project completion with: 22%</small>
                                            <div className="progress progress-mini">
                                                <div style={{width: '22%'}} className="progress-bar"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="client-detail">
                                        <div className="full-height-scroll">

                                            <strong>Last activity</strong>

                                            <ul className="list-group clear-list">
                                                <li className="list-group-item fist-item">
                                                    <span className="pull-right"> <span className="label label-warning">WAITING</span> </span>
                                                    Aldus PageMaker
                                                </li>
                                                <li className="list-group-item">
                                                    <span className="pull-right"><span className="label label-primary">NEW</span> </span>
                                                    Lorem Ipsum, you need to be sure
                                                </li>
                                                <li className="list-group-item">
                                                    <span className="pull-right"> <span className="label label-danger">BLOCKED</span> </span>
                                                    The generated Lorem Ipsum
                                                </li>
                                            </ul>
                                            <strong>Notes</strong>
                                            <p>
                                                Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                                            </p>
                                            <hr/>
                                            <strong>Timeline activity</strong>
                                            <div id="vertical-timeline" className="vertical-container dark-timeline">
                                                <div className="vertical-timeline-block">
                                                    <div className="vertical-timeline-icon gray-bg">
                                                        <i className="fa fa-coffee"/>
                                                    </div>
                                                    <div className="vertical-timeline-content">
                                                        <p>Conference on the sales results for the previous year.
                                                        </p>
                                                        <span className="vertical-date small text-muted"> 2:10 pm - 12.06.2014 </span>
                                                    </div>
                                                </div>
                                                <div className="vertical-timeline-block">
                                                    <div className="vertical-timeline-icon gray-bg">
                                                        <i className="fa fa-briefcase"/>
                                                    </div>
                                                    <div className="vertical-timeline-content">
                                                        <p>Many desktop publishing packages and web page editors now use Lorem.
                                                        </p>
                                                        <span className="vertical-date small text-muted"> 4:20 pm - 10.05.2014 </span>
                                                    </div>
                                                </div>
                                                <div className="vertical-timeline-block">
                                                    <div className="vertical-timeline-icon gray-bg">
                                                        <i className="fa fa-bolt"/>
                                                    </div>
                                                    <div className="vertical-timeline-content">
                                                        <p>There are many variations of passages of Lorem Ipsum available.
                                                        </p>
                                                        <span className="vertical-date small text-muted"> 06:10 pm - 11.03.2014 </span>
                                                    </div>
                                                </div>
                                                <div className="vertical-timeline-block">
                                                    <div className="vertical-timeline-icon navy-bg">
                                                        <i className="fa fa-warning"/>
                                                    </div>
                                                    <div className="vertical-timeline-content">
                                                        <p>The generated Lorem Ipsum is therefore.
                                                        </p>
                                                        <span className="vertical-date small text-muted"> 02:50 pm - 03.10.2014 </span>
                                                    </div>
                                                </div>
                                                <div className="vertical-timeline-block">
                                                    <div className="vertical-timeline-icon gray-bg">
                                                        <i className="fa fa-coffee"/>
                                                    </div>
                                                    <div className="vertical-timeline-content">
                                                        <p>Conference on the sales results for the previous year.
                                                        </p>
                                                        <span className="vertical-date small text-muted"> 2:10 pm - 12.06.2014 </span>
                                                    </div>
                                                </div>
                                                <div className="vertical-timeline-block">
                                                    <div className="vertical-timeline-icon gray-bg">
                                                        <i className="fa fa-briefcase"/>
                                                    </div>
                                                    <div className="vertical-timeline-content">
                                                        <p>Many desktop publishing packages and web page editors now use Lorem.
                                                        </p>
                                                        <span className="vertical-date small text-muted"> 4:20 pm - 10.05.2014 </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="company-3" className="tab-pane">
                                    <div className="m-b-lg">
                                        <h2>Ultrices Incorporated</h2>

                                        <p>
                                            Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.
                                        </p>
                                        <div>
                                            <small>Active project completion with: 72%</small>
                                            <div className="progress progress-mini">
                                                <div style={{width: '72%'}} className="progress-bar"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="client-detail">

                                        <div className="full-height-scroll">

                                            <strong>Last activity</strong>

                                            <ul className="list-group clear-list">
                                                <li className="list-group-item fist-item">
                                                    <span className="pull-right"> <span className="label label-danger">BLOCKED</span> </span>
                                                    Hidden in the middle of text
                                                </li>
                                                <li className="list-group-item">
                                                    <span className="pull-right"><span className="label label-primary">NEW</span> </span>
                                                    Non-characteristic words etc.
                                                </li>
                                                <li className="list-group-item">
                                                    <span className="pull-right">  <span className="label label-warning">WAITING</span> </span>
                                                    Bonorum et Malorum
                                                </li>
                                            </ul>
                                            <strong>Notes</strong>
                                            <p>
                                                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.
                                            </p>
                                            <hr/>
                                            <strong>Timeline activity</strong>
                                            <div id="vertical-timeline" className="vertical-container dark-timeline">
                                                <div className="vertical-timeline-block">
                                                    <div className="vertical-timeline-icon gray-bg">
                                                        <i className="fa fa-briefcase"/>
                                                    </div>
                                                    <div className="vertical-timeline-content">
                                                        <p>Many desktop publishing packages and web page editors now use Lorem.
                                                        </p>
                                                        <span className="vertical-date small text-muted"> 4:20 pm - 10.05.2014 </span>
                                                    </div>
                                                </div>
                                                <div className="vertical-timeline-block">
                                                    <div className="vertical-timeline-icon gray-bg">
                                                        <i className="fa fa-bolt"/>
                                                    </div>
                                                    <div className="vertical-timeline-content">
                                                        <p>There are many variations of passages of Lorem Ipsum available.
                                                        </p>
                                                        <span className="vertical-date small text-muted"> 06:10 pm - 11.03.2014 </span>
                                                    </div>
                                                </div>
                                                <div className="vertical-timeline-block">
                                                    <div className="vertical-timeline-icon navy-bg">
                                                        <i className="fa fa-warning"/>
                                                    </div>
                                                    <div className="vertical-timeline-content">
                                                        <p>The generated Lorem Ipsum is therefore.
                                                        </p>
                                                        <span className="vertical-date small text-muted"> 02:50 pm - 03.10.2014 </span>
                                                    </div>
                                                </div>
                                                <div className="vertical-timeline-block">
                                                    <div className="vertical-timeline-icon gray-bg">
                                                        <i className="fa fa-coffee"/>
                                                    </div>
                                                    <div className="vertical-timeline-content">
                                                        <p>Conference on the sales results for the previous year.
                                                        </p>
                                                        <span className="vertical-date small text-muted"> 2:10 pm - 12.06.2014 </span>
                                                    </div>
                                                </div>
                                                <div className="vertical-timeline-block">
                                                    <div className="vertical-timeline-icon gray-bg">
                                                        <i className="fa fa-briefcase"/>
                                                    </div>
                                                    <div className="vertical-timeline-content">
                                                        <p>Many desktop publishing packages and web page editors now use Lorem.
                                                        </p>
                                                        <span className="vertical-date small text-muted"> 4:20 pm - 10.05.2014 </span>
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
            </div>
        );
    }

}

export default Clients;