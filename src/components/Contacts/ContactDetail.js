import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {getById} from "../../actions/contact.actions";

class ContactDetail extends Component {

    componentDidMount(){
        this.props.getById(this.props.match.params.contactId);
    }

    render() {
        return (
            <div>
                {!this.props.viewedContact && <em>Loading details for {this.props.match.params.contactId}</em>}
                {this.props.viewedContact &&
                <div className="container full-height" style={{'overflow-y':'hidden'}}>
                    <div className="row full-height">
                        <div className="col-sm-8 full-height">
                            <div className="ibox full-height">
                                <div className="ibox-content full-height">
                                    <h2>Contact</h2>
                                    <p>name: {this.props.viewedContact.name}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                                    }

            </div>
        )

    }

}


function mapStateToProps(state) {
    return {
        viewedContact: state.contacts.viewedContact
    };
}

export default connect(mapStateToProps, {getById})(ContactDetail);
