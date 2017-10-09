import React from 'react';
import { smoothlyMenu } from './Helpers';
import { DropdownButton,MenuItem } from 'react-bootstrap';
import $ from 'jquery';

class TopHeader extends React.Component {

    toggleNavigation(e) {
        e.preventDefault();
        $("body").toggleClass("mini-navbar");
        smoothlyMenu();
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
                                    <MenuItem href="/main">Main</MenuItem>
                                    <MenuItem href="/minor">Minor</MenuItem>
                                </DropdownButton>
                            </li>

                        </ul>
                        <ul className="nav navbar-top-links navbar-right">
                            <li>
                                <a href="login.html">
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

export default TopHeader