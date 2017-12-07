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

    function updateValue(newValue) {
        props.onChange(newValue);
    }

    return (<div>
            {!props.pipelines.ids && <em>loading..</em>}
            {props.pipelines.ids &&
            <Select
                id="state-select"
                autoFocus
                options={stateToOptions(props.pipelines)}
                simpleValue
                clearable={false}
                name="selected-state"
                value={props.selectedPipelineId}
                onChange={updateValue}
                openOnClick={false}
                searchable={false}

                />}
        </div>


    );
}

export default PipelineSelector;