import React from 'react';
import { connect } from 'react-redux';
import {getAll as getAllPipelines} from "../_actions/pipeline.actions";
import {deleteStage} from "../_actions/stage.actions";

import {Button, Collapse, Tab, Tabs} from "react-bootstrap";

class Pipelines extends React.Component {


    constructor(props){
        super(props);

        this.renderPipelines = this.renderPipelines.bind(this);

        this.state = {
            pipelineCollapseFlags: []
        }
    }

    componentDidMount() {
        this.props.getAllPipelines();
    }

    onDeleteStage(stage){
        this.props.deleteStage(stage.id);
    }

    onEditStage(stage){

    }
    renderStages(stages){
        return stages.map(stage => {
            return (
                <div className="col-lg-3">
                    <div className="ibox">
                        <div className="ibox-content">
                            <h3>{stage.name}
                                <div class="btn-group pull-right" role="group" aria-label="...">
                                    <button type="button" class="btn btn-sm btn-default" onClick={() => this.onEditStage(stage)}>
                                        <span className="fa fa-edit"></span>
                                    </button>
                                    { stage.deleting && <button type="button" class="btn btn-sm btn-default disabled">
                                        <span className="fa fa-spinner fa-pulse fa-1x fa-fw"></span>
                                        </button>
                                    }
                                    { !stage.deleting &&
                                    <button type="button" class="btn btn-sm btn-default" onClick={() => this.onDeleteStage(stage)}>
                                        <span className="fa fa-trash"></span>
                                    </button> }
                                </div>
                            </h3>
                            <p className="small"><i className="fa fa-hand-o-up" /> Drag task between list</p>
                            <ul className="sortable-list connectList agile-list" id="inprogress">
                                {
                                    (Math.random() < 0.5) &&
                                    <li className="success-element" id="task9">
                                        <div className="deal-title">
                                        Quisque venenatis ante in porta suscipit.
                                        </div>
                                        <div className="agile-detail">
                                            <a href="#" className="pull-right btn btn-xs btn-white">Tag</a>
                                            <i className="fa fa-clock-o" /> 12.10.2015
                                        </div>
                                    </li>
                                }
                                {
                                    (Math.random() < 0.5) &&
                                    <li className="success-element" id="task10">
                                        <div className="deal-title">
                                        Phasellus sit amet tortor sed enim mollis accumsan in consequat orci.
                                        </div>
                                        <div className="agile-detail">
                                            <a href="#" className="pull-right btn btn-xs btn-white">Mark</a>
                                            <i className="fa fa-clock-o"/> 05.04.2015
                                        </div>
                                    </li>
                                }
                                {

                                    <li className="warning-element" id="task11">
                                        <div className="deal-title">
                                            Nunc sed arcu at ligula faucibus tempus ac id felis. Vestibulum et nulla quis
                                            turpis sagittis fringilla.
                                        </div>
                                        <div className="agile-detail">
                                            <a href="#" className="pull-right btn btn-xs btn-white">Mark</a>
                                            <i className="fa fa-clock-o"/> 16.11.2015
                                        </div>
                                    </li>
                                }
                                {
                                    (Math.random() < 0.5) &&
                                    <li className="warning-element" id="task12">
                                        <div className="deal-title">
                                        Ut porttitor augue non sapien mollis accumsan.
                                        Nulla non elit eget lacus elementum viverra.
                                        </div>
                                        <div className="agile-detail">
                                            <a href="#" className="pull-right btn btn-xs btn-white">Tag</a>
                                            <i className="fa fa-clock-o"/> 09.12.2015
                                        </div>
                                    </li>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            );
        });
    }

    onClickCollapse(pipeline){
        let newFlags = this.state.pipelineCollapseFlags;
        newFlags[pipeline.id] = !newFlags[pipeline.id];
        this.setState({ pipelineCollapseFlags: newFlags});
    }

    renderPipelines(){
        if( ! this.props.pipelines ){
            return ( <em>Loading Pipelines.. </em>);
        }else if( this.props.pipelines && this.props.pipelines.loading ) {
            return ( <em>Loading Pipelines.. </em>);
        }else {
            return this.props.pipelines.map( pipeline => {
                return (
                    <div>

                            <li className="list-group-item">
                                <div className="btn btn-info btn-block"
                                     onClick={() => this.onClickCollapse(pipeline)}>
                                    {pipeline.name}
                                </div>

                            </li>
                            <Collapse in={this.state.pipelineCollapseFlags[pipeline.id]}>
                                <div className="demo-board container-scroll">
                                    <div className="row">
                                        {this.renderStages(pipeline.stages)}
                                        <div className="col-lg-3">
                                            <div className="ibox">
                                                <div className="ibox-content">
                                                    <div className="btn btn-default btn-block"> <i className="fa fa-plus"/>  Add New Stage</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Collapse>
                    </div>

                )
            })
        }
    }


    render() {
        const divStyle = {
            marginTop: "20px"
        };
        return (
            <div className="row">
                <div className="ibox ">
                    <div className="ibox-title">
                        <h5>Configure your Pipeline and Stages</h5>
                    </div>
                    <div className="ibox-content">

                        <p className="m-b-lg">
                            Ut at lorem ut diam molestie laoreet. Donec ut nibh ac risus euismod semper a ut metus. Phasellus faucibus dapibus felis, viverra tincidunt felis pellentesque posuere.
                        </p>
                        <ol className="list-group pipeline-config">
                            {this.renderPipelines()}
                            <li className="list-group-item">
                                <div className="btn btn-default btn-block"><i className="fa fa-plus"/> Add new pipeline</div>
                            </li>

                        </ol>
                    </div>

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


export default connect(mapStateToProps, {getAllPipelines,deleteStage})(Pipelines);