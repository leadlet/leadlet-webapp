import React, { Component } from 'react';
import {Tab, Tabs} from "react-bootstrap";
import {contactConstants} from "../_constants/contact.constants";
import { connect } from 'react-redux';
import {contactActions} from "../_actions/contact.actions";
import {ContactList} from "./ContactList";
import {ContactDetail} from "./ContactDetail";

class Contacts extends Component {

    constructor(props){
        super(props);

        this.state = {
            selectedContact: null,
            term: ""
        };

        this.onContactSelect = this.onContactSelect.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);

    }

    componentDidMount() {
        this.props.dispatch(contactActions.getAllOrganization());
        this.props.dispatch(contactActions.getAllPerson());
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ selectedContact: nextProps.persons &&  nextProps.persons.items ? nextProps.persons.items[0] : null })
    }

    onContactSelect(contact){
        this.setState({ selectedContact : contact});
    }

    onSearchSubmit(event){
        event.preventDefault();
        this.props.dispatch(contactActions.getAllOrganization(`name:${this.state.term}`));
        this.props.dispatch(contactActions.getAllPerson(`name:${this.state.term}`));

    }

    onInputChange(event){
        this.setState({term: event.target.value});
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-8">
                    <div className="ibox">
                        <div className="ibox-content">
                            <span className="text-muted small pull-right">Last modification: <i className="fa fa-clock-o"/> 2:10 pm - 12.06.2014</span>
                            <h2>Contacts</h2>
                            <p>
                                All clients need to be verified before you can send email and set a project.
                            </p>
                            <form className="input-group" onSubmit={this.onSearchSubmit}>
                                <input type="text" placeholder="Search contact..."
                                       onChange={this.onInputChange} className="input form-control" />
                                <span className="input-group-btn">
                                        <button type="submit" className="btn btn btn-primary"> <i className="fa fa-search"/> Search</button>
                                </span>
                            </form>
                            <div className="clients-list">
                                <p className="pull-right ">
                                    <button className="btn btn-success btn-sm m-r-sm" type="button"><i className="fa fa-upload"></i>&nbsp;Import</button>
                                    <button className="btn btn-primary btn-sm" type="button"><i className="fa fa-plus"></i>&nbsp;Create</button>
                                </p>

                                <div className="tab-content">

                                    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                                        <Tab eventKey={1} title="Person">
                                            <ContactList
                                                contacts={this.props.persons}
                                                type={contactConstants.CONTACT_TYPE_PERSON}
                                                onContactSelect={this.onContactSelect}
                                            />
                                        </Tab>
                                        <Tab eventKey={2} title="Organization">
                                            <ContactList
                                                contacts={this.props.organizations}
                                                type={contactConstants.CONTACT_TYPE_ORGANIZATION}
                                                onContactSelect={this.onContactSelect}
                                            />
                                        </Tab>
                                    </Tabs>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="ibox ">

                        <div className="ibox-content">
                            <ContactDetail contact={ this.state.selectedContact }/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

function mapStateToProps(state){
    return {
        persons: state.persons,
        organizations: state.organizations
    };
}


export default connect(mapStateToProps)(Contacts);