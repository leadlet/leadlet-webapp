import React from 'react';
import { smoothlyMenu } from './Helpers';
import { DropdownButton,MenuItem } from 'react-bootstrap';
import $ from 'jquery';
import {userActions} from "../_actions/user.actions";
import { connect } from 'react-redux';

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
            <div className="row border-bottom white-bg">
                <nav className="navbar navbar-static-top" role="navigation">
                    <div className="navbar-header">
                        <button aria-controls="navbar" aria-expanded="false" data-target="#navbar" data-toggle="collapse" className="navbar-toggle collapsed" type="button">
                            <i className="fa fa-reorder"></i>
                        </button>
                        <a href="#" className="navbar-brand">Leadlet</a>
                    </div>
                    <div className="navbar-collapse collapse" id="navbar">
                        <ul className="nav navbar-nav">
                            <li className="dropdown">
                                <DropdownButton className="btn-link" id="sample-menu" title="Sample Menu">
                                    <MenuItem href="/login">Login</MenuItem>
                                    <MenuItem href="/register">Register</MenuItem>
                                    <MenuItem href="/body1">Body1</MenuItem>
                                    <MenuItem href="/body2">Body2</MenuItem>
                                </DropdownButton>
                            </li>

                        </ul>
                        <ul className="nav navbar-top-links navbar-right">
                            <li>
                                <a href="#" onClick={this.handleLogOut}>
                                    <i className="fa fa-sign-out"></i> Log out
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedTopHeader = connect(mapStateToProps)(TopHeader);
export { connectedTopHeader as TopHeader };
