import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Contacts from '../contacts/index';
import Deals from '../deals/index';
import Home from '../home/index';

class Main extends React.Component {

    render() {
        return (
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/contacts' component={Contacts}/>
                <Route path='/deals' component={Deals}/>
            </Switch>
        )
    }
}

export default Main