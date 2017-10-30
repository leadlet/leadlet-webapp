import React from 'react';
import { connect } from 'react-redux';
import {deleteStage, getAllStages} from "../_actions/stage.actions";
import StageNewOrEdit from "./StageNewOrEdit";

class Stages extends React.Component {


    constructor(props){
        super(props);

        this.state = {
            showStageModal: false,
            selectedStage: null
        };
        this.closeStageModal = this.closeStageModal.bind(this);
        this.onDeleteStage = this.onDeleteStage.bind(this);
        this.onEditStage = this.onEditStage.bind(this);
        this.onNewStage = this.onNewStage.bind(this);

    }

    componentDidMount() {
        this.props.getAllStages();
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

    render() {

        if(this.props.stages){

            return (
                <div className="step-indicator">
                {
                    this.props.stages.filter(stage => stage.pipelineId === this.props.pipelineId).map( stage => {
                        return (
                            <div className="step" style={{"--stage-color": stage.color}}>
                                {stage.name}
                                <div class="btn-group btn-group-xs" role="group" aria-label="...">
                                    <i class="btn fa fa-edit"  onClick={() => this.onEditStage(stage)}></i>
                                    <i class="btn fa fa-trash" onClick={() => this.onDeleteStage(stage.id)}></i>
                                </div>
                            </div>
                        );
                    })
                }
                    <div className="step">
                        <a onClick={() => this.onNewStage()}>New Stage <i class="fa fa-plus" ></i></a>
                    </div>
                    <StageNewOrEdit showModal={this.state.showStageModal}
                                    close={this.closeStageModal}
                                    initialValues={this.state.selectedStage}/>

                </div>
            );
        }else{
            return <div/>;
        }
    }
}


function mapStateToProps(state){
    return {
        stages: state.stages.items,
    };
}


export default connect(mapStateToProps, {getAllStages,deleteStage})(Stages);