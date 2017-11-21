import React  from 'react';
import { connect } from 'react-redux';

import './App.css';
import TopMenuLayout from "./common/TopMenuLayout";
import { history } from './helpers';
import { alertActions } from './actions';
import { PrivateRoute } from './components';
import { LoginPage } from './components/Login';
import { RegisterPage } from './components/Register';
import { Switch, Route } from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div>
                {
                    alert.message &&
                    <div className={`alert ${alert.type} alert-dismissable`}>
                        <button aria-hidden={true} data-dismiss="alert" className="close" type="button"
                            onClick={()=> this.props.dispatch(alertActions.clear())}>×</button>
                        {alert.message}
                    </div>
                }

                <Switch>
                    <Route exact={true} path="/login" component={LoginPage} />
                    <Route exact={true} path="/register" component={RegisterPage} />
                    <Route path="/" component={TopMenuLayout} />
                </Switch>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps, null, null, {
    pure: false
})(App);

export { connectedApp as App };