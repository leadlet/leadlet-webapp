import React from 'react';

import Select from 'react-select';


function PipelineSelector(props) {

    function stateToOptions(pipelines) {
        // { label: 'Chocolate', value: 'chocolate' }
        if (pipelines.ids) {
            return pipelines.ids.map((id) => {
                return {
                    label: pipelines.items[id].name,
                    value: id
                };
            });
        }
    }


    if( !props.pipelines.ids)
        return <em>loading..</em>;
    else
    return (
            <Select
                className="pipeline-selector"
                id="state-select"
                autoFocus
                options={stateToOptions(props.pipelines)}
                simpleValue
                clearable={false}
                name="selected-state"
                onChange={props.onChange}
                openOnClick={false}
                searchable={false}
                value={props.value}
                />);

}

export default PipelineSelector;