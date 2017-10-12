import React, { Component } from 'react';

import { Switch, Route, Router } from 'react-router-dom'
import Body1 from "../components/Body1";
import Body2 from "../Clients/Clients";
import { history } from '../_helpers';

const MainContent = () => (
    <Router history={history}>
        <div>
            <Route exact path="/" component={Body1} />
            <Route path="/body2" component={Body2} />
            <Route path="/body1" component={Body1} />
        </div>
    </Router>

)

export default MainContent;