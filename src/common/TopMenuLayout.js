import React, {Component} from 'react';
import {TopHeader} from "./TopHeader";
import Footer from "./Footer";
import {Route} from 'react-router-dom'
import Contacts from "../components/Contacts/Contacts";
import Dashboard from "../Dashboard/Dashboard";
import Deals from "../components/DealBoard/DealBoard";
import Switch from "react-router-dom/es/Switch";
import PipelinesPage from "../components/Pipelines/Pipelines";
import PersonDetail from "../components/Contacts/PersonDetail";
import OrganizationDetail from "../components/Contacts/OrganizationDetail";
import DealDetail from "../components/DealDetail/DealDetail";
import ActivityList from "../components/Activity/ActivityList";
import Preferences from "../components/Preferences/Preferences";
import TeamAgentManagement from "../components/Teams/TeamAgentManagement";
import {PrivateRoute} from "../components/PrivateRoute";

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
                                <PrivateRoute path="/organization/:organizationId" component={OrganizationDetail}/>
                                <PrivateRoute path="/contacts" component={Contacts}/>
                                <PrivateRoute path="/deal/:dealId" component={DealDetail}/>
                                <PrivateRoute path="/deals" component={Deals}/>
                                <PrivateRoute authorize={['ROLE_MANAGER']} path="/teams" component={TeamAgentManagement}/>
                                <PrivateRoute path="/pipelines" component={PipelinesPage}/>
                                <PrivateRoute path="/activities" component={ActivityList}/>
                                <PrivateRoute path="/preferences" component={Preferences}/>
                            </Switch>
                        </div>
                        <Footer/>

                </div>
            </div>
        )
    }

}

export default TopMenuLayout