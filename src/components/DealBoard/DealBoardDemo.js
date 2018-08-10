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
import {CategorySearch, ReactiveBase, ResultCard, ResultList, SingleRange} from "@appbaseio/reactivesearch/lib/index";
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
            app="car-store"
            credentials="cf7QByt5e:d2d60548-82a9-43cc-8b40-93cbbe75c34c">
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
                        <CategorySearch
                            componentId="searchbox"
                            dataField="name"
                            categoryField="brand.raw" // use "brand.keyword" for newly cloned datasets
                            placeholder="Search for cars"
                        />
                        <SingleRange
                            componentId="ratingsfilter"
                            title="Filter by ratings"
                            dataField="rating"
                            data={[
                                {"start": "4", "end": "5", "label": "4 stars and up"},
                                {"start": "3", "end": "5", "label": "3 stars and up"},
                                {"start": "2", "end": "5", "label": "2 stars and up"},
                                {"start": "1", "end": "5", "label": "see all ratings"},
                            ]}
                            defaultSelected="4 stars and up"
                        />
                    </div>
                    }
                    <div id="deals-board" className="lists">
                        <div className="list" >
                            <div className="stage-header">
                                <div className="stage-name">demo-stage</div>
                            </div>
                            <ul>
                                <MyResult
                                    componentId="result"
                                    title="Results"
                                    dataField="name"
                                    pagination={false}
                                    react={{
                                        and: ["searchbox", "ratingsfilter"]
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
                                />
                            </ul>

                            <footer>Total potential: {new Intl.NumberFormat('en-GB', {
                                style: 'currency',
                                currency: 'USD'
                            }).format(100)}</footer>
                        </div>


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

