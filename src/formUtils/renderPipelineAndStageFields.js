import React from 'react';
import { Async } from 'react-select';

import 'react-select/dist/react-select.css';
import {loadPipeline, loadStage} from "./form.actions";

const renderPipelineAndStageFields= (props) => (
    [
        <div className="form-group">
            <label>Pipeline</label>
            <Async
                {...props.pipeline.id.input}
                closeOnSelect={true}
                disabled={false}
                multi={false}
                placeholder="Pipeline"
                loadOptions={loadPipeline}
                removeSelected={true}
                resetValue={undefined}
                rtl={false}
                onChange={props.pipeline.id.input.onChange}
                value={props.pipeline.id.input.value}
                simpleValue
                onBlur={() => props.pipeline.id.input.onBlur(props.pipeline.id.input.value)}
            />
        </div>,
        <div className="form-group">
            <label>Stage</label>
            <Async
                key={props.pipeline.id.input.value || 0}
                {...props.stage.id.input}
                closeOnSelect={true}
                disabled={isNaN(props.pipeline.id.input.value)}
                multi={false}
                placeholder="Stage"
                loadOptions={(input, callback)=>loadStage(input, callback, props.pipeline.id.input.value)}
                removeSelected={true}
                rtl={false}
                onChange={props.stage.id.input.onChange}
                value={props.stage.id.input.value}
                simpleValue
                onBlur={() => props.stage.id.input.onBlur(props.stage.id.input.value)}
            />
        </div>
    ]

);



export default renderPipelineAndStageFields
