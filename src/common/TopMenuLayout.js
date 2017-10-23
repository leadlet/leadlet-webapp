import React, { Component } from 'react';
import { TopHeader } from "./TopHeader";
import Footer from "./Footer";
import { Route } from 'react-router-dom'
import Contacts from "../ContactsPage/Contacts";
import Dashboard from "../Dashboard/Dashboard";
import Deals from "../Deals/Deals";
import ContactEdit from "../ContactsPage/ContactNew";
import Switch from "react-router-dom/es/Switch";
import PipelinesPage from "../PipelinesPage/Pipelines";

class TopMenuLayout extends Component {

    render() {
        return (
            <div className="top-navigation">

                <div id="wrapper">
                    <div id="page-wrapper" className="gray-bg">

                        <TopHeader />

                        <div className="wrapper wrapper-content">
                            <div className="container">
                                <Switch>
                                    <Route exact path="/" component={Dashboard} />
                                    <Route path="/contacts/:contactId" component={ContactEdit} />
                                    <Route path="/contacts" component={Contacts} />
                                    <Route path="/deals" component={Deals} />
                                    <Route path="/pipes" component={PipelinesPage} />
                                </Switch>
                            </div>
                        </div>

                        <Footer />

                    </div>

                </div>
            </div>
        )
    }

}

export default TopMenuLayout