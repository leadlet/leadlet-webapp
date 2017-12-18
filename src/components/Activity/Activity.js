import React, {Component} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';
import draggable from '../../../node_modules/jquery-ui/ui/widgets/draggable';
import fullCalendar from 'fullcalendar';
import ActivityDetail from "./ActivityDetail";
import {getAll, update} from "../../actions/activity.actions";
import moment from 'moment';
import ToggleButton from "react-bootstrap/es/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/es/ToggleButtonGroup";
import '../../../node_modules/fullcalendar/dist/fullcalendar.css';

class Activity extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            activitySelectedForEdit: null,
            selectedType: null
        };

        this.openActivityModal = this.openActivityModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.filterActivity = this.filterActivity.bind(this);
    }

    openActivityModal(activity) {
        this.setState({showModal: true});
        this.setState({activitySelectedForEdit: activity});
    }

    closeModal() {
        this.setState({showModal: false});
    }

    filterActivity = (value) => {
        this.setState({selectedType: value});
    };

    componentDidMount() {
        this.props.getAll();
    }

    componentDidUpdate() {

        if (!this.props.ids) {
            return;
        }

        let events = this.props.ids.map(function (item) {
            return this.props.activities[item];
        }, this);

        if (this.state.selectedType && this.state.selectedType != ' ') {
            events = events.filter(event => (
                event.type === this.state.selectedType
            ));
        }

        const openActivityModal = this.openActivityModal;
        const updateActivity = this.props.update;

        //TODO: fullCalendar her update de render olmamalı.
        if (events) {
            $('#calendar').fullCalendar('destroy');

            $('#calendar').fullCalendar({
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay,listMonth'
                },
                selectable: true,
                selectHelper: true,
                select: function(start, end) {
                    var title = openActivityModal();

                    var eventData;
                    if (title) {
                        eventData = {
                            title: title,
                            start: start,
                            end: end
                        };
                        $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
                    }
                    $('#calendar').fullCalendar('unselect');
                },
                editable: true,
                events,
                eventClick: function (event) {
                    openActivityModal(
                        {
                            id: event.id,
                            title: event.title,
                            start: event.start,
                            end: event.end,
                            memo: event.memo,
                            activityType: event.type,
                            id: event.id,
                            contact: event.personId,
                            organization: event.organizationId
                        }
                    );
                },
                eventDrop: function (event) {

                    let activity = {};
                    activity.id = event.id;
                    activity.start = event.start._d;
                    activity.end = event.end._d;
                    activity.memo = event.memo;
                    activity.type = event.type;
                    activity.title = event.title;
                    activity.personId = event.personId;
                    activity.organizationId = event.organizationId;

                    updateActivity(activity);
                }
            });
        }
    }

    render() {
        return (
            <div className="wrapper wrapper-content">
                <div className="row animated fadeInDown">
                    <div>
                        <div className="ibox float-e-margins">
                            <div className="ibox-title">
                                <div className="ibox-tools">
                                    <button className="btn btn-primary btn-sm" type="button"
                                            onClick={() => this.openActivityModal({
                                                start: moment(),
                                                end: moment()
                                            })}><i
                                        className="fa fa-plus"></i>&nbsp;New Activity
                                    </button>
                                    <div className="pull-left">
                                        <ToggleButtonGroup type="radio" name="activityType"
                                                           onChange={this.filterActivity}>
                                            <ToggleButton className="btn-sm active" value={' '}>All </ToggleButton>
                                            <ToggleButton className="btn-sm" value={'CALL'}><i className="fa fa-phone"></i></ToggleButton>
                                            <ToggleButton className="btn-sm" value={'MEETING'}><i className="fa fa-users"></i></ToggleButton>
                                            <ToggleButton className="btn-sm" value={'TASK'}><i className="fa fa-clock-o"></i></ToggleButton>
                                            <ToggleButton className="btn-sm" value={'DEADLINE'}><i className="fa fa-flag"></i></ToggleButton>
                                            <ToggleButton className="btn-sm" value={'EMAIL'}><i className="fa fa-paper-plane"></i></ToggleButton>
                                        </ToggleButtonGroup>
                                    </div>
                                </div>
                            </div>
                            <div className="ibox-content">
                                <div id="calendar"></div>
                            </div>
                        </div>

                        <div>
                            <ActivityDetail showModal={this.state.showModal}
                                            close={this.closeModal}
                                            initialValues={this.state.activitySelectedForEdit}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activities: state.activities.items,
        ids: state.activities.ids,
    }
}

export default connect(mapStateToProps, {getAll, update})(Activity);
