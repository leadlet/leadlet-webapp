import React, {Component} from 'react';
import {TopHeader} from "./TopHeader";
import Footer from "./Footer";
import {Route} from 'react-router-dom'
import Contacts from "../components/Contacts/Contacts";
import Dashboard from "../Dashboard/Dashboard";
import Deals from "../components/DealBoard/DealBoard";
import ContactEdit from "../components/Contacts/ContactNew";
import Switch from "react-router-dom/es/Switch";
import PipelinesPage from "../components/Pipelines/Pipelines";
import Chats from "../components/Chat/Chats";
import Activity from "../components/Activity/Activity";

class TopMenuLayout extends Component {

    render() {
        return (
            <div className="top-navigation">

                <div id="wrapper">
                    <div id="page-wrapper" className="gray-bg">

                        <TopHeader/>
                        <Switch>
                            <Route exact path="/" component={Dashboard}/>
                            <Route path="/contacts/:contactId" component={ContactEdit}/>
                            <Route path="/contacts" component={Contacts}/>
                            <Route path="/deals" component={Deals}/>
                            <Route path="/pipelines" component={PipelinesPage}/>
                            <Route path="/chats" component={Chats}/>
                            <Route path="/activity" component={Activity}/>
                        </Switch>

                        <Footer/>

                    </div>

                </div>
            </div>
        )
    }

}

export default TopMenuLayout