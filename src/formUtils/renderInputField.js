import React from 'react';

const renderInputField = (props) => (
    <div className="form-group">
            <label>{props.label}</label>
            <input {...props.input} placeholder={props.label} type={props.type} className="form-control"/>
            <span className="help-block m-b-none">
                {props.touched && ((props.error && <span>{props.error}</span>))}
            </span>
    </div>
);

export default renderInputField;
