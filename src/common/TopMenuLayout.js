import React, { Component } from 'react';
import { TopHeader } from "./TopHeader";
import Footer from "./Footer";
import { Route } from 'react-router-dom'
import Body1 from "../components/Body1";
import Clients from "../Clients/Clients";
import Dashboard from "../Dashboard/Dashboard";
import Deals from "../Deals/Deals";

class TopMenuLayout extends Component {

    render() {
        return (
            <div className="top-navigation">

                <div id="wrapper">
                    <div id="page-wrapper" className="gray-bg">

                        <TopHeader />

                        <div className="wrapper wrapper-content">
                            <div className="container">
                                <Route exact path="/" component={Dashboard} />
                                <Route path="/clients" component={Clients} />
                                <Route path="/deals" component={Deals} />
                                <Route path="/body1" component={Body1} />
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