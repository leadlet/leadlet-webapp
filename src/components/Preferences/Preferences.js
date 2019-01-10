import React, {Component} from 'react';
import {Tab, Tabs} from "react-bootstrap";
import Profile from "./Profile";
import Pipelines from "../Pipelines/Pipelines";
import AccountPreferences from "./AccountPreferences";
import Products from "./ProductList";
import Channels from "./ChannelList";
import Sources from "./SourceList";


class Preferences extends Component {

    render() {
        return (

            <div className="wrapper wrapper-content">
                <div className="container">

                    <div className="row">
                        <div className="ibox ">
                            <div className="ibox-title">
                                <h5>Configure your preferences</h5>
                            </div>
                            <div className="ibox-content">
                                <p className="m-b-lg">
                                    HEBELE!
                                </p>
                                <div className="row">
                                    <Tabs defaultActiveKey={1} animation={false} id="pipeline-tabs">
                                        <Tab eventKey={1} title="Account">
                                            <AccountPreferences/>
                                        </Tab>
                                        <Tab eventKey={2} title="Profile">
                                            <Profile/>
                                        </Tab>
                                        <Tab eventKey={3} title="Pipelines">
                                            <Pipelines/>
                                        </Tab>
                                        <Tab eventKey={4} title="Products">
                                            <Products/>
                                        </Tab>
                                        <Tab eventKey={5} title="Channels">
                                            <Channels/>
                                        </Tab>
                                        <Tab eventKey={6} title="Sources">
                                            <Sources/>
                                        </Tab>
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Preferences
