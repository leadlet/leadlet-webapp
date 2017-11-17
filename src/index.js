import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './../node_modules/font-awesome/css/font-awesome.css'
import './../node_modules/animate.css/animate.min.css'


import React from 'react';
import './styles/fullcalendar/fullcalendar.css';
import './styles/index.css';
import registerServiceWorker from './registerServiceWorker';
import { App } from './App';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'

import { store } from './helpers';

render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);



registerServiceWorker();
