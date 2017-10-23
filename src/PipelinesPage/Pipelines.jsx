import React from 'react';
import { connect } from 'react-redux';
import {getAllPipes} from "../_actions/pipeline.actions";
import {Tab, Tabs} from "react-bootstrap";
import {PipelineConfigInfo} from "./PipelineConfigInfo";

class Pipelines extends React.Component {


    constructor(props){
        super(props);

        this.renderPipelines = this.renderPipelines.bind(this);
    }

    componentDidMount() {
        this.props.getAllPipes();
    }

    renderStages(stages){
        return stages.map(stage => {
            return (
                <li className="dd-item" data-id="2">
                    <div className="dd-handle">
                        <span className="label label-info"><i className="fa fa-bars"></i></span> {stage.name}
                    </div>
                </li>
            );
        });
    }

    renderPipelines(){
        if( ! this.props.pipelines ){
            return ( <em>Loading Pipelines.. </em>);
        }else if( this.props.pipelines && this.props.pipelines.loading ) {
            return ( <em>Loading Pipelines.. </em>);
        }else {
            return this.props.pipelines.map( pipeline => {
                return (
                    <li className="dd-item" data-id="1">
                        <div className="dd-handle">
                            <span className="label label-info"><i className="fa fa-bars fa-rotate-90"></i></span> {pipeline.name}
                        </div>
                        <ol className="dd-list">
                            {this.renderStages(pipeline.stages)}
                            <li className="dd-item" data-id="2">
                                <div className="dd-placeholder text-center">
                                    Add New Stage to {pipeline.name} <span><i className="fa fa-plus"></i></span>
                                </div>
                            </li>
                        </ol>
                    </li>

                )
            })
        }
    }

    render() {
        return (
            <div className="row">
            <div className="col-lg-8">
                <div className="ibox ">
                    <div className="ibox-title">
                        <h5>Configure your Pipeline and Stages</h5>
                    </div>
                    <div className="ibox-content">

                        <p className="m-b-lg">
                            Ut at lorem ut diam molestie laoreet. Donec ut nibh ac risus euismod semper a ut metus. Phasellus faucibus dapibus felis, viverra tincidunt felis pellentesque posuere.
                        </p>

                        <div className="dd" id="nestable2">
                            <ol className="dd-list">
                                { this.renderPipelines()}
                                <li className="dd-item" data-id="1">
                                    <div className="dd-placeholder text-center">
                                        Add New Pipeline <span><i className="fa fa-bars fa-rotate-90"></i></span>
                                    </div>
                                </li>
                            </ol>
                        </div>

                    </div>

                </div>
            </div>
                <div className="col-lg-4">
                    <PipelineConfigInfo />
                </div>
            </div>

        );
    }
}


function mapStateToProps(state){
    return {
        pipelines: state.pipelines.items,
    };
}


export default connect(mapStateToProps, {getAllPipes})(Pipelines);