import React, { Component } from 'react';
import './App.css';
import MainContent from './common/MainContent';
import TopHeader from './common/TopHeader';
import Footer from './common/Footer';

class App extends Component {
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
    );
  }
}

export default App;
