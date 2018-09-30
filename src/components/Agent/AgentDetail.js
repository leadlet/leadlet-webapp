import React, {Component} from 'react';
import '../../../node_modules/fullcalendar/dist/fullcalendar.css';
import connect from "react-redux/es/connect/connect";
import Timeline from "../Timeline/Timeline";
import moment from 'moment';
import EditOrCreateActivity from "../Activity/EditOrCreateActivity";
import {getUserById} from "../../actions/user.actions";
import {createNote} from "../../actions/note.actions";
import CreateEditAgent from "./CreateEditAgent";
import {getActivitiesByAgentId} from "../../actions/activity.actions";

class AgentDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: '',
            isAgentModalVisible: false,
            isActivityModalVisible: false,
        };

        this.openActivityModal = this.openActivityModal.bind(this);
        this.closeActivityModal = this.closeActivityModal.bind(this);
        this.openEditAgentModal = this.openEditAgentModal.bind(this);
        this.closeAgentModal = this.closeAgentModal.bind(this);
        this.refreshTimeline = this.refreshTimeline.bind(this);
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
    }

    componentDidUpdate() {

        if (!this.props.ids) {
            return;
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
                        <div className="col-md-9">


                            <div className="ibox">
                                <Timeline/>
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
        ids: state.activities.ids
    };
}

export default connect(mapStateToProps, {
    getUserById,
    createNote,
    getActivitiesByAgentId
})(AgentDetail);
