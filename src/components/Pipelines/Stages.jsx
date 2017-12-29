import React from 'react';
import {connect} from 'react-redux';
import {deleteStage, getAllStages} from "../../actions/stage.actions";
import StageNewOrEdit from "./StageNewOrEdit";
import SweetAlert from 'sweetalert-react';

class Stages extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            showStageModal: false,
            selectedStage: null,
            showDeleteDialog: false
        };
        this.closeStageModal = this.closeStageModal.bind(this);
        this.onDeleteStage = this.onDeleteStage.bind(this);
        this.onEditStage = this.onEditStage.bind(this);
        this.onNewStage = this.onNewStage.bind(this);
        this.confirmDeleteStage = this.confirmDeleteStage.bind(this);
        this.cancelDeleteStage = this.cancelDeleteStage.bind(this);
        this.renderStages = this.renderStages.bind(this);
    }

    componentDidMount() {
        this.props.getAllStages();
    }

    confirmDeleteStage() {
        this.props.deleteStage(this.state.deletingStageId);
        this.setState({deletingStageId: null});
        this.setState({showDeleteDialog: false});
    }


    cancelDeleteStage() {
        this.setState({deletingStageId: null});
        this.setState({showDeleteDialog: false});
    }

    onDeleteStage(id) {
        this.setState({deletingStageId: id});
        this.setState({showDeleteDialog: true});
    }

    onNewStage() {
        this.setState({showStageModal: true});
    }

    closeStageModal() {
        this.setState({
            selectedStage: null,
            showStageModal: false
        });
    }

    onEditStage(stage) {
        this.setState({
            selectedStage: stage,
            showStageModal: true
        });
    }

    renderStages() {
        if (this.props.ids) {
            return this.props.ids.filter(id =>
                this.props.stages[id].pipelineId === this.props.pipelineId
            ).map(stageId => {
                const stageItem = this.props.stages[stageId];
                return (
                    <div key={stageId} className="step" style={{"--stage-color": stageItem.color}}>
                        {stageItem.name}
                        <div className="btn-group btn-group-xs" role="group" aria-label="...">
                            <i className="btn fa fa-edit" onClick={() => this.onEditStage(stageItem)}/>
                            <i className="btn fa fa-trash" onClick={() => this.onDeleteStage(stageItem.id)}/>
                        </div>
                    </div>
                );
            }, this)
        }
    }

    render() {

        return (
            <div className="step-indicator">
                {
                    this.renderStages()
                }
                <div className="step">
                    <a onClick={() => this.onNewStage()}>New Stage <i className="fa fa-plus"/></a>
                </div>
                <StageNewOrEdit showModal={this.state.showStageModal}
                                close={this.closeStageModal}
                                initialValues={this.state.selectedStage}
                                pipelineId={this.props.pipelineId}/>

                <div>
                    <SweetAlert
                        title="Are you sure?"
                        text="You will not be able to recover this imaginary file!"
                        type="warning"
                        showCancelButton={true}
                        confirmButtonColor="#DD6B55"
                        confirmButtonText="Yes, delete it!"
                        show={this.state.showDeleteDialog}
                        onConfirm={() => this.confirmDeleteStage()}
                        onCancel={() => this.cancelDeleteStage()}
                    />
                </div>

            </div>
        );

    }
}


function mapStateToProps(state) {
    return {
        stages: state.stages.items,
        ids: state.stages.ids,
    };
}


export default connect(mapStateToProps, {getAllStages, deleteStage})(Stages);