import React, {Component} from 'react';
import Card from './DraggableDealCard';
import {DropTarget} from 'react-dnd';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getStageDeals, patchDeal} from "../../actions/deal.actions";
import {QueryUtils} from "../Search/QueryUtils";
import * as _ from "lodash";

let VisibilitySensor = require('react-visibility-sensor');


const specs = {

    drop(props, monitor, component) {
        document.getElementById(monitor.getItem().id).style.display = 'block';
        const {placeholderIndex} = component.state;
        const lastX = monitor.getItem().x;
        const lastY = monitor.getItem().y;
        const nextX = props.x;
        let nextY = placeholderIndex;
        nextY += 1;

        if (lastX === nextX && lastY === nextY) { // if position equel
            return;
        }

        props.patchDeal({id: monitor.getItem().id, priority: 0, stageId: props.stage.id});


    },


    hover(props, monitor, component) {
        // defines where placeholder is rendered
        const placeholderIndex = 0;

        // horizontal scroll
        if (!props.isScrolling) {
            if (window.innerWidth - monitor.getClientOffset().x < 200) {
                props.startScrolling('toRight');
            } else if (monitor.getClientOffset().x < 200) {
                props.startScrolling('toLeft');
            }
        } else {
            if (window.innerWidth - monitor.getClientOffset().x > 200 &&
                monitor.getClientOffset().x > 200
            ) {
                props.stopScrolling();
            }
        }

        // IMPORTANT!
        // HACK! Since there is an open bug in react-dnd, making it impossible
        // to get the current client offset through the collect function as the
        // user moves the mouse, we do this awful hack and set the state (!!)
        // on the component from here outside the component.
        // https://github.com/gaearon/react-dnd/issues/179
        component.setState({placeholderIndex});

        // when drag begins, we hide the card and only display cardDragPreview
        const item = monitor.getItem();
        document.getElementById(item.id).style.display = 'none';
    }
};


class StageColumn extends Component {
    static propTypes = {
        connectDropTarget: PropTypes.func.isRequired,
        deleteDeal: PropTypes.func.isRequired,
        isOver: PropTypes.bool,
        item: PropTypes.object,
        canDrop: PropTypes.bool,
        startScrolling: PropTypes.func,
        stopScrolling: PropTypes.func,
        isScrolling: PropTypes.bool
    }

    constructor(props) {
        super(props);
        this.state = {
            placeholderIndex: undefined,
            isScrolling: false,
            currentPage: 0,
            maxPage: 0,
            idList: []
        };

        this.loadMoreDeal = this.loadMoreDeal.bind(this);
        this.hasMoreItem = this.hasMoreItem.bind(this);
        this.getQuery = this.getQuery.bind(this);

    }

    getSort(props = this.props) {
        return QueryUtils.getSort(props.sortStore, {group: "deals-page"})
    }

    getQuery(props = this.props) {
        return QueryUtils.getQuery(props.filterStore, {group: "deals-page"})
    }

    componentDidUpdate(prevProps) {

        if (this.getQuery(prevProps) !== this.getQuery()
            || this.getSort(prevProps) !== this.getSort()) {
            this.props.getStageDeals(QueryUtils.addStageFilter(this.getQuery(), this.props.stage.id),
                this.getSort(), this.props.stage.id);
        }
    }

    componentDidMount() {
        if (this.props.stage) {
            this.props.getStageDeals(QueryUtils.addStageFilter(this.getQuery(), this.props.stage.id), this.getSort(), this.props.stage.id);
        }
    }

    render() {
        const {connectDropTarget, isOver, canDrop} = this.props;
        let cardList = [];

        // if there is no items in cards currently, display a placeholder anyway
        if (isOver && canDrop ) {
            cardList.push(<div><li key="placeholder" className="info-element placeholder"/></div>);
        }

        if (_.has(this, ["props", "dealStore", "ids"])) {
            this.props.dealStore.ids
                .filter(dealId => {
                    return this.props.dealStore.items[dealId].stage.id === this.props.stage.id
                })
                .forEach((dealId, i) => {
                    let deal = this.props.dealStore.items[dealId];
                    cardList.push(
                        <Card x={deal.stage.id} y={deal.order}
                              item={deal}
                              key={deal.id}
                              stopScrolling={this.props.stopScrolling}
                              deleteDeal={this.props.deleteDeal}
                        />
                    );
                });
        }


        return connectDropTarget(
            <ul>
                {cardList}
                <VisibilitySensor onChange={this.loadMoreDeal}/>
            </ul>
        );
    }

    loadMoreDeal(isVisible) {
        if (isVisible && this.hasMoreItem()) {
            this.setState({currentPage: this.state.currentPage + 1},
                () => this.props.getStageDeals(QueryUtils.addStageFilter(this.getQuery(), this.props.stage.id),
                    this.props.sort,
                    this.props.stage.id,
                    this.state.currentPage,
                    true));
        }
    }

    hasMoreItem() {

        if( _.has(this, ["props","stageStore","items",this.props.stage.id,"maxDealCount"]) ){
            let stageDealCount =  this.props.dealStore.ids
                .filter( dealId => this.props.dealStore.items[dealId].stage.id === this.props.stage.id)
                .length;
            return this.props.stageStore.items[this.props.stage.id].maxDealCount > stageDealCount;
        }else{
            return false;
        }

    }

}

function mapStateToProps(state, props) {
    return {
        dealStore: state.dealStore,
        filterStore: state.filterStore,
        sortStore: state.sortStore,
        stageStore: state.stageStore

    }
}

let dropWrapper = DropTarget('card', specs, (connectDragSource, monitor) => ({
    connectDropTarget: connectDragSource.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    item: monitor.getItem()
}))(StageColumn);

export default connect(mapStateToProps, {getStageDeals, patchDeal})(dropWrapper);


