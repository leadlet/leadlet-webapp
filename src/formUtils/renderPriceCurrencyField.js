import React from 'react';

const renderPriceCurrenctField = (props) => (
    <div className="form-group">
        <label>{props.label}</label>
        <input {...props.dealValue.potentialValue.input}
               placeholder={props.label}
               type="number"
               className="form-control" />
        <span className="help-block m-b-none">
                {props.dealValue.potentialValue.touched
                    && ((props.dealValue.potentialValue.error
                    && <span>{props.dealValue.potentialValue.error}</span>))}
            </span>
    </div>
);

export default renderPriceCurrenctField;


