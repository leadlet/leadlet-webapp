import React, {Component} from 'react';
import moment from 'moment';
import connect from "react-redux/es/connect/connect";
import {getPaginated} from "../../actions/timeline.actions";
import Waypoint from 'react-waypoint';


class Timeline extends Component {

    PAGE_SIZE = 5;

    constructor(props) {
        super(props);

        this.state = {
            currentPage: 0
        };

        this.renderTimelineItems = this.renderTimelineItems.bind(this);
        this.loadMoreItems = this.loadMoreItems.bind(this);

        this._handleWaypointEnter = this._handleWaypointEnter.bind(this);
        this._handleWaypointLeave = this._handleWaypointLeave.bind(this);
    }

    componentDidMount() {
        this.loadMoreItems();
    }

    loadMoreItems() {
        this.props.getPaginated(null, this.state.currentPage, this.PAGE_SIZE);
    }

    renderTimelineItems() {
        return (
            <div>
                {this.props.timeLineIds.map(timelineId => {
                    const timelineItem = this.props.timeLines[timelineId];

                    if (timelineItem.type === 'NOTE_CREATED') {
                        return (
                            <div className="vertical-timeline-block">
                                <div className="vertical-timeline-icon navy-bg">
                                    <i className="fa fa-sticky-note-o" aria-hidden="true"/>
                                </div>

                                <div className="vertical-timeline-content">
                                    <h2>Note</h2>
                                    <p>
                                        {timelineItem.source.content}
                                    </p>
                                    <a href="#" className="btn btn-sm btn-primary"> More info</a>
                                    <span className="vertical-date">
                                        {moment(timelineItem.createdDate).format('HH:MM').toString()} <br/>
                                        <small>{moment(timelineItem.createdDate).format('DD-MMM-YYYY').toString()}</small>
                    </span>
                                </div>
                            </div>

                        )
                    } else if (timelineItem.type === 'ACTIVITY_CREATED' && timelineItem.source.type === "CALL") {
                        return (
                            <div className="vertical-timeline-block">
                                <div className="vertical-timeline-icon navy-bg">
                                    <i className="fa fa-phone"></i>
                                </div>

                                <div className="vertical-timeline-content">
                                    <h2>{timelineItem.source.title}</h2>
                                    <p>
                                        {timelineItem.source.memo}
                                    </p>
                                    <a href="#" className="btn btn-sm btn-primary"> More info</a>
                                    <span className="vertical-date">
                                        {moment(timelineItem.createdDate).format('HH:MM').toString()} <br/>
                                        <small>{moment(timelineItem.createdDate).format('DD-MMM-YYYY').toString()}</small>
                    </span>
                                </div>
                            </div>
                        );
                    } else if (timelineItem.type === 'ACTIVITY_CREATED' && timelineItem.source.type === "MEETING") {
                        return (
                            <div className="vertical-timeline-block">
                                <div className="vertical-timeline-icon navy-bg">
                                    <i className="fa fa-users"></i>
                                </div>

                                <div className="vertical-timeline-content">
                                    <h2>{timelineItem.source.title}</h2>
                                    <p>
                                        {timelineItem.source.memo}
                                    </p>
                                    <a href="#" className="btn btn-sm btn-primary"> More info</a>
                                    <span className="vertical-date">
                                        {moment(timelineItem.createdDate).format('HH:MM').toString()} <br/>
                                        <small>{moment(timelineItem.createdDate).format('DD-MMM-YYYY').toString()}</small>
                    </span>
                                </div>
                            </div>
                        );
                    } else if (timelineItem.type === 'ACTIVITY_CREATED' && timelineItem.source.type === "TASK") {
                        return (
                            <div className="vertical-timeline-block">
                                <div className="vertical-timeline-icon navy-bg">
                                    <i className="fa fa-clock-o"></i>
                                </div>

                                <div className="vertical-timeline-content">
                                    <h2>{timelineItem.source.title}</h2>
                                    <p>
                                        {timelineItem.source.memo}
                                    </p>
                                    <a href="#" className="btn btn-sm btn-primary"> More info</a>
                                    <span className="vertical-date">
                                        {moment(timelineItem.createdDate).format('HH:MM').toString()} <br/>
                                        <small>{moment(timelineItem.createdDate).format('DD-MMM-YYYY').toString()}</small>
                    </span>
                                </div>
                            </div>
                        );
                    } else if (timelineItem.type === 'ACTIVITY_CREATED' && timelineItem.source.type === "DEADLINE") {
                        return (
                            <div className="vertical-timeline-block">
                                <div className="vertical-timeline-icon navy-bg">
                                    <i className="fa fa-flag"></i>
                                </div>

                                <div className="vertical-timeline-content">
                                    <h2>{timelineItem.source.title}</h2>
                                    <p>
                                        {timelineItem.source.memo}
                                    </p>
                                    <a href="#" className="btn btn-sm btn-primary"> More info</a>
                                    <span className="vertical-date">
                                        {moment(timelineItem.createdDate).format('HH:MM').toString()} <br/>
                                        <small>{moment(timelineItem.createdDate).format('DD-MMM-YYYY').toString()}</small>
                    </span>
                                </div>
                            </div>
                        );
                    } else if (timelineItem.type === 'ACTIVITY_CREATED' && timelineItem.source.type === "EMAIL") {
                        return (
                            <div className="vertical-timeline-block">
                                <div className="vertical-timeline-icon navy-bg">
                                    <i className="fa fa-paper-plane"></i>
                                </div>

                                <div className="vertical-timeline-content">
                                    <h2>{timelineItem.source.title}</h2>
                                    <p>
                                        {timelineItem.source.memo}
                                    </p>
                                    <a href="#" className="btn btn-sm btn-primary"> More info</a>
                                    <span className="vertical-date">
                                        {moment(timelineItem.createdDate).format('HH:MM').toString()} <br/>
                                        <small>{moment(timelineItem.createdDate).format('DD-MMM-YYYY').toString()}</small>
                    </span>
                                </div>
                            </div>
                        );
                    }
                })}
            </div>
        );
    }

    _handleWaypointEnter(waypointUpdate) {
        console.log("hede", waypointUpdate);
    }

    _handleWaypointLeave(waypointUpdate) {
        this.setState({currentPage: this.state.currentPage + 1},
            this.loadMoreItems())
    }

    render() {
        if (!this.props.timeLineIds) {
            return (
                <em>Loading Timeline Items</em>
            );
        } else {
            return (
                <div style={{height: '500px', overflowY: 'scroll'}}>
                    {this.renderTimelineItems()}
                    <Waypoint
                        onEnter={this._handleWaypointEnter}
                        onLeave={this._handleWaypointLeave}
                    />
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        timeLines: state.timeLines.items,
        timeLineIds: state.timeLines.ids
    };
}

export default connect(mapStateToProps, {getPaginated})(Timeline);
