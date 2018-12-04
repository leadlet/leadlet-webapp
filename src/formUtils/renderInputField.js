import React from 'react';

const renderInputField = (props) => (
    <div className="form-group">
        <label>{props.label}</label>
        <input {...props.input} placeholder={props.label} type={props.type} className="form-control"/>
        <span style={{color: "red"}} className="help-block m-b-none">
                {props.meta.touched && ((props.meta.error && <span>{props.meta.error}</span>))}
            </span>
    </div>
);

export default renderInputField;
