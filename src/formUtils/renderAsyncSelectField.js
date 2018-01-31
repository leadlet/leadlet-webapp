import React from 'react';
import Select from 'react-select';
import { Async } from 'react-select';

import 'react-select/dist/react-select.css';

const renderAsyncSelectField = (props) => (
    <div className="form-group">
        <label>{props.label}</label>
        <Async
            {...props.input}
            closeOnSelect={true}
            disabled={false}
            multi={props.multi}
            placeholder={props.placeholder}
            loadOptions={props.loadOptions}
            removeSelected={true}
            rtl={false}
            onChange={props.input.onChange}
            value={props.input.value}
            simpleValue
            onBlur={() => props.input.onBlur(props.input.value)}
        />
    </div>
);

export default renderAsyncSelectField;
