import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        (JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).jwt)
            ? <Component {...props} />
            : <Redirect exact={true} to={{ pathname: '/login', state: { from: props.location } }} />
)} />
)