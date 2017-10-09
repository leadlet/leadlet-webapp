import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom'
import Minor from "../components/Minor";
import Main from "../components/Main";

const MainContent = () => (
    <Switch>
        <Route exact path='/' component={Main}/>
        <Route path='/main' component={Main}/>
        <Route path='/minor' component={Minor}/>
    </Switch>
)

export default MainContent;