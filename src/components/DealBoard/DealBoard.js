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

class DealBoard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isNewDealModalVisible: false,
            isScrolling: false,
            showDeleteDealDialog: false,
            deletingDeal: null
        };

        this.toggleNewDealModal = this.toggleNewDealModal.bind(this);
        this.scrollRight = this.scrollRight.bind(this);
        this.scrollLeft = this.scrollLeft.bind(this);
        this.stopScrolling = this.stopScrolling.bind(this);
        this.startScrolling = this.startScrolling.bind(this);
        this.moveCard = this.moveCard.bind(this);
        this.onDeleteDeal = this.onDeleteDeal.bind(this);
        this.moveList = this.moveList.bind(this);
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

        const nextDealId = this.props.boards[this.props.pipelines.selectedPipelineId].entities.stages[nextStageId].dealList[nextDealOrder];
        const prevDealId = this.props.boards[this.props.pipelines.selectedPipelineId].entities.stages[nextStageId].dealList[nextDealOrder - 1];


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

    componentDidMount() {
        this.props.getAllPipelines();
        // get board
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.pipelines.ids && nextProps.pipelines.selectedPipelineId === undefined) {
            this.props.selectPipeline(nextProps.pipelines.ids[0]);
        }
        if (nextProps.pipelines.selectedPipelineId !== this.props.pipelines.selectedPipelineId) {
            this.props.getBoardByPipelineId(nextProps.pipelines.selectedPipelineId);
        }
    }

    render() {
        return (
            <div className="dealboard">
                <div className="dealboard-toolbar">
                    <div className="row row-flex pull-right">
                        <Button bsStyle="primary" className="m-l-sm" onClick={this.toggleNewDealModal}>New Deal</Button>
                        <PipelineSelector pipelines={this.props.pipelines}
                                          onChange={this.props.selectPipeline}
                                          value={this.props.pipelines.selectedPipelineId}/>
                    </div>
                </div>
                <div id="deals-board" className="lists">
                    <CustomDragLayer snapToGrid={false}/>
                    {this.renderCards()}
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

        if (this.props.pipelines && this.props.pipelines.selectedPipelineId) {
            if (this.props.boards
                && this.props.boards[this.props.pipelines.selectedPipelineId]) {
                const _selectedBoard = this.props.boards[this.props.pipelines.selectedPipelineId];
                if (_selectedBoard.loading) {
                    return (
                        <div className="load-icon-container">
                            <i className="fa fa-spinner fa-pulse fa-3x fa-fw"/>
                        </div>
                    );
                } else {
                    return _selectedBoard.ids.stages.map(id =>
                        <CardsContainer
                            key={id}
                            id={id}
                            stage={_selectedBoard.entities.stages[id]}
                            moveCard={this.moveCard}
                            moveList={this.moveList}
                            startScrolling={this.startScrolling}
                            stopScrolling={this.stopScrolling}
                            isScrolling={this.state.isScrolling}
                            x={id}
                            deals={_selectedBoard.entities.dealList}
                            deleteDeal={this.onDeleteDeal}
                            loadMoreDeals={this.props.loadMoreDeals}
                        />
                    );
                }

            } else {

            }

        } else {

        }

    }
}

function mapStateToProps(state) {
    return {
        pipelines: state.pipelines,
        boards: state.boards
    }
}

export default connect(mapStateToProps, {
    getAllPipelines,
    getAllStages,
    moveDeal,
    deleteDeal,
    getBoardByPipelineId,
    selectPipeline,
    loadMoreDeals
})(DragDropContext(HTML5Backend)(DealBoard));

