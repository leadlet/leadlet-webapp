// src/components/App/index.js
import React, { PropTypes, Component } from 'react';

import logo from './logo.svg';
import './App.css';

class App extends Component {
    // static propTypes = {}
    // static defaultProps = {}
    // state = {}

    render() {
        return (
            <div>
                <div>
                    <img src={logo} alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <p>
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
        );
    }
}

export default App;

