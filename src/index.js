import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './../node_modules/font-awesome/css/font-awesome.css'
import './../node_modules/animate.css/animate.min.css'


import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import registerServiceWorker from './registerServiceWorker';
import Login from './components/Login.js';
import Register from './components/Register.js';
import App from './App';

import {
    BrowserRouter,
    Route,
    Switch,
} from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/' component={App}/>
        </Switch>
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
