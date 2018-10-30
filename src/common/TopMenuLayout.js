import React, {Component} from 'react';
import {TopHeader} from "./TopHeader";
import Footer from "./Footer";
import Contacts from "../components/Contacts/Contacts";
import Dashboard from "../components/Dashboard/Dashboard";
import Deals from "../components/DealBoard/DealBoard";
import Switch from "react-router-dom/es/Switch";
import PipelinesPage from "../components/Pipelines/Pipelines";
import PersonDetail from "../components/Contacts/PersonDetail";
import DealDetail from "../components/DealDetail/DealDetail";
import Activities from "../components/Activity/Activities";
import Preferences from "../components/Preferences/Preferences";
import TeamAgentManagement from "../components/Team/TeamAgentManagement";
import {PrivateRoute} from "../components/PrivateRoute";
import AgentDetail from "../components/Agent/AgentDetail";
import TeamDetail from "../components/Team/TeamDetail";
import {Route} from "react-router-dom";
import {NotFound} from "../components/ErrorPages/NotFound";

class TopMenuLayout extends Component {

    render() {
        return (
            <div className="top-navigation full-height">

                <div id="wrapper" className="gray-bg">
                        <TopHeader/>
                        <div className="wrapper-content">
                            <Switch>
                                <PrivateRoute exact path="/" component={Dashboard}/>
                                <PrivateRoute path="/person/:personId" component={PersonDetail}/>
                                <PrivateRoute path="/contacts" component={Contacts}/>
                                <PrivateRoute path="/deal/:dealId" component={DealDetail}/>
                                <PrivateRoute path="/user/:userId" component={AgentDetail}/>
                                <PrivateRoute path="/deals" component={Deals}/>
                                <PrivateRoute path="/pipelines" component={PipelinesPage}/>
                                <PrivateRoute path="/activities" component={Activities}/>
                                <PrivateRoute path="/preferences" component={Preferences}/>
                                <Route component={NotFound} />
                            </Switch>
                        </div>
                        <Footer/>

                </div>
            </div>
        )
    }

}

export default TopMenuLayout