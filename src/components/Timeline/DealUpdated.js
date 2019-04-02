import React from 'react';
import moment from "moment";

const DealCreated = (props) => (
    <div className="tracking-item" key={props.item.id}>
        <div className="tracking-icon">
            <i className="fa fa-bell"/>
        </div>
        <div className="tracking-date">{moment(props.item.createdDate).fromNow()}
        </div>
        <div className="tracking-content">Deal Updated <span>{renderUpdatedFields(props.item.content)}</span></div>

    </div>
);


const renderUpdatedFields = (content) => {
    return <h1>test</h1>;
};

export default DealCreated;