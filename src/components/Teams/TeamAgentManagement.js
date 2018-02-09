import React, {Component} from 'react';
import {Tab, Tabs} from "react-bootstrap";
import TeamList from "./TeamList";
import AgentList from "./AgentList";

class TeamAgentManagement extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="dealboard">
                <Tabs defaultActiveKey={1} animation={false} id="pipeline-tabs" >
                    <Tab eventKey={1} title="Teams">
                        <div className="teamlist flex">
                            <TeamList/>
                        </div>
                    </Tab>
                    <Tab eventKey={2} title="Agents">
                        <div className="teamlist">
                            <AgentList/>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        );
    }

}

export default TeamAgentManagement;
