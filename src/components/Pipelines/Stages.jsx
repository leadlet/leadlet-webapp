import React from 'react';
import { connect } from 'react-redux';
import {deleteStage, getAllStages} from "../../actions/stage.actions";
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
        this.props.getAllStages(this.props.pipelineId);
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
                    this.props.ids.map( stageId => {
                        const stageItem = this.props.stages[stageId];
                        return (
                            <div key={stageId} className="step" style={{"--stage-color": stageItem.color}}>
                                {stageItem.name}
                                <div className="btn-group btn-group-xs" role="group" aria-label="...">
                                    <i className="btn fa fa-edit"  onClick={() => this.onEditStage(stageItem)}></i>
                                    <i className="btn fa fa-trash" onClick={() => this.onDeleteStage(stageItem.id)}></i>
                                </div>
                            </div>
                        );
                    }, this)
                }
                    <div className="step">
                        <a onClick={() => this.onNewStage()}>New Stage <i className="fa fa-plus" ></i></a>
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
        ids: state.stages.ids,
    };
}


export default connect(mapStateToProps, {getAllStages,deleteStage})(Stages);