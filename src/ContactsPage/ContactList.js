import React  from 'react';
import {Scrollbars} from "react-custom-scrollbars";
import {contactConstants} from "../_constants/contact.constants";

export  const ContactList = function(props) {

    const { contacts, onContactSelect, type, onEditClicked } = props;

    function renderList() {
        return contacts.items.map((contact) => {
                return (
                    <tr key={contact.id} onClick={()=>onContactSelect(contact)} >
                        <td> {contact.name} </td>
                        { (type === contactConstants.CONTACT_TYPE_PERSON) && <td> {contact.organization && contact.organization.name} </td>}
                        <td className="contact-type"><i className="fa fa-envelope"> </i></td>
                        <td> { contact.emails && contact.emails.length > 0 ? contact.emails[0].email : '' }</td>
                        <td className="client-status"><span className="label label-primary">Active</span></td>
                    </tr>

                );
            }
        );
    }

    return (
        <Scrollbars style={{ height: '100%' }}>
            <div className="table-responsive">
                {contacts.loading && <em>Loading users...</em>}
                {contacts.error && <span className="text-danger">ERROR: {contacts.error}</span>}
                <table className="table table-striped table-hover">
                    <tbody>
                    {contacts.items && renderList()}
                    </tbody>
                </table>
            </div>
        </Scrollbars>
    );
}

