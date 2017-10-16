import React, { Component } from 'react';
import {Tab, Tabs} from "react-bootstrap";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import {contactConstants} from "../_constants/contact.constants";

class Contacts extends Component {


    render() {
        return (
            <div className="row">
                <div className="col-sm-8">
                    <div className="ibox">
                        <div className="ibox-content">
                            <span className="text-muted small pull-right">Last modification: <i className="fa fa-clock-o"/> 2:10 pm - 12.06.2014</span>
                            <h2>Contacts</h2>
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
                                <p className="pull-right ">
                                    <button class="btn btn-success btn-sm m-r-sm" type="button"><i class="fa fa-upload"></i>&nbsp;Import</button>
                                    <button class="btn btn-primary btn-sm" type="button"><i class="fa fa-plus"></i>&nbsp;Create</button>
                                </p>

                                <div className="tab-content">

                                    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                                        <Tab eventKey={1} title="Person">
                                            <ContactList type={contactConstants.CONTACT_TYPE_PERSON}/>
                                        </Tab>
                                        <Tab eventKey={2} title="Organization">
                                            <ContactList type={contactConstants.CONTACT_TYPE_ORGANIZATION}/>
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
                            <ContactDetail/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Contacts;