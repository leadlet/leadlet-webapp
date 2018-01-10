import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {getById} from "../../actions/contact.actions";
import {getByPersonId} from "../../actions/activity.actions";
import {createNote} from "../../actions/note.actions";
import ContactPerson from "./ContactPerson";
import ContactOrganization from "./ContactOrganization";
import moment from 'moment';
import ActivityDetail from "../Activity/ActivityDetail";
import fullCalendar from 'fullcalendar';
import '../../../node_modules/fullcalendar/dist/fullcalendar.css';
import $ from 'jquery';

class ContactDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showPersonEditModal: false,
            showOrganizationEditModal: false,
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
        alert('A somebody was submitted: ' + this.state.value);
        event.preventDefault();
        console.log("Note Event: ", event.target);
        this.props.createNote( {
            content: this.state.value,
            contactId: this.props.viewedContact.id
        });
        this.state.value = '';
    }

    openEditModal(type) {
        if (type === "PERSON") {
            this.setState({showPersonEditModal: true});
        } else {
            this.setState({showOrganizationEditModal: true});
        }
    }

    closeEditModal() {
        this.setState({showPersonEditModal: false});
        this.setState({showOrganizationEditModal: false});
    }

    openActivityModal() {
        this.setState({showModal: true});
    }

    closeActivityModal() {
        this.setState({showModal: false});
    }

    componentDidMount() {
        this.props.getById(this.props.match.params.contactId);
        this.props.getByPersonId(this.props.match.params.contactId);
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
        if (!this.props.viewedContact) {
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
                                    <i className="fa fa-user-circle-o fa-5x" aria-hidden="true"></i>
                                </div>
                                <div className="profile-info">
                                    <div className="m-b-md">
                                        <a onClick={() => this.openEditModal(this.props.viewedContact.type)}
                                           className="btn btn-primary btn-sm pull-right">Edit</a>
                                        <h2 className="no-margins">
                                            {this.props.viewedContact && this.props.viewedContact.name}
                                        </h2>
                                        <h4>{this.props.viewedContact.organization && this.props.viewedContact.organization.name}</h4>

                                    </div>
                                </div>
                            </div>
                            <div>
                                <ContactPerson showEditModal={this.state.showPersonEditModal}
                                               close={this.closeEditModal}
                                               contact={this.props.viewedContact}
                                               initialValues={this.props.viewedContact}
                                />
                            </div>
                            <div>
                                <ContactOrganization showEditModal={this.state.showOrganizationEditModal}
                                                     close={this.closeEditModal}
                                                     contact={this.props.viewedContact}
                                                     initialValues={this.props.viewedContact}
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
                                                                            ></textarea>
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
                                    <div className="ibox-content">
                                        <div id="vertical-timeline"
                                             className="vertical-container dark-timeline center-orientation">
                                            <div className="vertical-timeline-block">
                                                <div className="vertical-timeline-icon navy-bg">
                                                    <i className="fa fa-briefcase"></i>
                                                </div>

                                                <div className="vertical-timeline-content">
                                                    <h2>Meeting</h2>
                                                    <p>Conference on the sales results for the previous year. Monica
                                                        please examine sales trends in marketing and products. Below
                                                        please find the current status of the sale.
                                                    </p>
                                                    <a href="#" className="btn btn-sm btn-primary"> More info</a>
                                                    <span className="vertical-date">
                                        Today <br/>
                                        <small>Dec 24</small>
                                    </span>
                                                </div>
                                            </div>

                                            <div className="vertical-timeline-block">
                                                <div className="vertical-timeline-icon blue-bg">
                                                    <i className="fa fa-file-text"></i>
                                                </div>

                                                <div className="vertical-timeline-content">
                                                    <h2>Send documents to Mike</h2>
                                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting
                                                        industry. Lorem Ipsum has been the industry's standard dummy
                                                        text ever since.</p>
                                                    <a href="#" className="btn btn-sm btn-success"> Download
                                                        document </a>
                                                    <span className="vertical-date">
                                        Today <br/>
                                        <small>Dec 24</small>
                                    </span>
                                                </div>
                                            </div>

                                            <div className="vertical-timeline-block">
                                                <div className="vertical-timeline-icon lazur-bg">
                                                    <i className="fa fa-coffee"></i>
                                                </div>

                                                <div className="vertical-timeline-content">
                                                    <h2>Coffee Break</h2>
                                                    <p>Go to shop and find some products. Lorem Ipsum is simply dummy
                                                        text of the printing and typesetting industry. Lorem Ipsum has
                                                        been the industry's. </p>
                                                    <a href="#" className="btn btn-sm btn-info">Read more</a>
                                                    <span className="vertical-date"> Yesterday <br/><small>Dec 23</small></span>
                                                </div>
                                            </div>

                                            <div className="vertical-timeline-block">
                                                <div className="vertical-timeline-icon yellow-bg">
                                                    <i className="fa fa-phone"></i>
                                                </div>

                                                <div className="vertical-timeline-content">
                                                    <h2>Phone with Jeronimo</h2>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto,
                                                        optio, dolorum provident rerum aut hic quasi placeat iure
                                                        tempora laudantium ipsa ad debitis unde? Iste voluptatibus minus
                                                        veritatis qui ut.</p>
                                                    <span className="vertical-date">Yesterday <br/><small>Dec 23</small></span>
                                                </div>
                                            </div>

                                            <div className="vertical-timeline-block">
                                                <div className="vertical-timeline-icon lazur-bg">
                                                    <i className="fa fa-user-md"></i>
                                                </div>

                                                <div className="vertical-timeline-content">
                                                    <h2>Go to the doctor dr Smith</h2>
                                                    <p>Find some issue and go to doctor. Lorem Ipsum is simply dummy
                                                        text of the printing and typesetting industry. Lorem Ipsum has
                                                        been the industry's standard dummy text ever since the
                                                        1500s. </p>
                                                    <span className="vertical-date">Yesterday <br/><small>Dec 23</small></span>
                                                </div>
                                            </div>

                                            <div className="vertical-timeline-block">
                                                <div className="vertical-timeline-icon navy-bg">
                                                    <i className="fa fa-comments"></i>
                                                </div>

                                                <div className="vertical-timeline-content">
                                                    <h2>Chat with Monica and Sandra</h2>
                                                    <p>Web sites still in their infancy. Various versions have evolved
                                                        over the years, sometimes by accident, sometimes on purpose
                                                        (injected humour and the like). </p>
                                                    <span className="vertical-date">Yesterday <br/><small>Dec 23</small></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="ibox">
                                    <div className="ibox-title">
                                        <i className="fa fa-plus pull-right" aria-hidden="true"></i>
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
                                           })}></i>
                                        <h5>Activities</h5>
                                    </div>
                                    <div className="ibox-content">
                                        <div id="contact-calendar"></div>
                                    </div>
                                </div>
                                <div className="ibox">
                                    <div className="ibox-title">
                                        <i className="fa fa-plus pull-right" aria-hidden="true"></i>
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
                                                contact={this.props.viewedContact}
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
        viewedContact: state.contacts.viewedContact,
        activities: state.activities.items,
        ids: state.activities.ids
    };
}

export default connect(mapStateToProps, {getByPersonId, getById, createNote})(ContactDetail);
