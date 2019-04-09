import React from 'react';
import Select from '../../node_modules/react-select';
import 'react-select/dist/react-select.css';
import moment from 'moment';

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
            value={props.input.value || findDuration(props.startDate, props.endDate)}
            simpleValue
            onBlur={() => props.input.onBlur(props.input.value)}
        />
        <span className="help-block m-b-none">
                {props.meta.touched && ((props.meta.error && <span>{props.meta.error}</span>))}
            </span>
    </div>
);

function findDuration (startDate, endDate){
    if(startDate && endDate){
        var duration = moment.duration(endDate.diff(startDate));
        var minutes = duration.asMinutes();
        return minutes;
    }
    else return 15;

}

export default renderSelectField;
