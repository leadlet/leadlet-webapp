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
            selectedPipeline: null,
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
    onEditPipeline(pipeline){
        this.setState({
            showPipelineModal: true,
            selectedPipeline: pipeline
        })
    }

    cancelDeletePipeline(id){
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
        if( this.props.ids && this.props.pipelines.loading ) {
            return ( <em>Loading Pipelines.. </em>);
        }else if(this.props.ids) {
            return this.props.ids.map( pipelineId => {
                const pipelineItem = this.props.pipelines[pipelineId];

                return (
                    <Tab eventKey={pipelineId} key={pipelineId}
                         title={
                             <span>{pipelineItem.name}
                                 <div className="btn-group btn-group-xs" role="group" aria-label="...">
                                    <i className="btn fa fa-edit"  onClick={() => this.onEditPipeline(pipelineItem)}/>
                                    <i className="btn fa fa-trash" onClick={() => this.onDeletePipeline(pipelineItem.id)}/>
                                </div>
                             </span>
                         }>
                        <Stages pipelineId={pipelineItem.id}/>
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
            <div className="m-t">
                <Tabs id="pipeline-tabs">
                    {this.renderPipelines()}
                    <Tab title={this.newPipelineTab()} ></Tab>
                </Tabs>

                <div>
                    <PipelineNewOrEdit showModal={this.state.showPipelineModal}
                                       initialValues={this.state.selectedPipeline}
                                        close={this.closePipelineModal}/>
                </div>
                <div>
                    <SweetAlert
                        title="Are you sure?"
                        text="You will loose all stages, deals and activities related to this pipeline!"
                        type="warning"
                        showCancelButton={true}
                        confirmButtonColor="#DD6B55"
                        confirmButtonText= "Yes, delete it!"
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
        pipelines: state.pipelines.items,
        ids: state.pipelines.ids,
    };
}


export default connect(mapStateToProps, {getAllPipelines,deletePipeline})(Pipelines);