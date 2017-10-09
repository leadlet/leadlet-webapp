import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './../node_modules/font-awesome/css/font-awesome.css'
import './../node_modules/animate.css/animate.min.css'


import React from 'react';
import './styles/index.css';
import registerServiceWorker from './registerServiceWorker';
import { App } from './App';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers';

// setup fake backend
import { configureFakeBackend } from './_helpers';
configureFakeBackend();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

/*
ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path='/login' component={LoginPage}/>
            <Route path='/register' component={Register}/>
            <Route path='/' component={App}/>
        </Switch>
    </BrowserRouter>, document.getElementById('root'));
    */


registerServiceWorker();
