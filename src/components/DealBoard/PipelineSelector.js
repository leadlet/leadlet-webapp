import React from 'react';

import Select from 'react-select';


function PipelineSelector(props) {

    function stateToOptions(pipelines) {
        if (pipelines) {
            return pipelines.map( pipeline => {
                return {
                    label: pipeline.name,
                    value: pipeline.id
                };
            });
        }
    }


    if( !props.pipelines)
        return <em>loading..</em>;
    else
    return (
            <Select
                className="pipeline-selector"
                id="state-select"
                autoFocus
                options={stateToOptions(props.pipelines)}
                //simpleValue
                clearable={false}
                name="selected-state"
                onChange={props.onChange}
                openOnClick={false}
                searchable={false}
                value={props.value}
                />);

}

export default PipelineSelector;