import React  from 'react';
import {Scrollbars} from "react-custom-scrollbars";
import {contactConstants} from "../../constants/contact.constants";
import Link from "react-router-dom/es/Link";

export const ContactList = function(props) {

    const { contacts, type } = props;

    function renderList() {
        let filteredIds = contacts.ids;

        if( type !== contactConstants.CONTACT_TYPE_ALL ){
            filteredIds = contacts.ids.filter(id => contacts.items[id].type === type);
        }
        return filteredIds.map( id => {
                let contact = contacts.items[id];
                return (
                    <tr key={contact.id} onClick={() => {props.history.push(`/contacts/${contact.id}`)}}>
                        <td>{contact.name}</td>

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
        <Scrollbars style={{ height: '400px' }}>
            <div className="table-responsive">
                {!contacts.ids && <em>Loading users...</em>}
                <table className="table table-striped table-hover">
                    <tbody>
                    {contacts.ids && renderList()}
                    </tbody>
                </table>
            </div>
        </Scrollbars>
    );
}

//<Link to={`/contacts/${contact.id}`} > ... </Link>