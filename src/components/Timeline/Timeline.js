import React, {Component} from 'react';
import moment from 'moment';
import connect from "react-redux/es/connect/connect";
import Waypoint from 'react-waypoint';
import {resetTimelines} from "../../actions/timeline.actions";


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
    }

    componentWillUnmount(){
        this.props.resetTimelines();
    }

    componentDidMount() {
        console.log("component mount: " + this.props.itemId);
        this.loadMoreItems();
    }

    loadMoreItems() {
        this.props.getTimelineItems(null, this.state.currentPage, this.PAGE_SIZE, this.props.itemId);
    }

    renderTimelineItems() {
        return (
            <div>
                {this.props.timeLineIds.map(timelineId => {
                    const timelineItem = this.props.timeLines[timelineId];

                    if (timelineItem.type === 'NOTE_CREATED') {
                        return (
                            <div key={timelineId} className="vertical-timeline-block">
                                <div className="vertical-timeline-icon navy-bg">
                                    <i className="fa fa-sticky-note-o" aria-hidden="true"/>
                                </div>

                                <div className="vertical-timeline-content">
                                    <h2>Note</h2>
                                    <p>
                                        {timelineItem.source.content}
                                    </p>
                                    <span className="vertical-date">
                                        {moment(timelineItem.createdDate).format('HH:mm').toString()} <br/>
                                        <small>{moment(timelineItem.createdDate).format('DD-MMM-YYYY').toString()}</small>
                    </span>
                                </div>
                            </div>

                        )
                    } else if (timelineItem.type === 'ACTIVITY_CREATED' && timelineItem.source.type === "CALL") {
                        return (
                            <div key={timelineId} className="vertical-timeline-block">
                                <div className="vertical-timeline-icon navy-bg">
                                    <i className="fa fa-phone"/>
                                </div>

                                <div className="vertical-timeline-content">
                                    <h2>{timelineItem.source.title}</h2>
                                    <p>
                                        {timelineItem.source.memo}
                                    </p>
                                    <span className="vertical-date">
                                        {moment(timelineItem.createdDate).format('HH:mm').toString()} <br/>
                                        <small>{moment(timelineItem.createdDate).format('DD-MMM-YYYY').toString()}</small>
                    </span>
                                </div>
                            </div>
                        );
                    } else if (timelineItem.type === 'ACTIVITY_CREATED' && timelineItem.source.type === "MEETING") {
                        return (
                            <div key={timelineId} className="vertical-timeline-block">
                                <div className="vertical-timeline-icon navy-bg">
                                    <i className="fa fa-users"/>
                                </div>

                                <div className="vertical-timeline-content">
                                    <h2>{timelineItem.source.title}</h2>
                                    <p>
                                        {timelineItem.source.memo}
                                    </p>
                                    <span className="vertical-date">
                                        {moment(timelineItem.createdDate).format('HH:mm').toString()} <br/>
                                        <small>{moment(timelineItem.createdDate).format('DD-MMM-YYYY').toString()}</small>
                    </span>
                                </div>
                            </div>
                        );
                    } else if (timelineItem.type === 'ACTIVITY_CREATED' && timelineItem.source.type === "TASK") {
                        return (
                            <div key={timelineId} className="vertical-timeline-block">
                                <div className="vertical-timeline-icon navy-bg">
                                    <i className="fa fa-clock-o"/>
                                </div>

                                <div className="vertical-timeline-content">
                                    <h2>{timelineItem.source.title}</h2>
                                    <p>
                                        {timelineItem.source.memo}
                                    </p>
                                    <span className="vertical-date">
                                        {moment(timelineItem.createdDate).format('HH:mm').toString()} <br/>
                                        <small>{moment(timelineItem.createdDate).format('DD-MMM-YYYY').toString()}</small>
                    </span>
                                </div>
                            </div>
                        );
                    } else if (timelineItem.type === 'ACTIVITY_CREATED' && timelineItem.source.type === "DEADLINE") {
                        return (
                            <div key={timelineId} className="vertical-timeline-block">
                                <div className="vertical-timeline-icon navy-bg">
                                    <i className="fa fa-flag"/>
                                </div>

                                <div className="vertical-timeline-content">
                                    <h2>{timelineItem.source.title}</h2>
                                    <p>
                                        {timelineItem.source.memo}
                                    </p>
                                    <span className="vertical-date">
                                        {moment(timelineItem.createdDate).format('HH:mm').toString()} <br/>
                                        <small>{moment(timelineItem.createdDate).format('DD-MMM-YYYY').toString()}</small>
                    </span>
                                </div>
                            </div>
                        );
                    } else if (timelineItem.type === 'ACTIVITY_CREATED' && timelineItem.source.type === "EMAIL") {
                        return (
                            <div key={timelineId} className="vertical-timeline-block">
                                <div className="vertical-timeline-icon navy-bg">
                                    <i className="fa fa-paper-plane"/>
                                </div>

                                <div className="vertical-timeline-content">
                                    <h2>{timelineItem.source.title}</h2>
                                    <p>
                                        {timelineItem.source.memo}
                                    </p>
                                    <span className="vertical-date">
                                        {moment(timelineItem.createdDate).format('HH:mm').toString()} <br/>
                                        <small>{moment(timelineItem.createdDate).format('DD-MMM-YYYY').toString()}</small>
                    </span>
                                </div>
                            </div>
                        );
                    } else {
                        return (
                            <em>Loading...</em>
                        );
                    }
                })}
            </div>
        );
    }

    _handleWaypointEnter(waypointUpdate) {
        if (this.props.timeLineIds.length !== this.props.dataTotalSize) {
            this.setState({currentPage: this.state.currentPage + 1},
                this.loadMoreItems)
        }
    }

    render() {
        if (this.props.timeLineIds && this.props.timeLineIds.length > 0)
        {
            return (
                <div className="ibox-content">
                    <div id="vertical-timeline"
                         className="vertical-container dark-timeline center-orientation full-height">
                        <div>
                            {this.renderTimelineItems()}
                            <Waypoint
                                onEnter={this._handleWaypointEnter}
                            />
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div></div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        timeLines: state.timeLines.items,
        timeLineIds: state.timeLines.ids,
        dataTotalSize: state.timeLines.dataTotalSize
    };
}

export default connect(mapStateToProps,{
    resetTimelines
})(Timeline);
