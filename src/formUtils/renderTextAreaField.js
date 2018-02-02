import React from 'react';

const renderTextAreaField = (props) => (
    <div className="form-group">
            <label>{props.label}</label>
            <textarea
                {...props.input}
                placeholder={props.label}
                className="form-control"
                rows={props.rows}
            />
            <span className="help-block m-b-none">
                {props.meta.touched && ((props.meta.error && <span>{props.meta.error}</span>))}
            </span>
    </div>
);

export default renderTextAreaField;
