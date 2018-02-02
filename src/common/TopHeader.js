import React from 'react';
import { smoothlyMenu } from './Helpers';
import { DropdownButton,MenuItem } from 'react-bootstrap';
import $ from 'jquery';
import {userActions} from "../actions/user.actions";
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
            <div className="row border-bottom white-bg ">
                <nav className="navbar navbar-fixed-top" role="navigation">
                    <div className="navbar-header">
                        <button aria-controls="navbar" aria-expanded="false" data-target="#navbar" data-toggle="collapse" className="navbar-toggle collapsed" type="button">
                            <i className="fa fa-reorder"/>
                        </button>
                        <a href="/" className="navbar-brand">Leadlet</a>
                    </div>
                    <div className="navbar-collapse collapse" id="navbar">
                        <ul className="nav navbar-nav">
                            <li>
                                <a aria-expanded="false" role="button" href="/contacts">Contacts</a>
                            </li>
                            <li>
                                <a aria-expanded="false" role="button" href="/deals">Deals</a>
                            </li>
                            <li>
                                <a aria-expanded="false" role="button" href="/activities">Activities</a>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <a aria-expanded="false" role="button" href="/preferences">
                                    <i className="fa fa-cog"/> Settings
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={this.handleLogOut}>
                                    <i className="fa fa-sign-out"/> Log out
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
