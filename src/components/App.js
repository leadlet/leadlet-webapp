import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

import Login from './login';
import Register from './register';

const App = () => (
    <Router>
        <div className="full-height">
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
        </div>
    </Router>
)
export default App