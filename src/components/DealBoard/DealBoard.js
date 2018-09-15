import React, {Component} from 'react';
import PipelineSelector from './PipelineSelector'
import {getAllPipelines} from "../../actions/pipeline.actions";
import {connect} from "react-redux";
import Button from "react-bootstrap/es/Button";
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';
import CardsContainer from "./DealList/DealCardsContainer";
import CustomDragLayer from "./CustomDragLayer";
import {deleteDeal} from "../../actions/deal.actions";
import SweetAlert from 'sweetalert-react';
import CreateEditDeal from '../DealDetail/CreateEditDeal'
import {pipelinesSelector, stagesSelector} from "../../models/selectors";
import ListFilter from "../Search/ListFilter";
import {getAllStages} from "../../actions/stage.actions";
import RangeFilter from "../Search/RangeFilter";
import SelectedFilters from "../Search/SelectedFilters";
import DateRangeFilter from "../Search/DateRangeFilter";
import {pipelineSelected} from "../../actions/search.actions";
import SortSelector from "../Search/SortSelector";


import './../../styles/deals.css';
import './../../styles/side-search.css';


let sortOptions = [
                    {
                        value: {
                            dataField : 'created_date',
                            order: 'desc'
                        },
                        label: 'Newest'
                    },
                    {
                        value: {
                            dataField : 'created_date',
                                order: 'asc'
                        },
                        label: 'Oldest'
                    },
                    {
                        value: {
                            dataField : 'priority',
                                order: 'desc'
                        },
                        label: 'Most Prior'
                    },
                    {
                        value: {
                            dataField : 'priority',
                                order: 'asc'
                        },
                        label: 'Least Prior'
                    }
                    ];

class DealBoard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isNewDealModalVisible: false,
            isSearchMenuVisible: false,
            isScrolling: false,
            showDeleteDealDialog: false,
            deletingDeal: null,
            selectedPipeline: null,
            sidebarOpen: true

        };

        this.toggleNewDealModal = this.toggleNewDealModal.bind(this);
        this.toggleSearchMenu = this.toggleSearchMenu.bind(this);
        this.scrollRight = this.scrollRight.bind(this);
        this.scrollLeft = this.scrollLeft.bind(this);
        this.stopScrolling = this.stopScrolling.bind(this);
        this.startScrolling = this.startScrolling.bind(this);
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

        this.props.pipelineSelected({
            pipeline: pipeline,
            group: "deals-page",
            id: "pipeline-selector"});
    }

    render() {
        return (
            <div className="wrapper deal-board">
                <div className="row toolbar">
                    <SelectedFilters group="deals-page" index="leadlet-deal"/>
                    <SortSelector
                        className="m-l-xs sort-selector"
                        group="deals-page"
                        id="deal-sort-selector"
                        options = {sortOptions}
                    />
                    <PipelineSelector className="m-l-xs pipeline-selector"
                                      pipelines={this.props.pipelines}
                                      onChange={this.pipelineChanged}
                                      value={this.state.selectedPipeline}
                    />

                    <Button bsStyle="primary" bsSize="small" className="m-l-xs" onClick={this.toggleNewDealModal}>New Deal</Button>
                        <Button bsStyle="primary" bsSize="small" className="m-l-xs" onClick={this.toggleSearchMenu}><i className="fa fa-filter fa-xs"/></Button>
                </div>

                <div className="row stages">
                    {this.state.isSearchMenuVisible &&
                    <div id="deals-search" className="side-search-menu deal-search">
                        <ListFilter
                            id="Products"
                            dataField="products.keyword"
                            title="Products"
                            emptyText ="No Product"
                            multi={true}
                            group="deals-page"
                            index="leadlet-deal"
                        />
                        <ListFilter
                            id="Channels"
                            dataField="channel.keyword"
                            title="Channels"
                            emptyText ="No Channel"
                            multi={true}
                            group="deals-page"
                            index="leadlet-deal"
                        />
                        <ListFilter
                            id="Sources"
                            dataField="source.keyword"
                            title="Sources"
                            emptyText ="No Source"
                            multi={true}
                            group="deals-page"
                            index="leadlet-deal"
                        />
                        <RangeFilter
                            id="Priority"
                            dataField="priority"
                            title="Priority"
                            group="deals-page"
                            index="leadlet-deal"
                        />
                        <DateRangeFilter
                            id="CreateDate"
                            dataField="created_date"
                            title="Create Date"
                            group="deals-page"
                            index="leadlet-deal"
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
                                            id: this.state.selectedPipeline.id
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
    deleteDeal,
    pipelineSelected
})(DragDropContext(HTML5Backend)(DealBoard));

