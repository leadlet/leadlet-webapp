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
import DealDetail from "../components/DealBoard/DealDetail";
import ActivityList from "../components/Activity/ActivityList";

class TopMenuLayout extends Component {

    render() {
        return (
            <div className="top-navigation full-height">

                <div id="wrapper" className="gray-bg">
                        <TopHeader/>
                        <div className="wrapper-content">
                            <Switch>
                                <Route exact path="/" component={Dashboard}/>
                                <Route path="/person/:personId" component={PersonDetail}/>
                                <Route path="/organization/:organizationId" component={OrganizationDetail}/>
                                <Route path="/contacts" component={Contacts}/>
                                <Route path="/deal/:dealId" component={DealDetail}/>
                                <Route path="/deals" component={Deals}/>
                                <Route path="/pipelines" component={PipelinesPage}/>
                                <Route path="/activities" component={ActivityList}/>
                            </Switch>
                        </div>
                        <Footer/>

                </div>
            </div>
        )
    }

}

export default TopMenuLayout