import React from 'react';
import Select from '../../node_modules/react-select';
import 'react-select/dist/react-select.css';

const renderSelectField = (props) => (
    <div className="form-group">
        <label>{props.label}</label>
        <Select
            {...props.input}
            closeOnSelect={true}
            disabled={false}
            multi={props.multi}
            placeholder={props.placeholder}
            options={props.options}
            removeSelected={true}
            rtl={false}
            onChange={props.input.onChange}
            value={props.input.value}
            simpleValue
            onBlur={() => props.input.onBlur(props.input.value)}
        />
        <span className="help-block m-b-none">
                {props.meta.touched && ((props.meta.error && <span>{props.meta.error}</span>))}
            </span>
    </div>
);

export default renderSelectField;
