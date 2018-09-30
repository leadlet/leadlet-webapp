import React from 'react';
import moment from "moment";

const NoteCreated = (props) => (
    <div className="tracking-item" key={props.item.id}>
        <div className="tracking-icon">
            <i className="fa fa-comment"/>
        </div>
        <div className="tracking-date">{moment(props.item.createdDate).fromNow()}
        </div>
        <div className="tracking-content">Note Created<span>{props.item.source.content}</span></div>
    </div>
);

export default NoteCreated;