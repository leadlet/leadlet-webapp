import React, {Component} from 'react';
import PipelineSelector from './PipelineSelector'
import {getAllPipelines} from "../../actions/pipeline.actions";
import {connect} from "react-redux";
import Button from "react-bootstrap/es/Button";
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';
import CardsContainer from "./DealList/DealCardsContainer";
import CustomDragLayer from "./CustomDragLayer";
import {deleteDeal, moveDeal} from "../../actions/deal.actions";
import SweetAlert from 'sweetalert-react';
import CreateEditDeal from '../DealDetail/CreateEditDeal'
import { pipelinesSelector, stagesSelector} from "../../models/selectors";
import ListFilter from "../Search/ListFilter";
import {getAllStages} from "../../actions/stage.actions";
import RangeFilter from "../Search/RangeFilter";
import SelectedFilters from "../Search/SelectedFilters";
import DateRangeFilter from "../Search/DateRangeFilter";
import {pipelineSelected} from "../../actions/search.actions";
class DealBoard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isNewDealModalVisible: false,
            isSearchMenuVisible: false,
            isScrolling: false,
            showDeleteDealDialog: false,
            deletingDeal: null,
            selectedPipeline: null
        };

        this.toggleNewDealModal = this.toggleNewDealModal.bind(this);
        this.toggleSearchMenu = this.toggleSearchMenu.bind(this);
        this.scrollRight = this.scrollRight.bind(this);
        this.scrollLeft = this.scrollLeft.bind(this);
        this.stopScrolling = this.stopScrolling.bind(this);
        this.startScrolling = this.startScrolling.bind(this);
        this.moveCard = this.moveCard.bind(this);
        this.onDeleteDeal = this.onDeleteDeal.bind(this);
        this.moveList = this.moveList.bind(this);
        this.pipelineChanged = this.pipelineChanged.bind(this);

    }

    cancelDeleteDeal() {
        this.setState({
            deletingDeal: null,
            showDeleteDealDialog: false
        });
    }

    confirmDeleteDeal() {
        this.props.deleteDeal(this.state.deletingDeal);
        this.setState({
            deletingDeal: null,
            showDeleteDealDialog: false
        });
    }

    onDeleteDeal(deal) {
        this.setState({
            deletingDeal: deal,
            showDeleteDealDialog: true
        });
    }

    moveCard(dealId, nextStageId, nextDealOrder) {

        console.log(this.props.deals);

        const targetStageDeals = this.props.deals.filter(deal => deal.stageId === nextStageId )

        const nextDealId = targetStageDeals[nextDealOrder] && targetStageDeals[nextDealOrder].id;
        const prevDealId = targetStageDeals[nextDealOrder-1] && targetStageDeals[nextDealOrder-1].id;

        /*
        const nextDealId = this.props.boards[this.props.pipelines.selectedPipelineId].entities.stages[nextStageId].dealList[nextDealOrder];
        const prevDealId = this.props.boards[this.props.pipelines.selectedPipelineId].entities.stages[nextStageId].dealList[nextDealOrder - 1];
        */

        this.props.moveDeal({
            id: dealId,
            newStageId: nextStageId,
            nextDealId: nextDealId,
            prevDealId: prevDealId
        });

    }

    moveList(listId, nextX) {
        console.log(arguments);
    }

    startScrolling(direction) {
        // if (!this.state.isScrolling) {
        switch (direction) {
            case 'toLeft':
                this.setState({isScrolling: true}, this.scrollLeft());
                break;
            case 'toRight':
                this.setState({isScrolling: true}, this.scrollRight());
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
        this.setState({isScrolling: false}, clearInterval(this.scrollInterval));
    }

    toggleNewDealModal() {
        this.setState({
            isNewDealModalVisible: !this.state.isNewDealModalVisible
        });
    }

    toggleSearchMenu() {
        this.setState({
            isSearchMenuVisible: !this.state.isSearchMenuVisible
        });
    }

    componentDidMount() {
        this.props.getAllPipelines();
        this.props.getAllStages();

    }

    componentWillReceiveProps(nextProps) {
        if( this.state.selectedPipeline === null && nextProps.pipelines.length > 0){
            this.pipelineChanged(nextProps.pipelines[0]);
        }


    }

    pipelineChanged(pipeline){
        this.setState({ selectedPipeline: pipeline });
        this.props.pipelineSelected("pipeline", pipeline);
    }

    render() {
        return (
            <div className="dealboard">
                <div className="dealboard-toolbar">
                        <SelectedFilters/>
                        <Button bsStyle="primary" bsSize="small" className="m-l-sm" onClick={this.toggleSearchMenu}><i className="fa fa-filter fa-xs"/></Button>
                        <Button bsStyle="primary" bsSize="small" className="m-l-sm" onClick={this.toggleNewDealModal}>New Deal</Button>
                        <PipelineSelector pipelines={this.props.pipelines}
                                          onChange={this.pipelineChanged}
                                          value={this.state.selectedPipeline}/>
                </div>
                <div className="deals">
                    {this.state.isSearchMenuVisible &&
                    <div id="deals-search" className="search">
                        <ListFilter
                            id="Products"
                            dataField="products.keyword"
                            title="Products"
                            emptyText ="No Product"
                            multi={true}
                        />
                        <ListFilter
                            id="Channels"
                            dataField="channel.keyword"
                            title="Channels"
                            emptyText ="No Channel"
                            multi={true}
                        />
                        <ListFilter
                            id="Sources"
                            dataField="source.keyword"
                            title="Sources"
                            emptyText ="No Source"
                            multi={true}

                        />
                        <RangeFilter
                            id="Priority"
                            dataField="priority"
                            title="Priority"
                        />
                        <DateRangeFilter
                            id="CreateDate"
                            dataField="created_date"
                            title="Create Date"
                        />
                    </div>
                    }
            <div id="deals-board" className="lists">
                <CustomDragLayer snapToGrid={false}/>
                {this.renderCards()}
            </div>

            </div>
                <SweetAlert
                    title="Are you sure?"
                    text="You will loose information related to deal!"
                    type="warning"
                    showCancelButton={true}
                    confirmButtonColor="#DD6B55"
                    confirmButtonText="Yes, delete it!"
                    show={this.state.showDeleteDealDialog}
                    onConfirm={() => this.confirmDeleteDeal()}
                    onCancel={() => this.cancelDeleteDeal()}
                />
                {
                    this.state.isNewDealModalVisible &&
                    <CreateEditDeal showModal={this.state.isNewDealModalVisible}
                                    close={this.toggleNewDealModal}
                                    showPipelineSelection={false}
                                    initialValues={{
                                        pipeline : {
                                            id: this.props.pipelines.selectedPipelineId
                                        }
                                    }}
                    />
                }
            </div>
        );
    }

    renderCards() {

        if (this.props.pipelines.length > 0 && this.props.stages.length > 0 && this.state.selectedPipeline) {
            return this.props.stages
                .filter(stage => stage.pipelineId === this.state.selectedPipeline.id)
                .map(stage =>
                <CardsContainer
                    key={stage.id}
                    id={stage.id}
                    stage={stage}
                    moveCard={this.moveCard}
                    moveList={this.moveList}
                    startScrolling={this.startScrolling}
                    stopScrolling={this.stopScrolling}
                    isScrolling={this.state.isScrolling}
                    deleteDeal={this.onDeleteDeal}
                />
            );
        }


    }
}

function mapStateToProps(state) {
    return {
        pipelines: pipelinesSelector(state),
        stages: stagesSelector(state)
    }
}

export default connect(mapStateToProps, {
    getAllPipelines,
    getAllStages,
    moveDeal,
    deleteDeal,
    pipelineSelected
})(DragDropContext(HTML5Backend)(DealBoard));

