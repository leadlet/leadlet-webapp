import React, {Component} from 'react';
import PipelineSelector from './PipelineSelector'
import {getAllPipelines, selectPipeline} from "../../actions/pipeline.actions";
import {getAllStages} from "../../actions/stage.actions";
import {connect} from "react-redux";
import Button from "react-bootstrap/es/Button";
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';
import CardsContainer from "./DealList/DealCardsContainer";
import CustomDragLayer from "./CustomDragLayer";
import {deleteDeal, moveDeal} from "../../actions/deal.actions";
import SweetAlert from 'sweetalert-react';
import {getBoardByPipelineId, loadMoreDeals} from "../../actions/board.actions";
import CreateEditDeal from '../DealDetail/CreateEditDeal'
import {dealsSelector, pipelinesSelector, stagesSelector} from "../../models/selectors";
import {
    CategorySearch, DateRange, MultiList, RangeSlider, ReactiveBase, ResultCard, ResultList, SingleList,
    SingleRange
} from "@appbaseio/reactivesearch/lib/index";
import MyResult from "./MyResult";

class DealBoardDemo extends Component {

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
        this.renderBoard = this.renderBoard.bind(this);
        this.renderStages = this.renderStages.bind(this);

    }



    renderStages(){

        if (this.props.pipelines.length > 0 && this.props.stages.length > 0 && this.state.selectedPipeline) {
            return this.props.stages
                .filter(stage => stage.pipelineId === this.state.selectedPipeline.id)
                .map(stage =>
                    (
                        <div className="list">
                            <div className="stage-header">
                                <div className="stage-name">{stage.name}</div>
                            </div>
                            <ul>
                                <MyResult
                                    id={stage.id}
                                    key={stage.id}
                                    componentId={"result" + stage.id}
                                    title="Results"
                                    dataField="name"
                                    pagination={false}
                                    react={{
                                        and: ["dealChannel", "dealSource", "dealScore"]
                                    }}
                                    onData={(res) => {

                                        return {
                                            description: (
                                                <div>
                                                    <div className="price">${res.price}</div>
                                                    <p>{res.vehicleType}</p>
                                                </div>
                                            )
                                        };
                                    }}
                                    defaultQuery = {() => {

                                        return {
                                            "bool" : {
                                                "must" : [
                                                    {"term":{"pipeline_id": this.state.selectedPipeline.id.toString()}},
                                                    {"term":{"stage_id": stage.id.toString()} }
                                                ]

                                            }
                                        };
                                    }}
                                />
                            </ul>
                            <footer>Total potential: {new Intl.NumberFormat('en-GB', {
                                style: 'currency',
                                currency: 'USD'
                            }).format(100)}</footer>
                        </div>
                        )

                );
        }

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
    }

    componentWillReceiveProps(nextProps) {
        if( this.state.selectedPipeline === null && nextProps.pipelines.length > 0){
            this.pipelineChanged(nextProps.pipelines[0]);
        }
    }

    pipelineChanged(pipeline){
        this.setState({ selectedPipeline: pipeline },
            () => this.props.getBoardByPipelineId(pipeline.id));
    }

    render() {
        return (<ReactiveBase
            url="http://localhost:3000"
            type="deal"
            app="leadlet" >
            {this.renderBoard()}
        </ReactiveBase>);
    }

    renderBoard() {
        return (
            <div className="dealboard">
                <div className="dealboard-toolbar">
                        <Button bsStyle="primary" className="m-l-sm" onClick={this.toggleSearchMenu}><i className="fa fa-filter"/></Button>
                        <Button bsStyle="primary" className="m-l-sm" onClick={this.toggleNewDealModal}>New Deal</Button>
                        <PipelineSelector pipelines={this.props.pipelines}
                                          onChange={this.pipelineChanged}
                                          value={this.state.selectedPipeline}/>
                </div>
                <div className="deals">
                    {this.state.isSearchMenuVisible &&
                    <div id="deals-search" className="search">
                        <MultiList
                            componentId="dealChannel"
                            dataField="channel.keyword"
                            title="Channels"
                        />
                        <MultiList
                            componentId="dealSource"
                            dataField="source.keyword"
                            title="Sources"
                        />

                        <RangeSlider
                            componentId="dealScore"
                            dataField="score"
                            title="Score"
                            range={{
                                "start": 0,
                                "end": 100
                            }}
                        />

                    </div>
                    }
                    <div id="deals-board" className="lists">
                        {this.renderStages()}
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
                    stageId={stage.id}
                    stage={stage}
                    moveCard={this.moveCard}
                    moveList={this.moveList}
                    startScrolling={this.startScrolling}
                    stopScrolling={this.stopScrolling}
                    isScrolling={this.state.isScrolling}
                    x={stage.id}
                    deleteDeal={this.onDeleteDeal}
                    loadMoreDeals={this.props.loadMoreDeals}
                />
            );
        }


    }
}

function mapStateToProps(state) {
    return {
        pipelines: pipelinesSelector(state),
        stages: stagesSelector(state),
        deals: dealsSelector(state)
    }
}

export default connect(mapStateToProps, {
    getAllPipelines,
    getAllStages,
    moveDeal,
    deleteDeal,
    getBoardByPipelineId,
    loadMoreDeals
})(DragDropContext(HTML5Backend)(DealBoardDemo));

