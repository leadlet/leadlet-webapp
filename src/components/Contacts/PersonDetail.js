import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {createNote} from "../../actions/note.actions";
import {getById} from "../../actions/person.actions"
import ContactPerson from "./ContactPerson";
import ContactOrganization from "./ContactOrganization";
import ActivityDetail from "../Activity/ActivityDetail";
import fullCalendar from 'fullcalendar';
import '../../../node_modules/fullcalendar/dist/fullcalendar.css';
import $ from 'jquery';
import moment from 'moment';
import Timeline from "../Timeline/Timeline";

class ContactDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showPersonEditModal: false,
            showModal: false,
            value: ''
        };

        this.openEditModal = this.openEditModal.bind(this);
        this.closeEditModal = this.closeEditModal.bind(this);
        this.openActivityModal = this.openActivityModal.bind(this);
        this.closeActivityModal = this.closeActivityModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("Note Event: ", event.target);
        this.props.createNote({
            content: this.state.value,
            contactId: this.props.viewedPerson.id
        });
        this.state.value = '';
    }

    openEditModal(type) {
        this.setState({showPersonEditModal: true});
    }

    closeEditModal() {
        this.setState({showPersonEditModal: false});
    }

    openActivityModal() {
        this.setState({showModal: true});
    }

    closeActivityModal() {
        this.setState({showModal: false});
    }

    componentDidMount() {
        this.props.getById(this.props.match.params.personId);
    }

    componentDidUpdate() {

        if (!this.props.ids) {
            return;
        }

        let events = this.props.ids.map(function (item) {
            return this.props.activities[item];
        }, this);

        if (events) {
            $('#contact-calendar').fullCalendar('destroy');

            $('#contact-calendar').fullCalendar({
                header: {
                    left: 'prev,next today',
                    right: 'listDay,listWeek,month'
                },
                // customize the button names,
                // otherwise they'd all just say "list"
                views: {
                    listDay: {buttonText: 'list day'},
                    listWeek: {buttonText: 'list week'}
                },
                defaultView: 'listWeek',
                navLinks: true, // can click day/week names to navigate views
                editable: true,
                eventLimit: true, // allow "more" link when too many events
                events
            });
        }
    }

    render() {
        if (!this.props.viewedPerson) {
            return (
                <em>Loading details for {this.props.match.params.contactId}</em>
            );
        } else {
            return (
                <div className="wrapper wrapper-content">
                    <div className="container">
                        <div className="row m-b-md">
                            <div className="col-md-4">
                                <div className="profile-image">
                                    <i className="fa fa-user-circle-o fa-5x" aria-hidden="true"/>
                                </div>
                                <div className="profile-info">
                                    <div className="m-b-md">
                                        <a onClick={() => this.openEditModal(this.props.viewedPerson.type)}
                                           className="btn btn-primary btn-sm pull-right">Edit</a>
                                        <h2 className="no-margins">
                                            {this.props.viewedPerson && this.props.viewedPerson.name}
                                        </h2>
                                        <h4>{this.props.viewedPerson.organization && this.props.viewedPerson.organization.name}</h4>

                                    </div>
                                </div>
                            </div>
                            <div>
                                <ContactPerson showEditModal={this.state.showPersonEditModal}
                                               close={this.closeEditModal}
                                               contact={this.props.viewedPerson}
                                               initialValues={this.props.viewedPerson}
                                />
                            </div>
                        </div>
                        <div className="row">
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
                                                                <li className="disabled"><a href="#tab-2">Send an
                                                                    Email</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="panel-body">
                                                        <div className="tab-content">
                                                            <div className="tab-pane active" id="tab-1">
                                                                <div className="note-form">
                                                                    <form role="form" onSubmit={this.handleSubmit}>
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
                                    <div className="ibox-content" style={{height:'600px'}}>
                                        <div id="vertical-timeline"
                                             className="vertical-container dark-timeline center-orientation full-height">
                                            <Timeline
                                                pageSize={5}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="ibox">
                                    <div className="ibox-title">
                                        <i className="fa fa-plus pull-right" aria-hidden="true"/>
                                        <h5>Deals</h5>
                                    </div>
                                    <div className="ibox-content text-center">
                                        Deals
                                    </div>
                                </div>
                                <div className="ibox">
                                    <div className="ibox-title">
                                        <i className="fa fa-plus pull-right" aria-hidden="true"
                                           onClick={() => this.openActivityModal({
                                               start: moment(),
                                               end: moment()
                                           })}/>
                                        <h5>Activities</h5>
                                    </div>
                                    <div className="ibox-content">
                                        <div id="contact-calendar"/>
                                    </div>
                                </div>
                                <div className="ibox">
                                    <div className="ibox-title">
                                        <i className="fa fa-plus pull-right" aria-hidden="true"/>
                                        <h5>Documents</h5>
                                    </div>
                                    <div className="ibox-content text-center">
                                        Documents
                                    </div>
                                </div>
                            </div>

                            <div>
                                <ActivityDetail showModal={this.state.showModal}
                                                close={this.closeActivityModal}
                                                person={this.props.viewedPerson}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}


function mapStateToProps(state) {
    return {
        viewedPerson: state.persons.viewedPerson,
        activities: state.activities.items,
        ids: state.activities.ids
    };
}

export default connect(mapStateToProps, {getById, createNote})(ContactDetail);
