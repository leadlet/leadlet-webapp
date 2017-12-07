import React, {Component} from 'react';
import PipelineSelector from './PipelineSelector'
import StageList from './StageList'
import {getAllPipelines} from "../../actions/pipeline.actions";
import {getAllStages} from "../../actions/stage.actions";
import {connect} from "react-redux";
import NewDeal from "./NewDeal";
import Button from "react-bootstrap/es/Button";
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';


class DealBoard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedPipelineId: null,
            isNewDealModalVisible: false,
            activeStages: null
        };

        this.pipelineChanged = this.pipelineChanged.bind(this);
        this.selectedStages = this.selectedStages.bind(this);
        this.toggleNewDealModal = this.toggleNewDealModal.bind(this);
    }

    toggleNewDealModal() {
        this.setState({
            isNewDealModalVisible: !this.state.isNewDealModalVisible
        });
    }

    componentDidMount() {
        this.props.getAllPipelines();
        this.props.getAllStages();
    }

    pipelineChanged(newPipelineId, _props = this.props) {

        const activeStages = _props.stages.ids
            .filter( id => { return _props.stages.items[id].pipelineId == newPipelineId })
            .map(id => { return _props.stages.items[id]; });

        this.setState({
            selectedPipelineId: newPipelineId,
            activeStages: activeStages
        });
    }

    selectedStages(){
        return this.props.stages.ids
            .filter( id => { return this.props.stages.items[id].pipelineId == this.state.selectedPipelineId })
            .map(id => { return this.props.stages.items[id]; });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.pipelines.ids && nextProps.stages.ids && !this.state.selectedPipelineId){
            this.pipelineChanged(nextProps.pipelines.ids[0], nextProps);

        }
    }

    render() {
        return (
            <div className="wrapper">
                <div className="container">
                    <div className="row" style={{width: '100%', margin: '0px'}}>
                        <div style={{float: 'right', width: '100px', padding: '2px 0px'}}>
                            {this.props.pipelines.ids &&
                            <PipelineSelector
                                pipelines={this.props.pipelines}
                                selectedPipelineId={this.state.selectedPipelineId}
                                onChange={this.pipelineChanged}
                            />}
                        </div>
                        <Button onClick={this.toggleNewDealModal}>Add Deal</Button>
                    </div>
                    <div className="row">
                        { this.props.pipelines.ids && this.state.activeStages &&
                            <StageList stages={this.state.activeStages}/>
                        }
                    </div>

                    <div>
                        {this.state.activeStages &&
                            <NewDeal showModal={this.state.isNewDealModalVisible}
                                     close={this.toggleNewDealModal}
                                     initialValues={{
                                         stageId: this.state.activeStages[0].id
                                     }}
                            />
                        }
                    </div>

                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        pipelines: state.pipelines,
        stages: state.stages,
    }
}

export default connect(mapStateToProps, {getAllPipelines, getAllStages})(DragDropContext(HTML5Backend)(DealBoard));

