import React from 'react';
import moment from "moment";

const UpcomingActivity = (props) => (
    <div className="tracking-item" key={props.item.id}>
        <div className="tracking-icon">
            <i className="fa fa-bell"/>
        </div>
        <div className="tracking-date">{moment(props.item.start).fromNow()}
        </div>
        <div className="tracking-content">Upcoming Activity<span>{props.item.title}</span></div>
    </div>
);

export default UpcomingActivity;