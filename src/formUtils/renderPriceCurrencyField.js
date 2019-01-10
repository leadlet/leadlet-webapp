import React from 'react';

const renderPriceCurrenctField = (props) => (
    <div className="form-group">
        <label>{props.label}</label>
        <input {...props.deal_value.potentialValue.input}
               placeholder={props.label}
               type="number"
               className="form-control" />
        <span className="help-block m-b-none">
                {props.deal_value.potentialValue.touched
                    && ((props.deal_value.potentialValue.error
                    && <span>{props.deal_value.potentialValue.error}</span>))}
            </span>
    </div>
);

export default renderPriceCurrenctField;


