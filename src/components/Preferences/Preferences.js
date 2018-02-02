import React, {Component} from 'react';
import {Tab, Tabs} from "react-bootstrap";
import Profile from "./Profile";
import Pipelines from "../Pipelines/Pipelines";


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
                                    Ut at lorem ut diam molestie laoreet. Donec ut nibh ac risus euismod semper a ut metus. Phasellus faucibus dapibus felis, viverra tincidunt felis pellentesque posuere.
                                </p>
                                <div className="row">
                                    <Tabs defaultActiveKey={1} animation={false} id="pipeline-tabs" >
                                        <Tab eventKey={1} title="Profile">
                                            <Profile/>
                                        </Tab>
                                        <Tab eventKey={2} title="Pipelines">
                                            <Pipelines/>
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
