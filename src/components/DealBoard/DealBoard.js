import React, { Component } from 'react';
import PipelineSelector from './PipelineSelector'
import { getAllPipelines } from "../../actions/pipeline.actions";
import { connect } from "react-redux";
import Button from "react-bootstrap/es/Button";
import HTML5Backend from 'react-dnd-html5-backend';
import CustomDragLayer from "./CustomDragLayer";
import { deleteDeal } from "../../actions/deal.actions";
import SweetAlert from 'sweetalert-react';
import CreateEditDeal from '../DealDetail/CreateEditDeal'
import ListFilter from "../Search/ListFilter";
import { getPipelineStages } from "../../actions/stage.actions";
import SelectedFilters from "../Search/SelectedFilters";
import { appendFilter, pipelineSelected } from "../../actions/search.actions";
import SortSelector from "../Search/SortSelector";
import { DragDropContext } from 'react-dnd';

import * as _ from "lodash";
import StageColumn from "./StageColumn";
import FreeTextFilter from "../Search/FreeTextFilter";


let sortOptions = [
    {
        value: {
            dataField: 'created_date',
            order: 'desc'
        },
        label: 'Newest'
    },
    {
        value: {
            dataField: 'created_date',
            order: 'asc'
        },
        label: 'Oldest'
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
        this.pipelineChanged = this.pipelineChanged.bind(this);

    }

    cancelDeleteDeal() {
        this.setState({
            deletingDeal: null,
            showDeleteDealDialog: false
        });
    }

    confirmDeleteDeal() {
        this.props.deleteDeal(this.state.deletingDeal.id);
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

    toggleSearchMenu() {
        this.setState({
            isSearchMenuVisible: !this.state.isSearchMenuVisible
        });
    }

    componentDidMount() {
        if (this.props.location.search) {
            let appendQuery = this.props.location.search.substring(this.props.location.search.indexOf("=") + 1);
            this.props.appendFilter("deals-page", "param-filter", appendQuery);
        }
        this.props.getAllPipelines();
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.selectedPipeline === null && _.get(nextProps, ["pipelineStore", "ids", "length"], 0) > 0) {
            this.pipelineChanged(nextProps.pipelineStore.items[nextProps.pipelineStore.ids[0]]);
        }
    }

    pipelineChanged(pipeline) {
        this.props.getPipelineStages(pipeline.id);
        this.setState({ selectedPipeline: pipeline },
            () => this.props.pipelineSelected({
                pipeline: pipeline,
                group: "deals-page",
                id: "pipeline-selector"
            }));
    }

    render() {
        return (
            <div className="wrapper deal-board">
                <div className="row toolbar">
                    <SelectedFilters group="deals-page" index="leadlet-deal" />
                    <SortSelector
                        className="m-l-xs sort-selector"
                        group="deals-page"
                        id="deal-sort-selector"
                        options={sortOptions}
                    />
                    <PipelineSelector className="m-l-xs pipeline-selector"
                        pipelineStore={this.props.pipelineStore}
                        onChange={this.pipelineChanged}
                        value={this.state.selectedPipeline}
                    />

                    <Button bsStyle="primary" bsSize="small" className="m-l-xs" onClick={this.toggleNewDealModal}>New
                        Deal</Button>
                    <Button bsStyle="primary" bsSize="small" className="m-l-xs" onClick={this.toggleSearchMenu}><i
                        className="fa fa-filter fa-xs" /></Button>
                </div>

                {this.state.isSearchMenuVisible &&
                        <div id="deals-search" className="row deal-search">
                            <div className="col-md-2">
                                <FreeTextFilter
                                    id="FreeText"
                                    title="Search"
                                    group="deals-page"
                                    index="leadlet-deal"
                                />
                            </div>
                            <div className="col-md-2">
                                <ListFilter
                                    id="Products"
                                    dataField="products.keyword"
                                    title="Products"
                                    emptyText="No Product"
                                    multi={true}
                                    group="deals-page"
                                    index="leadlet-deal"
                                />
                            </div>
                            <div className="col-md-2">
                                <ListFilter
                                    id="Channels"
                                    dataField="channel.keyword"
                                    title="Channels"
                                    emptyText="No Channel"
                                    multi={true}
                                    group="deals-page"
                                    index="leadlet-deal"
                                />
                            </div>
                            <div className="col-md-2">
                                <ListFilter
                                    id="Sources"
                                    dataField="source.keyword"
                                    title="Sources"
                                    emptyText="No Source"
                                    multi={true}
                                    group="deals-page"
                                    index="leadlet-deal"
                                />
                            </div>
                            <div className="col-md-2">
                                <ListFilter
                                    id="Agents"
                                    dataField="agent_name.keyword"
                                    title="Agents"
                                    emptyText="No Agent"
                                    multi={true}
                                    group="deals-page"
                                    index="leadlet-deal"
                                />
                            </div>
                            <div className="col-md-2">
                                <ListFilter
                                    id="Status"
                                    dataField="deal_status.keyword"
                                    title="Status"
                                    emptyText="No Status"
                                    multi={true}
                                    group="deals-page"
                                    index="leadlet-deal"
                                />
                            </div>
                        </div>
                    }

                <div className="row stages">

                    <div id="deals-board" className="lists">
                        <CustomDragLayer snapToGrid={false} />
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
                            pipeline: {
                                id: this.state.selectedPipeline.id
                            }
                        }}
                    />
                }
            </div>
        );
    }

    renderCards() {

        if (_.has(this, ["props", "pipelineStore", "ids", "length"])
            && _.has(this, ["props", "stageStore", "ids", "length"])
            && this.state.selectedPipeline) {

            return this.props.stageStore.ids.map(stageId => this.props.stageStore.items[stageId])
                .filter(stage => stage.pipelineId === this.state.selectedPipeline.id)
                .map(stage =>
                    <StageColumn
                        key={stage.id}
                        stage={stage}
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
        pipelineStore: state.pipelineStore,
        stageStore: state.stageStore
    }
}

export default connect(mapStateToProps, {
    getAllPipelines,
    getPipelineStages,
    deleteDeal,
    pipelineSelected,
    appendFilter
})(DragDropContext(HTML5Backend)(DealBoard));

