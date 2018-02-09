import React, {Component} from 'react';
import {Button, ToggleButton, ToggleButtonGroup} from "react-bootstrap";


class AgentList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-2">
                    <div className="contact-box center-version">

                        <a href="profile.html">

                            <img alt="image" className="img-circle" src="img/headshot-placeholder.jpg"/>

                            <h3 className="m-b-xs"><strong>John Smith</strong></h3>

                            <div className="font-bold">Graphics designer</div>
                            <address className="m-t-md">
                                <strong>Twitter, Inc.</strong><br/>
                                795 Folsom Ave, Suite 600<br/>
                                San Francisco, CA 94107<br/>
                                <abbr title="Phone">P:</abbr> (123) 456-7890
                            </address>

                        </a>
                        <div className="contact-box-footer">
                            <div className="m-t-xs btn-group">
                                <a className="btn btn-xs btn-white"><i className="fa fa-pencil"/> Edit </a>
                                <a className="btn btn-xs btn-white"><i className="fa fa-trash"/> Delete</a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

}

export default AgentList;
