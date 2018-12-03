import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {createNote} from "../../actions/note.actions";
import {getById} from "../../actions/person.actions";
import ContactPerson from "./ContactPerson";
import Timeline from "../Timeline/Timeline";
import CreateEditDeal from "../DealDetail/CreateEditDeal";
import Note from "../Note/Note";
import moment from "moment";
import * as _ from "lodash";

class ContactDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isPersonModalVisible: false,
            isDealModalVisible: false,
            lastModifiedDate: moment()
        };

        this.openEditModal = this.openEditModal.bind(this);
        this.closeEditModal = this.closeEditModal.bind(this);
        this.openDealModal = this.openDealModal.bind(this);
        this.closeDealModal = this.closeDealModal.bind(this);
        this.onPageUpdate = this.onPageUpdate.bind(this);
        this.renderGender = this.renderGender.bind(this);

    }

    /*
        When we add an activity for deal or edit some field,
        we should call this function to update state. This state will be passed to timeline as props
        so timeline component will be notified about change and refresh itself.
     */
    onPageUpdate( ){
        this.setState({lastModifiedDate: moment()});
    }

    openEditModal() {
        this.setState({isPersonModalVisible: true});
    }

    closeEditModal() {
        this.setState({isPersonModalVisible: false});
    }



    openDealModal() {
        this.setState({isDealModalVisible: true});
    }

    closeDealModal() {
        this.setState({isDealModalVisible: false});
    }

    componentDidMount() {
        this.props.getById(this.props.match.params.personId);
    }


    renderGender(){
        if(_.has(this, ["props", "viewedPerson", "gender"])){
            return _.get(this, ["props", "viewedPerson", "gender"]);

        }
    }

    render() {
        if (!this.props.viewedPerson) {
            return (
                <em>Loading details for {this.props.match.params.contactId}</em>
            );
        } else {
            return (
                <div className="container-fluid m-lg">
                    <div className="row">
                        <div className="col-md-4">

                            <div className="contact-box center-version">
                                <a onClick={() => this.openEditModal(this.props.viewedPerson.type)}>
                                    <i className="fa fa-user-circle-o fa-5x" aria-hidden="true"/>
                                    <h3 className="m-b-xs">
                                        <strong>{this.props.viewedPerson && this.props.viewedPerson.name}</strong></h3>
                                    <div
                                        className="font-bold">{this.props.viewedPerson && this.props.viewedPerson.login}</div>
                                    <address className="m-t-md">
                                        {this.renderGender()}<br/>
                                        {this.props.viewedPerson && this.props.viewedPerson.address}<br/>
                                        {this.props.viewedPerson && this.props.viewedPerson.phones.map(phoneItem => {
                                            return (
                                                <div><i className="fa fa-phone"/> {phoneItem.phone}<br/></div>
                                            );
                                        })}

                                        {this.props.viewedPerson && this.props.viewedPerson.email &&
                                        <span><i className="fa fa-envelope"/> {this.props.viewedPerson.email}</span>}
                                    </address>
                                </a>
                                <div className="contact-box-footer">
                                        <a onClick={() => this.openEditModal()}
                                           className="btn btn-primary btn-sm">Edit</a>

                                        <a onClick={() => this.openDealModal()}
                                           className="btn btn-primary btn-sm m-l-sm">New Deal</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 m-b-lg">
                            <div className="ibox">
                                <div className="ibox-content">
                                    <Note initialValues={{
                                            personId: this.props.viewedPerson.id
                                        }}
                                        onChange={this.onPageUpdate}
                                    />
                                </div>
                            </div>
                        {
                            this.state.isPersonModalVisible &&
                            <ContactPerson showEditModal={this.state.isPersonModalVisible}
                                           close={this.closeEditModal}
                                           initialValues={this.props.viewedPerson}
                            />
                        }

                        {
                            this.state.isDealModalVisible &&
                            <CreateEditDeal showModal={this.state.isDealModalVisible}
                                            close={this.closeDealModal}
                                            initialValues={{
                                                person: {
                                                    id: this.props.match.params.personId
                                                }
                                            }}
                                            showPersonSelection={false}
                            />
                        }
                        </div>
                    </div>
                </div>
            )
        }
    }
}


function mapStateToProps(state, props) {
    return {
        viewedPerson: state.persons.viewedPerson
    }
}

export default connect(mapStateToProps, {
    getById,
    createNote
})(ContactDetail);
