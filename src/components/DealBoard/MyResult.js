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
import {CategorySearch, ReactiveBase, ResultList, ListItem, SingleRange} from "@appbaseio/reactivesearch/lib/index";
import {Link} from "react-router-dom";

class MyResult extends ResultList {

    constructor(props) {
        // At this point, props.shapeType === 'Circle', when Circle component
        // Is used

        super(props);
    }

    renderAsListItem = (item) => {
        const result = this.props.onData(item);

        if (result) {
            return (
                <li className="info-element" key={item.id}>
                    <div className="card-body">{item.title}</div>
                    <div className="agile-detail">
                        <a href="/done" className="pull-right btn btn-xs btn-primary">Done</a>
                        <Link to={"/deal/3"}><i className="btn fa fa-edit" /></Link>
                        <i className="btn fa fa-trash"/>
                        <i className="fa fa-clock-o"/> {22-12-2212}
                    </div>
                </li>
            );
        }

        return null;
    };


}

export default MyResult;