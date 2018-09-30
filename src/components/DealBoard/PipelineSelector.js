import React from 'react';

import Select from 'react-select';
import * as _ from "lodash";


function PipelineSelector(props) {

    function stateToOptions(pipelineStore) {
        if (_.has(pipelineStore, ["ids"])) {
            return pipelineStore.ids.map( pipelineId => {
                let pipeline = pipelineStore.items[pipelineId];
                return {
                    label: pipeline.name,
                    value: pipeline.id
                };
            });
        }
    }


    if( !_.has(props, ["pipelineStore","ids"]) )
        return <em>loading..</em>;
    else
    return (
            <Select
                className={props.className}
                id="state-select"
                autoFocus
                options={stateToOptions(props.pipelineStore)}
                //simpleValue
                clearable={false}
                name="selected-state"
                onChange={(newValue) => props.onChange({id: newValue.value, name: newValue.label})}
                openOnClick={false}
                searchable={false}
                value={props.value && {value: props.value.id, label: props.value.name}}
                />);

}

export default PipelineSelector;