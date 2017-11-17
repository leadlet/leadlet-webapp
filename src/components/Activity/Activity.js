import React, {Component} from 'react';
import $ from 'jquery';
import  draggable from '../../../node_modules/jquery-ui/ui/widgets/draggable';
import fullCalendar from 'fullcalendar';

class Activity extends Component {

    componentDidMount() {

        $(document).ready(function() {
            $('#external-events div.external-event').each(function(index,element) {

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

        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();

        $('#calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            editable: true,
            droppable: true, // this allows things to be dropped onto the calendar
            drop: function() {
                // is the "remove after drop" checkbox checked?
                if ($('#drop-remove').is(':checked')) {
                    // if so, remove the element from the "Draggable Events" list
                    $(this).remove();
                }
            },
            events: [
                {
                    title: 'All Day Event',
                    start: new Date(y, m, 1)
                },
                {
                    title: 'Long Event',
                    start: new Date(y, m, d-5),
                    end: new Date(y, m, d-2)
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: new Date(y, m, d-3, 16, 0),
                    allDay: false
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: new Date(y, m, d+4, 16, 0),
                    allDay: false
                },
                {
                    title: 'Meeting',
                    start: new Date(y, m, d, 10, 30),
                    allDay: false
                },
                {
                    title: 'Lunch',
                    start: new Date(y, m, d, 12, 0),
                    end: new Date(y, m, d, 14, 0),
                    allDay: false
                },
                {
                    title: 'Birthday Party',
                    start: new Date(y, m, d+1, 19, 0),
                    end: new Date(y, m, d+1, 22, 30),
                    allDay: false
                },
                {
                    title: 'Click for Google',
                    start: new Date(y, m, 28),
                    end: new Date(y, m, 29),
                    url: 'http://google.com/'
                }
            ]
        });
    }

    render() {
        return (
            <div className="wrapper wrapper-content">
                <div className="row animated fadeInDown">
                    <div className="col-lg-3">
                        <div className="ibox float-e-margins">
                            <div className="ibox-title">
                                <h5>Draggable Events</h5>
                                <div className="ibox-tools">
                                    <a className="collapse-link">
                                        <i className="fa fa-chevron-up"></i>
                                    </a>
                                    <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                                        <i className="fa fa-wrench"></i>
                                    </a>
                                    <ul className="dropdown-menu dropdown-user">
                                        <li><a href="#">Config option 1</a>
                                        </li>
                                        <li><a href="#">Config option 2</a>
                                        </li>
                                    </ul>
                                    <a className="close-link">
                                        <i className="fa fa-times"></i>
                                    </a>
                                </div>
                            </div>
                            <div className="ibox-content">
                                <div id='external-events'>
                                    <p>Drag a event and drop into callendar.</p>
                                    <div className="external-event navy-bg">Go to shop and buy some products.</div>
                                    <div className="external-event navy-bg">Check the new CI from Corporation.</div>
                                    <div className="external-event navy-bg">Send documents to John.</div>
                                    <div className="external-event navy-bg">Phone to Sandra.</div>
                                    <div className="external-event navy-bg">Chat with Michael.</div>
                                    <p className="m-t">
                                        <input type='checkbox' id='drop-remove' className="i-checks" checked/> <label>remove after drop</label>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="ibox float-e-margins">
                            <div className="ibox-content">
                                <h2>FullCalendar</h2> is a jQuery plugin that provides a full-sized, drag & drop
                                calendar like the one below. It uses AJAX to fetch events on-the-fly for each month and
                                is
                                easily configured to use your own feed format (an extension is provided for Google
                                Calendar).
                                <p>
                                    <a href="http://arshaw.com/fullcalendar/" target="_blank">FullCalendar
                                        documentation</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="ibox float-e-margins">
                            <div className="ibox-title">
                                <h5>Striped Table </h5>
                                <div className="ibox-tools">
                                    <a className="collapse-link">
                                        <i className="fa fa-chevron-up"></i>
                                    </a>
                                    <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                                        <i className="fa fa-wrench"></i>
                                    </a>
                                    <ul className="dropdown-menu dropdown-user">
                                        <li><a href="#">Config option 1</a>
                                        </li>
                                        <li><a href="#">Config option 2</a>
                                        </li>
                                    </ul>
                                    <a className="close-link">
                                        <i className="fa fa-times"></i>
                                    </a>
                                </div>
                            </div>
                            <div className="ibox-content">
                                <div id="calendar"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Activity;