import React from 'react';
import moment from "moment";
import * as _ from "lodash";

const DealUpdated = (props) => (
    <div className="tracking-item" key={props.item.id}>
        <div className="tracking-icon">
            <i className="fa fa-bell"/>
        </div>
        <div className="tracking-date">{moment(props.item.createdDate).fromNow()}
        </div>
        <div className="tracking-content">{renderUpdatedFields(props.item)}</div>

    </div>
);

const renderFieldChange = (changedField) => {
    if(changedField.fieldName === "title"){
        return <li><b>Title</b> changed from &nbsp;
                <b>"{changedField.oldValue}"</b>&nbsp;to&nbsp;
                <b>"{changedField.newValue}"</b></li>;
    } else if(changedField.fieldName === "deal_value"){
        return (<li><b>Deal Value</b> changed from &nbsp;
                <b>"{changedField.oldValue.potentialValue}"</b>&nbsp;to&nbsp;
                <b>"{changedField.newValue.potentialValue}"</b></li>);
    } else if(changedField.fieldName === "stage"){
        return (<li><b>Stage</b> changed from&nbsp;
            <b>"{changedField.oldValue.name}"</b>&nbsp;to&nbsp;
            <b>"{changedField.newValue.name}"</b></li>);
    } else if(changedField.fieldName === "contact"){
        return (<li><b>Contact</b> changed from&nbsp;
            <b>"{ _.get(changedField, "oldValue.name", "-") }"</b>&nbsp;to&nbsp;
            <b>"{ _.get(changedField, "newValue.name", "-") }"</b></li>);
    } else if(changedField.fieldName === "agent"){
        return (<li><b>Agent</b> changed from&nbsp;
            <b>"{changedField.oldValue.firstName} {changedField.oldValue.lastName}"</b>&nbsp;to
            <b>"{changedField.newValue.firstName} {changedField.newValue.lastName}"</b></li>);
    } else if(changedField.fieldName === "possible_close_date"){
        return (<li><b>Possible Close Date</b> changed from&nbsp;
            <b>"{ changedField.oldValue ? moment(changedField.oldValue).format("DD.MM.YYYY"):'-'}"</b>
            &nbsp;to&nbsp;<b>"{ changedField.newValue ? moment(changedField.newValue).format("DD.MM.YYYY"):'-'}"</b></li>);
    } else if(changedField.fieldName === "deal_source"){
        return (<li><b>Source</b> changed from&nbsp;
            <b>"{changedField.oldValue ? changedField.oldValue.name: '-'}"</b>&nbsp;to&nbsp;
            <b>"{changedField.newValue? changedField.newValue.name: '-'}"</b></li>);
    } else if(changedField.fieldName === "deal_channel"){
        return (<li><b>Channel</b> changed from&nbsp;
            <b>"{ _.get(changedField, "oldValue.name", '-') }"</b>&nbsp;to&nbsp;
            <b>"{changedField.newValue? changedField.newValue.name: '-'}"</b></li>);
    } else if(changedField.fieldName === "products"){
        return (<li><b>Products</b> updated</li>);
    } else if(changedField.fieldName === "deal_status") {
        return (<li><b>Status</b> changed from&nbsp;
            <b>"{changedField.oldValue}"</b>&nbsp;to&nbsp;
            <b>"{changedField.newValue}"</b></li>);
    } else {
        console.log(changedField);
    }
};

const renderUpdatedFields = (item) => {
    const changeLogArray = JSON.parse(item.content);
    return (<div>
                <p>{changeLogArray.length} fields are updated by <u>{item.agent.firstName + " " + item.agent.lastName}</u></p>
                <ul>
                    {changeLogArray.map(renderFieldChange)}
                </ul>
            </div>);
};

export default DealUpdated;