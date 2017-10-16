import React, { Component } from 'react';
import {Scrollbars} from "react-custom-scrollbars";
import { connect } from 'react-redux';


class ContactEdit extends Component {

    constructor(props) {
        super(props);

        this.contactId = this.props.match.params.contactId;
    }


    renderDetail(){
        return (
            <div>
                <h1>editing {this.props.match.params.contactId}</h1>
            </div>
        )   ;
    }

    render() {
        var contact = { item: {}}
        return (
            <div>
                {contact.loading && <em>Loading users...</em>}
                {contact.error && <span className="text-danger">ERROR: {contact.error}</span>}
                {contact.item && this.renderDetail()}
            </div>

        );
    }
}

function mapStateToProps(state){
    return {
        contact: state.contact
    };
}

export default connect(mapStateToProps)(ContactEdit);