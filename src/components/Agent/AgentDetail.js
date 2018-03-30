import React, {Component} from 'react';
import '../../../node_modules/fullcalendar/dist/fullcalendar.css';
import connect from "react-redux/es/connect/connect";
import Timeline from "../Timeline/Timeline";
import moment from 'moment';
import EditOrCreateActivity from "../Activity/EditOrCreateActivity";
import {getUserById} from "../../actions/user.actions";
import {getTimelineByUserId, getTimelineByUserIdAndRefresh} from "../../actions/timeline.actions";
import {createNote} from "../../actions/note.actions";
import CreateEditAgent from "./CreateEditAgent";
import {getActivitiesByAgentId} from "../../actions/activity.actions";
import $ from "jquery";
import CreateObjective from "../Objective/CreateObjective";
import {getObjectivesByUserId} from "../../actions/objective.actions";


class AgentDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: '',
            isAgentModalVisible: false,
            isActivityModalVisible: false,
            isEditObjectiveModalVisible: false
        };

        this.openActivityModal = this.openActivityModal.bind(this);
        this.closeActivityModal = this.closeActivityModal.bind(this);
        this.openEditAgentModal = this.openEditAgentModal.bind(this);
        this.closeAgentModal = this.closeAgentModal.bind(this);
        this.refreshTimeline = this.refreshTimeline.bind(this);
        this.openObjectiveModal = this.openObjectiveModal.bind(this);
        this.closeObjectiveModal = this.closeObjectiveModal.bind(this);
    }

    openObjectiveModal() {
        this.setState({
            isEditObjectiveModalVisible: true
        });
    }

    closeObjectiveModal() {
        this.setState({
            isEditObjectiveModalVisible: false
        });
    }

    renderAgentObjectivesAmount(userObjectives) {
        return userObjectives.map(userObjective => {
            return userObjective.items.map(item => {
                return (
                    <tr>
                        <td>{item.name}</td>
                        <td>
                            <span className="pie">{item.dailyAmount}</span>
                        </td>
                        <td>
                            <span className="pie">{item.weeklyAmount}</span>
                        </td>
                        <td>
                            <span className="pie">{item.monthlyAmount}</span>
                        </td>
                    </tr>
                )
            });
        });
    }

    refreshTimeline() {
        this.props.getTimelineByUserIdAndRefresh(null, null, null, this.props.viewedUser.id)
    }

    closeAgentModal() {
        this.setState({
            isAgentModalVisible: false
        });
    }

    openEditAgentModal() {
        this.setState({
            isAgentModalVisible: true
        });
    }

    componentDidMount() {
        this.props.getUserById(this.props.match.params.userId);
        this.props.getActivitiesByAgentId(this.props.match.params.userId);
        this.props.getObjectivesByUserId(this.props.match.params.userId);
    }

    componentDidUpdate() {

        if (!this.props.ids) {
            return;
        }

        let events = this.props.ids.map(function (item) {
            return this.props.activities[item];
        }, this);

        console.log("EVENTS: ", events);
        if (events) {
            $('#contact-calendar').fullCalendar('destroy');

            $('#contact-calendar').fullCalendar({
                header: {
                    left: 'prev,next',
                    right: 'listDay,listWeek'
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
                timezone: 'local',
                events
            });
        }
    }

    openActivityModal() {
        this.setState({isActivityModalVisible: true});
    }

    closeActivityModal() {
        this.setState({isActivityModalVisible: false});
    }

    render() {
        const user = this.props.viewedUser;

        if (!user) {
            return (
                <em>Loading details for {this.props.match.params.userId}</em>
            );
        } else {

            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="row">
                                <div className="ibox">
                                    <div className="ibox-content info-card">
                                        <div className="row">
                                            <dl className="dl-horizontal">
                                                <dt>First Name:</dt>
                                                <dd>{user.firstName}</dd>
                                                <dt>Last Name:</dt>
                                                <dd>{user.lastName}</dd>
                                                <dt>Email:</dt>
                                                <dd>{user.login}</dd>
                                            </dl>
                                        </div>
                                        <div className="row">
                                            <button onClick={this.openEditAgentModal}
                                                    className="btn btn-white btn-xs pull-right">Edit Agent
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="ibox">
                                    <div className="ibox-title">
                                        <i className="fa fa-plus pull-right" aria-hidden="true"
                                           onClick={() => this.openActivityModal({
                                               start: moment(),
                                               end: moment()
                                           })}
                                        />
                                        <h5>Activities</h5>
                                    </div>
                                    <div className="ibox-content">
                                        <div id="contact-calendar"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="row">
                                <div className="ibox">
                                    <div className="ibox-title">
                                        <h5>Objectives</h5>
                                        <button className="btn btn-primary btn-xs pull-right" aria-hidden="true"
                                                onClick={() => this.openObjectiveModal()}>Add objective
                                        </button>
                                    </div>
                                    <div className="ibox-content">
                                        <table className="table table-hover">
                                            <thead>
                                            <tr>
                                                <th>Action Name</th>
                                                <th>Daily</th>
                                                <th>Weekly</th>
                                                <th>Monthly</th>
                                            </tr>
                                            </thead>
                                            <tbody>

                                            {this.renderAgentObjectivesAmount(this.props.objectives)}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="ibox">
                                    <Timeline
                                        pageSize={5}
                                        getTimelineItems={this.props.getTimelineByUserId}
                                        itemId={this.props.viewedUser.id}
                                    />
                                </div>
                            </div>
                        </div>
                        {
                            this.state.isAgentModalVisible &&
                            <CreateEditAgent showModal={this.state.isAgentModalVisible}
                                             close={this.closeAgentModal}
                                             initialValues={this.props.viewedUser}
                            />
                        }
                        {
                            this.state.isActivityModalVisible &&
                            <EditOrCreateActivity showModal={this.state.isActivityModalVisible}
                                                  close={this.closeActivityModal}
                                                  initialValues={{userId: this.props.viewedUser.id}}
                                                  showDealSelection={true}
                                                  createCallback={this.refreshTimeline}
                            />
                        }
                        {
                            this.state.isEditObjectiveModalVisible &&
                            <CreateObjective showModal={this.state.isEditObjectiveModalVisible}
                                             close={this.closeObjectiveModal}
                                             initialValues={{
                                                 userId: this.props.match.params.userId
                                             }}
                            />
                        }


                    </div>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        viewedUser: state.users.viewedUser,
        activities: state.activities.items,
        ids: state.activities.ids,
        objectives: state.objectives.userObjectives
    };
}

export default connect(mapStateToProps, {
    getUserById,
    createNote,
    getTimelineByUserId,
    getTimelineByUserIdAndRefresh,
    getActivitiesByAgentId,
    getObjectivesByUserId
})(AgentDetail);
