import React, {Component} from 'react';
import Card from './DraggableDealCard';
import {DropTarget} from 'react-dnd';
import {findDOMNode} from 'react-dom'
import {dealConstants} from "../../../constants/deal.constants";
import PropTypes from 'prop-types';
import {searchQuerySelector, sortSelector} from "../../../models/selectors";
import {connect} from "react-redux";
import {getStageDeals, patchDeal} from "../../../actions/deal.actions";
import {QueryUtils} from "../../Search/QueryUtils";
import * as _ from "lodash";
var VisibilitySensor = require('react-visibility-sensor');

const MAX_INDEX = 100000;
const MIN_INDEX = 0;

function getPlaceholderIndex(y, scrollY) {
    // shift placeholder if y position more than card height / 2
    const yPos = y - dealConstants.OFFSET_HEIGHT + scrollY;
    let placeholderIndex;
    if (yPos < dealConstants.CARD_HEIGHT / 2) {
        placeholderIndex = -1; // place at the start
    } else {
        placeholderIndex = Math.floor((yPos - dealConstants.CARD_HEIGHT / 2) / (dealConstants.CARD_HEIGHT + dealConstants.CARD_MARGIN));
    }
    return placeholderIndex;
}

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


        let calculateNewPriority = (deals, newIndex) => {
            let prevDeal = deals[newIndex-1];
            let nextDeal = deals[newIndex];

            let prevPriority = prevDeal? prevDeal.priority : MIN_INDEX;
            let nextPriority = nextDeal? nextDeal.priority : MAX_INDEX;

            let newPriority = prevPriority + (( nextPriority - prevPriority ) / 2 );
            return Math.round(newPriority);
        };


        let newPriority = calculateNewPriority(props.deals, nextY);

        props.patchDeal( { id: monitor.getItem().id, priority: newPriority, stageId: props.stage.id});


    },


    hover(props, monitor, component) {
        // defines where placeholder is rendered
        const placeholderIndex = getPlaceholderIndex(
            monitor.getClientOffset().y,
            findDOMNode(component).scrollTop
        );

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


class Cards extends Component {
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

    }
    componentDidUpdate(prevProps) {
        if( this.props.query !== prevProps.query
            || this.props.sort !== prevProps.sort ){
            this.props.getStageDeals( QueryUtils.addStageFilter(this.props.query, this.props.stage.id), this.props.sort, this.props.stage.id);
        }
    }

    componentDidMount() {
        if( this.props.stage ){
            this.props.getStageDeals( QueryUtils.addStageFilter(this.props.query, this.props.stage.id), this.props.sort, this.props.stage.id);
        }
    }

    render() {
        const {connectDropTarget, isOver, canDrop} = this.props;
        const {placeholderIndex} = this.state;
        let isPlaceHold = false;
        let cardList = [];
        if( _.has(this, ["props","dealStore", "ids"])){
            this.props.dealStore.ids
                .filter( dealId => {
                    return this.props.dealStore.items[dealId].stage.id === this.props.stage.id
                } )
                .forEach( (dealId,i) => {
                    let deal = this.props.dealStore.items[dealId];
                    if (isOver && canDrop) {
                        isPlaceHold = false;
                        if (i === 0 && placeholderIndex === -1) {
                            cardList.push(<li key="placeholder" className="placeholder"/>);
                        } else if (placeholderIndex > i) {
                            isPlaceHold = true;
                        }
                    }
                    if (deal !== undefined) {
                        cardList.push(
                            <Card x={deal.stage.id} y={deal.order}
                                  item={deal}
                                  key={deal.id}
                                  stopScrolling={this.props.stopScrolling}
                                  deleteDeal={this.props.deleteDeal}
                            />
                        );
                    }
                    if (isOver && canDrop && placeholderIndex === i) {
                        cardList.push(<li key="placeholder" className="info-element placeholder"/>);
                    }
                });
        }

        // if placeholder index is greater than array.length, display placeholder as last
        if (isPlaceHold) {
            cardList.push(<li key="placeholder" className="info-element placeholder"/>);
        }

        // if there is no items in cards currently, display a placeholder anyway
        if (isOver && canDrop && _.get(this, ["dealStore","ids","length"],0 ) === 0) {
            cardList.push(<li key="placeholder" className="info-element placeholder"/>);
        }

        return connectDropTarget(
            <ul>
                {cardList}
                <VisibilitySensor onChange={this.loadMoreDeal} />

            </ul>
        );
    }

    loadMoreDeal(isVisible) {
        if( isVisible && this.hasMoreItem()){
            this.setState({ currentPage: this.state.currentPage+1},
                () => this.props.getStageDeals( QueryUtils.addStageFilter(this.props.query, this.props.stage.id),
                                            this.props.sort,
                                            this.props.stage.id,
                                            this.state.currentPage,
                                            true));
        }
    }
    hasMoreItem(){
        //return this.props.stage.maxDealCount > this.props.deals.length ;
    }
}

function mapStateToProps(state, props) {
    return {
        dealStore: state.dealStore,
        query: searchQuerySelector(state, {group: "deals-page"}),
        sort: sortSelector(state, {group: "deals-page"}),
    }
}

let dropWrapper = DropTarget('card', specs, (connectDragSource, monitor) => ({
    connectDropTarget: connectDragSource.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    item: monitor.getItem()
}))(Cards);

export default connect(mapStateToProps, {getStageDeals, patchDeal})(dropWrapper);


