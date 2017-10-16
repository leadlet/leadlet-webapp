import React, { Component } from 'react';
import {Scrollbars} from "react-custom-scrollbars";
import { connect } from 'react-redux';
import {contactActions} from "../_actions/contact.actions";
import {contactConstants} from "../_constants/contact.constants";

class ContactList extends Component {

    constructor(props) {
        super(props);

        this.type = props.type ? props.type : contactConstants.CONTACT_TYPE_PERSON;

        this.handleItemClick = this.handleItemClick.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(contactActions.getAll(this.type));
    }

    handleItemClick(event){
        event.preventDefault();
        this.props.dispatch(contactActions.getById(event.currentTarget.dataset.id));

        console.log(event.currentTarget.dataset.id);
    }

    renderList() {
        return this.props.persons.items.map((person) => {
                return (
                    <tr key={person.id} >
                        <td><a data-toggle="tab" onClick={this.handleItemClick} data-id={person.id} className="client-link">{person.name}</a></td>
                        <td> {person.organization.name} </td>
                        <td className="contact-type"><i className="fa fa-envelope"> </i></td>
                        <td> { person.emails.length > 0 ? person.emails[0].email : '' }</td>
                        <td className="client-status"><span className="label label-primary">Active</span></td>
                    </tr>

                );
            }
        );
    }

    render() {
        const { persons } = this.props;

        return (
            <Scrollbars style={{ height: '100%' }}>
                <div className="table-responsive">
                    {persons.loading && <em>Loading users...</em>}
                    {persons.error && <span className="text-danger">ERROR: {persons.error}</span>}
                    <table className="table table-striped table-hover">
                        <tbody>
                        {persons.items && this.renderList()}
                        </tbody>
                    </table>
                </div>
            </Scrollbars>
        );
    }
}

function mapStateToProps(state){
    return {
        persons: state.contacts
    };
}

export default connect(mapStateToProps)(ContactList);