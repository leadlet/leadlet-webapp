import React, {Component} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';
import draggable from '../../../node_modules/jquery-ui/ui/widgets/draggable';
import fullCalendar from 'fullcalendar';
import ActivityDetail from "./ActivityDetail";
import {getAll} from "../../actions/activity.actions";

class  Activity extends Component {

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

    filterActivity(activityType){
        this.setState({selectedType: activityType});
    }

    componentDidMount() {

        $(document).ready(function () {
            $('#external-events div.external-event').each(function (index, element) {

                // store data so the calendar knows to render an event upon drop
                $(element).data('event', {
                    title: $.trim($(element).text()), // use the element's text as the event title
                    stick: true // maintain when user navigates (see docs on the renderEvent method)
                });

                // make the event draggable using jQuery UI
                $(element).draggable({
                    zIndex: 1111999,
                    revert: true,      // will cause the event to go back to its
                    revertDuration: 0  //  original position after the drag
                });

            });

        });

        this.props.getAll();
    }

    componentDidUpdate() {

        if( !this.props.ids ){
            return;
        }

        let events = this.props.ids.map(function(item) {
            return  this.props.activities[item];
        }, this);

        if( this.state.selectedType && this.state.selectedType != ' '){
            events = events.filter( event => (
                event.type === this.state.selectedType
            ));
        }if(this.state.selectedType === ' '){
            this.props.getAll;
        }

        const openActivityModal = this.openActivityModal;


        //TODO: fullCalendar her update de render olmamalı.
        if (events) {
            $('#calendar').fullCalendar('destroy');

            $('#calendar').fullCalendar({
                aspectRatio: 3,
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                editable: true,
                droppable: true, // this allows things to be dropped onto the calendar
                drop: function () {
                    // is the "remove after drop" checkbox checked?
                    if ($('#drop-remove').is(':checked')) {
                        // if so, remove the element from the "Draggable Events" list
                        $(this).remove();
                    }
                },
                events,
                eventClick: function (event) {
                    openActivityModal(
                        {
                            title: event.title,
                            start: event.start,
                            end:event.end,
                            memo: event.memo,
                            type: event.type,
                            id: event.id
                        }
                    );
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
                                            onClick={this.openActivityModal}><i
                                        className="fa fa-plus"></i>&nbsp;New Activity
                                    </button>
                                    <div className="pull-left">
                                        <button type="button" className="btn btn-sm btn-white" onClick={() => this.filterActivity(' ')}>All</button>
                                        <button type="button" className="btn btn-sm btn-white" onClick={() => this.filterActivity('CALL')}><i
                                            className="fa fa-phone"></i></button>
                                        <button type="button" className="btn btn-sm btn-white" onClick={() => this.filterActivity('MEETING')}><i
                                            className="fa fa-users"></i></button>
                                        <button type="button" className="btn btn-sm btn-white" onClick={() => this.filterActivity('TASK')}><i
                                            className="fa fa-clock-o"></i></button>
                                        <button type="button" className="btn btn-sm btn-white" onClick={() => this.filterActivity('DEADLINE')}><i
                                            className="fa fa-flag"></i></button>
                                        <button type="button" className="btn btn-sm btn-white" onClick={() => this.filterActivity('EMAIL')}><i
                                            className="fa fa-paper-plane"></i></button>
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

export default connect(mapStateToProps, {getAll})(Activity);
