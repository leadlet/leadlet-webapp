import React from 'react';
import { smoothlyMenu } from './Helpers';
import $ from 'jquery';
import {userActions} from "../actions/user.actions";
import { connect } from 'react-redux';
import {Link, NavLink} from "react-router-dom";

class TopHeader extends React.Component {

    constructor(props) {
        super(props);

        this.handleLogOut = this.handleLogOut.bind(this);
    }


    toggleNavigation(e) {
        e.preventDefault();
        $("body").toggleClass("mini-navbar");
        smoothlyMenu();
    }

    handleLogOut(event){
        event.preventDefault();

        const { dispatch } = this.props;

        dispatch(userActions.logout());
    }


    render() {
        return (
            <div className="row border-bottom white-bg ">
                <nav className="navbar navbar-fixed-top">
                    <div className="navbar-header">
                        <button aria-controls="navbar" aria-expanded="false" data-target="#navbar" data-toggle="collapse" className="navbar-toggle collapsed" type="button">
                            <i className="fa fa-reorder"/>
                        </button>
                        <Link to="/" className="navbar-brand"><img alt="Logo" className="logo" src="/img/theme/logo.png"/></Link>
                    </div>
                    <div className="navbar-collapse collapse" id="navbar">
                        <ul className="nav navbar-nav">
                            <li>
                                <NavLink activeClassName="active" role="button" to="/deals">Deals</NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName="active" role="button" to="/contacts">Contacts</NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName="active" role="button" to="/activities">Activities</NavLink>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <NavLink activeClassName="active" role="button" to="/preferences">
                                    <i className="fa fa-cog"/> Settings
                                </NavLink>
                            </li>
                            <li>
                                <Link to="#" onClick={this.handleLogOut}>
                                    <i className="fa fa-sign-out"/> Log out
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        authorization: state.authorization,
    };
}

const connectedTopHeader = connect(mapStateToProps)(TopHeader);
export { connectedTopHeader as TopHeader };
