import React, {Component} from 'react';
import PipelineSelector from './PipelineSelector'
import {getAllPipelines} from "../../actions/pipeline.actions";
import {getAllStages} from "../../actions/stage.actions";
import {connect} from "react-redux";
import Button from "react-bootstrap/es/Button";
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import CardsContainer from "./Deals/CardsContainer";
import CustomDragLayer from "./CustomDragLayer";
import {deleteDeal, getAllDeals, moveDeal} from "../../actions/deal.actions";
import SweetAlert from 'sweetalert-react';
import NewDeal from "./Deals/NewDeal";


class DealBoard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedPipelineId: null,
            isNewDealModalVisible: false,
            activeStages: null,
            isScrolling: false,
            showDeleteDealDialog: false,
            deletingDealId: null
        };

        this.pipelineChanged = this.pipelineChanged.bind(this);
        this.selectedStages = this.selectedStages.bind(this);
        this.toggleNewDealModal = this.toggleNewDealModal.bind(this);
        this.scrollRight = this.scrollRight.bind(this);
        this.scrollLeft = this.scrollLeft.bind(this);
        this.stopScrolling = this.stopScrolling.bind(this);
        this.startScrolling = this.startScrolling.bind(this);
        this.getStageDeals = this.getStageDeals.bind(this);
        this.moveCard = this.moveCard.bind(this);
        this.onDeleteDeal = this.onDeleteDeal.bind(this);
        this.moveList = this.moveList.bind(this);
    }

    cancelDeleteDeal(){
        this.setState({
            deletingDealId: null,
            showDeleteDealDialog: false
        });
    }

    confirmDeleteDeal(){
        this.props.deleteDeal(this.state.deletingDealId);
        this.setState({
            deletingDealId: null,
            showDeleteDealDialog: false
        });
    }

    onDeleteDeal(dealId){
        this.setState({
           deletingDealId: dealId,
           showDeleteDealDialog: true
        });
    }

    moveCard(dealId, nextStageId, nextDealOrder) {
        this.props.moveDeal({
            id: dealId,
            newStageId: nextStageId,
            newOrder: nextDealOrder
        });

        console.log(`Moving deal ${dealId} to new stage index : ${nextStageId} and new deal order: ${nextDealOrder}`);
    }

    moveList(listId, nextX) {
        console.log(arguments);

    }



    startScrolling(direction) {
        // if (!this.state.isScrolling) {
        switch (direction) {
            case 'toLeft':
                this.setState({ isScrolling: true }, this.scrollLeft());
                break;
            case 'toRight':
                this.setState({ isScrolling: true }, this.scrollRight());
                break;
            default:
                break;
        }
        // }
    }

    scrollRight() {
        function scroll() {
            document.getElementById('deals-board').scrollLeft += 10;
        }
        this.scrollInterval = setInterval(scroll, 10);
    }

    scrollLeft() {
        function scroll() {
            document.getElementById('deals-board').scrollLeft -= 10;
        }
        this.scrollInterval = setInterval(scroll, 10);
    }

    stopScrolling() {
        this.setState({ isScrolling: false }, clearInterval(this.scrollInterval));
    }

    toggleNewDealModal() {
        this.setState({
            isNewDealModalVisible: !this.state.isNewDealModalVisible
        });
    }

    componentDidMount() {
        this.props.getAllPipelines();
        this.props.getAllStages();
        this.props.getAllDeals();

    }

    pipelineChanged(newPipelineId, _props = this.props) {

        const activeStages = _props.stages.ids
            .filter( id => { return _props.stages.items[id].pipelineId === newPipelineId })
            .map(id => { return _props.stages.items[id]; });

        this.setState({
            selectedPipelineId: newPipelineId,
            activeStages: activeStages
        });
    }

    selectedStages(){
        return this.props.stages.ids
            .filter( id => { return this.props.stages.items[id].pipelineId === this.state.selectedPipelineId })
            .map(id => { return this.props.stages.items[id]; });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.pipelines.ids && nextProps.stages.ids && !this.state.selectedPipelineId){
            this.pipelineChanged(nextProps.pipelines.ids[0], nextProps);

        }
    }

    getStageDeals( stage ){
       return  this.props.deals.ids.filter(
            id => this.props.deals.items[id].stageId === stage.id
        )
            .map(
                id => this.props.deals.items[id]
            );
    }

    render() {
        return (
                <div className="dealboard">
                    <div className="dealboard-toolbar">
                    </div>
                    <div id="deals-board" className="lists">
                        <CustomDragLayer snapToGrid={false} />
                        { this.props.pipelines.ids && this.props.deals.ids && this.state.activeStages
                        && this.state.activeStages.map((stage, i) =>
                            <CardsContainer
                                key={stage.id}
                                id={stage.id}
                                item={stage}
                                moveCard={this.moveCard}
                                moveList={this.moveList}
                                startScrolling={this.startScrolling}
                                stopScrolling={this.stopScrolling}
                                isScrolling={this.state.isScrolling}
                                x={stage.id}
                                cards={this.getStageDeals(stage)}
                                editDeal={this.onDeleteDeal}
                                deleteDeal={this.onDeleteDeal}
                            />
                        )}
                    </div>
                    <SweetAlert
                        title="Are you sure?"
                        text="You will loose information related to deal!"
                        type="warning"
                        showCancelButton={true}
                        confirmButtonColor="#DD6B55"
                        confirmButtonText= "Yes, delete it!"
                        show={this.state.showDeleteDealDialog}
                        onConfirm={() => this.confirmDeleteDeal()}
                        onCancel={() => this.cancelDeleteDeal()}
                    />
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
        );
    }

}

function mapStateToProps(state) {
    return {
        pipelines: state.pipelines,
        stages: state.stages,
        deals: state.deals,
    }
}

export default connect(mapStateToProps, {getAllPipelines, getAllStages, getAllDeals,moveDeal, deleteDeal })(DragDropContext(HTML5Backend)(DealBoard));

