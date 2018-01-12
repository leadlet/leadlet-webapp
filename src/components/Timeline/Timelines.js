import React from 'react';
import moment from 'moment';

export const Timeline = function (props) {

    const {timeLines, timeLineIds} = props;

    if (!timeLines) {
        return (<em> Loading... </em>);
    }

    function renderTimeline() {
        return (
            <div>
                {timeLineIds.map(timelineId => {
                    const timelineItem = timeLines[timelineId];
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

    return (
        <div>
            <div className="timeline-class">
                {renderTimeline()}
            </div>
        </div>
    );
}