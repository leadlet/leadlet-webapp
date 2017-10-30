import React from 'react';
import { connect } from 'react-redux';
import {getAll as getAllPipelines} from "../_actions/pipeline.actions";
import {deleteStage} from "../_actions/stage.actions";

import {Tab, Tabs} from "react-bootstrap";
import StageNewOrEdit from "./StageNewOrEdit";

class Pipelines extends React.Component {


    constructor(props){
        super(props);

        this.state = {
            showStageModal: false,
            selectedStage: null
        }
        this.renderPipelines = this.renderPipelines.bind(this);
        this.renderStages = this.renderStages.bind(this);
        this.closeStageModal = this.closeStageModal.bind(this);

    }

    componentDidMount() {
        this.props.getAllPipelines();
    }

    onDeleteStage(id){
        this.props.deleteStage(id);
    }

    onNewStage(){
        this.setState({ showStageModal : true});
    }

    closeStageModal(){
        this.setState({
            selectedStage: null,
            showStageModal : false
        });    }

    onEditStage(stage){
        this.setState({
            selectedStage: stage,
            showStageModal : true
        });
    }

    renderStages(stages){
        if( !stages ){
            return ( <em>Loading Stages.. </em>);
        }else {
            return stages.map( stage => {
                return (
                    <div className="step" style={{"--stage-color": stage.color}}>
                        {stage.name}
                        <div class="btn-group btn-group-xs" role="group" aria-label="...">
                            <i class="btn fa fa-edit"  onClick={() => this.onEditStage(stage)}></i>
                            <i class="btn fa fa-trash" onClick={() => this.onDeleteStage(stage.id)}></i>
                        </div>
                    </div>
                )
            })
        }
    }

    renderPipelines(){
        if( ! this.props.pipelines ){
            return ( <em>Loading Pipelines.. </em>);
        }else if( this.props.pipelines && this.props.pipelines.loading ) {
            return ( <em>Loading Pipelines.. </em>);
        }else {
            return this.props.pipelines.map( pipeline => {
                return (
                    <Tab eventKey={pipeline.id} title={pipeline.name}>
                        <div className="step-indicator">
                            {this.renderStages(pipeline.stages)}
                            <div className="step">
                                <a onClick={() => this.onNewStage()}>New Stage <i class="fa fa-plus" ></i></a>
                            </div>
                        </div>
                    </Tab>
                )
            })
        }
    }

    newPipelineTab(){
        return (
            <span onClick={() => {console.log("new pipeline")}}>New Pipeline <i className="fa fa-plus"></i></span>
        );
    }

    render() {

        return (
            <div className="wrapper wrapper-content">
                <div className="container">

                    <div className="row">
                    <div className="ibox ">
                        <div className="ibox-title">
                            <h5>Configure your Pipeline and Stages</h5>
                        </div>
                        <div className="ibox-content">

                            <p className="m-b-lg">
                                Ut at lorem ut diam molestie laoreet. Donec ut nibh ac risus euismod semper a ut metus. Phasellus faucibus dapibus felis, viverra tincidunt felis pellentesque posuere.
                            </p>
                            <div className="row">
                                <Tabs id="pipeline-tabs">
                                    {this.renderPipelines()}
                                    <Tab title={this.newPipelineTab()} ></Tab>
                                </Tabs>
                            </div>

                        </div>

                    </div>
                </div>
                </div>
                <StageNewOrEdit showModal={this.state.showStageModal}
                                close={this.closeStageModal}
                                initialValues={this.state.selectedStage}/>
            </div>

        );
    }
}


function mapStateToProps(state){
    return {
        pipelines: state.pipelines.items,
    };
}


export default connect(mapStateToProps, {getAllPipelines,deleteStage})(Pipelines);