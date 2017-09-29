import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.css';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom'
import Login from './components/login';
import Register from './components/register';
import { Switch, Route } from 'react-router-dom'

ReactDOM.render((
        <BrowserRouter>
            <Switch>
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register}/>
                <Route path='/' component={App}/>
            </Switch>
        </BrowserRouter>
    )
    , document.getElementById('root'));


registerServiceWorker();
