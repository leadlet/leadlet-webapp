import React, { Component } from 'react';
import { TopHeader } from "./TopHeader";
import MainContent from "./MainContent";
import Footer from "./Footer";

class TopMenuLayout extends Component {

    render() {
        return (
            <div className="top-navigation">

                <div id="wrapper">
                    <div id="page-wrapper" className="gray-bg">

                        <TopHeader />

                        <div className="wrapper wrapper-content">
                            <div className="container">
                                <MainContent></MainContent>
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