import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {createNote} from "../../actions/note.actions";
import {getById} from "../../actions/person.actions";
import ContactPerson from "./ContactPerson";
import Timeline from "../Timeline/Timeline";
import {
    getTimelineByPersonId, getTimelineByPersonIdAndRefresh,
    getTimelineLoadMoreByPersonId
} from "../../actions/timeline.actions";
import EditOrCreateActivity from "../Activity/EditOrCreateActivity";
import CreateEditDeal from "../DealDetail/CreateEditDeal";

class ContactDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isPersonModalVisible: false,
            isDealModalVisible: false,
            isActivityModalVisible: false,
            value: '',
        };

        this.openEditModal = this.openEditModal.bind(this);
        this.closeEditModal = this.closeEditModal.bind(this);
        this.openActivityModal = this.openActivityModal.bind(this);
        this.closeActivityModal = this.closeActivityModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.refreshTimeline = this.refreshTimeline.bind(this);
        this.openDealModal = this.openDealModal.bind(this);
        this.closeDealModal = this.closeDealModal.bind(this);
    }


    refreshTimeline() {
        this.props.getTimelineByPersonIdAndRefresh(null, null, null, this.props.match.params.personId)
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("Note Event: ", event.target);
        this.props.createNote({
            content: this.state.value,
            personId: this.props.viewedPerson.id
        }, () => this.props.getTimelineByPersonIdAndRefresh(null, null, null, this.props.match.params.personId));
        this.setState({value: ''});
    }

    openEditModal() {
        this.setState({isPersonModalVisible: true});
    }

    closeEditModal() {
        this.setState({isPersonModalVisible: false});
    }

    openActivityModal() {
        this.setState({isActivityModalVisible: true});
    }

    closeActivityModal() {
        this.setState({isActivityModalVisible: false});
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
                                        className="font-bold">{this.props.viewedPerson && this.props.viewedPerson.title}</div>
                                    <address className="m-t-md">
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

                                        <a onClick={() => this.openActivityModal()}
                                           className="btn btn-primary btn-sm m-l-sm">New Activity</a>

                                        <a onClick={() => this.openDealModal()}
                                           className="btn btn-primary btn-sm m-l-sm">New Deal</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="ibox">
                                <div className="ibox-content">
                                    <div className="row m-t-sm">
                                        <div className="col-lg-12">
                                            <div className="panel blank-panel">
                                                <div className="panel-heading">
                                                    <div className="panel-options">
                                                        <ul className="nav nav-tabs">
                                                            <li className="active"><a href="#tab-1"
                                                                                      data-toggle="tab">Add
                                                                a Note</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="panel-body">
                                                    <div className="tab-content">
                                                        <div className="tab-pane active" id="tab-1">
                                                            <div className="note-form">
                                                                <form onSubmit={this.handleSubmit}>
                                                                    <div className="form-group">
                                                                            <textarea placeholder="Please enter a note."
                                                                                      className="form-control"
                                                                                      value={this.state.value}
                                                                                      onChange={this.handleChange}
                                                                            />
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <button type="submit"
                                                                                className="btn btn-sm btn-primary m-t-n-xs">
                                                                            <strong>Save</strong></button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane" id="tab-2">

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ibox">
                                <Timeline
                                    pageSize={5}
                                    getTimelineItems={this.props.getTimelineByPersonId}
                                    itemId={this.props.match.params.personId}
                                    loadMoreTimeline={this.props.getTimelineLoadMoreByPersonId}
                                />
                            </div>
                        </div>


                        {
                            this.state.isActivityModalVisible &&
                            <EditOrCreateActivity showModal={this.state.isActivityModalVisible}
                                                  close={this.closeActivityModal}
                                                  initialValues={{
                                                      person: {
                                                          id: this.props.match.params.personId
                                                      }

                                                  }}
                                                  createCallback={this.refreshTimeline}
                                                  showPersonSelection={false}
                            />

                        }

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
    createNote,
    getTimelineByPersonId,
    getTimelineLoadMoreByPersonId,
    getTimelineByPersonIdAndRefresh
})(ContactDetail);
