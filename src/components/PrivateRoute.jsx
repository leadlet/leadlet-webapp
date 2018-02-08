import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {isAuthorized} from "../helpers/auth-check";

export const PrivateRoute = ({component: Component, ...rest}) => {
    if (isAuthorized(rest.authorize)) {
        return (
            <Route {...rest} render={props => {

                return (
                    (JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).jwt)
                        ? <Component {...props} />
                        : <Redirect exact={true} to={{pathname: '/login', state: {from: props.location}}}/>);
            }}/>

        );
    } else {
        return (
            <Route {...rest} render={props => (
                <Redirect exact={true} to={{pathname: '/notpermitted', state: {from: props.location}}}/>
            )}/>
        );
    }

}