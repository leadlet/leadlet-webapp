import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {isAuthorized, isLoggedIn} from "../helpers/auth-check";

export const PrivateRoute = ({component: Component, ...rest}) => {
    if(!isLoggedIn()){
        return (
            <Route {...rest} render={props => {

                return (<Redirect exact={true} to={{pathname: '/login', state: {from: props.location}}}/>);
            }}/>

        );
    }else{
        if (isAuthorized(rest.authorize)) {
            return (
                <Route {...rest} render={props => {

                    return (<Component {...props} />);
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
}