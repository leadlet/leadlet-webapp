import React from 'react';

const renderInputFieldRow = (props) => (
    <div className="form-group">

        <div className={props.type}>
            <label><input type={props.type}/>{props.label}</label>
        </div>

        <span style={{color: "red"}} className="help-block m-b-none">
                {props.meta.touched && ((props.meta.error && <span>{props.meta.error}</span>))}
            </span>
    </div>
);

export default renderInputFieldRow;
