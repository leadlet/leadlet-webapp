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
    let resultArr = [];
    const contentObj = JSON.parse(content);

    if (Object.keys(contentObj.previous) !== null && Object.keys(contentObj.previous) !== 'undefined') {
        let len = Object.keys(contentObj.current).length;

        for (var i = 0; i < len; i++) {
            if (Object.keys(contentObj.previous)[i] === "title") {
                resultArr.push(Object.values(contentObj.previous)[i] + " --> " + Object.values(contentObj.current)[i]);
            }
            if (Object.keys(contentObj.previous)[i] === "person") {
                resultArr.push(Object.values(contentObj.previous)[i].name + " --> " + Object.values(contentObj.current)[i].name);
            }
            if (Object.keys(contentObj.previous)[i] === "stage") {
                resultArr.push(Object.values(contentObj.previous)[i].name + " --> " + Object.values(contentObj.current)[i].name);
            }
            if (Object.keys(contentObj.previous)[i] === "priority") {
                resultArr.push(Object.values(contentObj.previous)[i] + " --> " + Object.values(contentObj.current)[i]);
            }
            if (Object.keys(contentObj.previous)[i] === "dealValue") {
                resultArr.push(Object.values(contentObj.previous)[i].potentialValue + " --> " + Object.values(contentObj.current)[i].potentialValue);
            }
            if (Object.keys(contentObj.previous)[i] === "pipeline") {
                resultArr.push(Object.values(contentObj.previous)[i].name + " --> " + Object.values(contentObj.current)[i].name);
            }
            if (Object.keys(contentObj.previous)[i] === "agent") {
                resultArr.push(Object.values(contentObj.previous)[i].firstName + " " + Object.values(contentObj.previous)[i].lastName + " --> " + Object.values(contentObj.current)[i].firstName + " " + Object.values(contentObj.current)[i].lastName);
            }
            if (Object.keys(contentObj.previous)[i] === "possibleCloseDate") {
                resultArr.push(moment.unix(Object.values(contentObj.previous)[i]).format("DD.MM.YYYY") + " --> " + moment.unix(Object.values(contentObj.current)[i]).format("DD.MM.YYYY"));
            }
        }
    }

    return resultArr.join(", ");
};

export default DealCreated;