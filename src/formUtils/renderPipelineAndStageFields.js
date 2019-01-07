import React from 'react';
import {Async} from 'react-select';

import 'react-select/dist/react-select.css';
import {loadPipeline, loadStage} from "./form.actions";

const renderPipeline = (props) => (
    <div className="form-group">
        <label>Pipeline</label>
        <Async
            {...props.pipeline.input}
            closeOnSelect={true}
            disabled={false}
            multi={false}
            placeholder="Pipeline"
            loadOptions={loadPipeline}
            removeSelected={true}
            resetValue={undefined}
            rtl={false}
            onChange={props.pipeline.input.onChange}
            value={props.pipeline.input.value}
            simpleValue={false}
            onBlur={() => props.pipeline.input.onBlur(props.pipeline.input.value)}
        />
    </div>
)

const renderStage = (props) => (
    <div className="form-group">
        <label>Stage</label>
        <Async
            key={(props.pipeline.input.value && props.pipeline.input.value.value) || 0}
            {...props.stage.input}
            closeOnSelect={true}
            disabled={!props.pipeline.input.value}
            multi={false}
            placeholder="Stage"
            loadOptions={(input, callback) => loadStage(input, callback, props.pipeline.input.value)}
            removeSelected={true}
            rtl={false}
            onChange={props.stage.input.onChange}
            value={props.stage.input.value}
            simpleValue={false}
            onBlur={() => props.stage.input.onBlur(props.stage.input.value)}
        />
        <span style={{color: "red"}} className="help-block m-b-none">
                    {props.stage.meta.error && <span>{props.stage.meta.error}</span>}
            </span>
    </div>
)
const renderPipelineAndStageFields = (props) => {
    if (props.showPipelineSelection && props.showStageSelection) {
        return [
            renderPipeline(props), renderStage(props)
        ]
    } else if (props.showPipelineSelection) {
        return [
            renderPipeline(props)
        ]
    } else if (props.showStageSelection) {
        return [
            renderStage(props)
        ]
    } else {
        return null;
    }

};


export default renderPipelineAndStageFields
