import React, { Component } from 'react';
import {Scrollbars} from "react-custom-scrollbars";
import { connect } from 'react-redux';
import {contactActions} from "../_actions/contact.actions";

class PersonList extends Component {

    componentDidMount() {
        this.props.dispatch(contactActions.getAll());
    }

    renderList() {
        return this.props.persons.map((person) => {
                return (
                    <tr>
                        <td><a data-toggle="tab" href={"/contact/"+ person.id} className="client-link">{person.firstName} {person.lastName}</a></td>
                        <td> Tellus Institute </td>
                        <td className="contact-type"><i className="fa fa-envelope"> </i></td>
                        <td> gravida@rbisit.com</td>
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
        persons: state.persons
    };
}

export default connect(mapStateToProps)(PersonList);