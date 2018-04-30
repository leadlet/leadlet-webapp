import React from 'react';


const adaptFileEventToValue = delegate =>
    e => delegate(e.target.files[0])

const renderFileInputField = ({
                       input: {
                           value: omitValue,
                           onChange,
                           onBlur,
                           ...inputProps,
                       },
                       meta: omitMeta,
                       ...props,
                   }) =>
    <input
        onChange={adaptFileEventToValue(onChange)}
        onBlur={adaptFileEventToValue(onBlur)}
        type="file"
        {...inputProps}
        {...props}
    />


export default renderFileInputField;
