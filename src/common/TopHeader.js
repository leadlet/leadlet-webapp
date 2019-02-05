import React from 'react';
import { smoothlyMenu } from './Helpers';
import $ from 'jquery';
import {userActions} from "../actions/user.actions";
import { connect } from 'react-redux';
import {Link} from "react-router-dom";

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
                        <Link to="/" className="navbar-brand">Leadlet</Link>
                    </div>
                    <div className="navbar-collapse collapse" id="navbar">
                        <ul className="nav navbar-nav">
                            <li>
                                <Link aria-expanded="false" role="button" to="/deals">Deals</Link>
                            </li>
                            <li>
                                <Link aria-expanded="false" role="button" to="/contacts">Contacts</Link>
                            </li>
                            <li>
                                <Link aria-expanded="false" role="button" to="/activities">Activities</Link>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <Link aria-expanded="false" role="button" to="/preferences">
                                    <i className="fa fa-cog"/> Settings
                                </Link>
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
