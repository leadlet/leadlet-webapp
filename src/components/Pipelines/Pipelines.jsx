import React from 'react';
import { connect } from 'react-redux';

import {Tab, Tabs} from "react-bootstrap";
import Stages from "./Stages";
import PipelineNewOrEdit from "./PipelineNewOrEdit";
import {deletePipeline, getAllPipelines} from "../../actions/pipeline.actions";
import SweetAlert from 'sweetalert-react';

class Pipelines extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            showPipelineModal: false,
            selectedStage: null,
            showDeleteDialog: false,
            deletingPipeline: null
        }
        this.renderPipelines = this.renderPipelines.bind(this);
        this.onEditPipeline = this.onEditPipeline.bind(this);
        this.onDeletePipeline = this.onDeletePipeline.bind(this);
        this.newPipelineTab = this.newPipelineTab.bind(this);
        this.closePipelineModal = this.closePipelineModal.bind(this);
        this.confirmDeletePipeline = this.confirmDeletePipeline.bind(this);
        this.cancelDeletePipeline = this.cancelDeletePipeline.bind(this);

    }

    closePipelineModal(){
        this.setState({
            showPipelineModal: false
        })
    }
    onEditPipeline(){

    }

    cancelDeletePipeline(id){
        this.props.deletePipeline(this.state.deletingPipeline);
        this.setState({
            showDeleteDialog: false,
            deletingPipeline: null
        });
    }

    confirmDeletePipeline(id){
        this.props.deletePipeline(this.state.deletingPipeline);
        this.setState({
            showDeleteDialog: false,
            deletingPipeline: null
        });
    }

    onDeletePipeline(id){
        this.setState({
            showDeleteDialog: true,
            deletingPipeline: id
        });
    }

    componentDidMount() {
        this.props.getAllPipelines();
    }

    renderPipelines(){
        if( ! this.props.pipelines ){
            return ( <em>Loading Pipelines.. </em>);
        }else if( this.props.pipelines && this.props.pipelines.loading ) {
            return ( <em>Loading Pipelines.. </em>);
        }else {
            return this.props.pipelines.map( pipeline => {
                return (
                    <Tab eventKey={pipeline.id} key={pipeline.id}
                         title={
                             <span>{pipeline.name}
                                 <div className="btn-group btn-group-xs" role="group" aria-label="...">
                                    <i className="btn fa fa-edit"  onClick={() => this.onEditPipeline(pipeline)}></i>
                                    <i className="btn fa fa-trash" onClick={() => this.onDeletePipeline(pipeline.id)}></i>
                                </div>
                             </span>
                         }>
                        <Stages pipelineId={pipeline.id}/>
                    </Tab>
                )
            })
        }
    }

    newPipelineTab(){
        return (
            <span onClick={() => {this.setState({showPipelineModal:true})}}>New Pipeline <i className="fa fa-plus"></i>
            </span>
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

                <div>
                    <PipelineNewOrEdit showModal={this.state.showPipelineModal}
                                        close={this.closePipelineModal}/>
                </div>
                <div>
                    <SweetAlert
                        title="Are you sure?"
                        text="You will not be able to recover this imaginary file!"
                        type="warning"
                        showCancelButton="true"
                        confirmButtonColor="#DD6B55"
                        confirmButtonText= "Yes, delete it!"
                        closeOnConfirm={false}
                        show={this.state.showDeleteDialog}
                        onConfirm={() => this.confirmDeletePipeline()}
                        onCancel={() => this.cancelDeletePipeline()}
                    />
                </div>
            </div>

        );
    }
}


function mapStateToProps(state){
    return {
        pipelines: state.pipelines.items
    };
}


export default connect(mapStateToProps, {getAllPipelines,deletePipeline})(Pipelines);