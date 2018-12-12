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

    const contentObj = JSON.parse(content);
    let resultArr = [];

    if (Object.keys(contentObj.previous) !== null && Object.keys(contentObj.previous) !== 'undefined') {
        let len = Object.keys(contentObj.previous).length;

        for (var i = 0; i < len; i++) {
            resultArr.push(Object.values(contentObj.previous)[i] + " --> " + Object.values(contentObj.current)[i]);
        }
    }

    return resultArr.join(", ");
};

export default DealCreated;