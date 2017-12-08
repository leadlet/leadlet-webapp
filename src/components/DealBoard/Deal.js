import React from 'react';
import {connect} from "react-redux";
import {dragDropTypes} from "../../constants/drag.drop.types";
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom'

const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
}

const dealSource = {
    beginDrag(props) {
        return {
            deal: props.deal,
        }
    },
}

const dealTarget = {
    hover(props, monitor, component) {
        const sourceDeal = monitor.getItem().deal;
        const dragIndex = sourceDeal.order;
        const hoverIndex = props.deal.order;
        const targetStage = props.deal.stageId;


        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return
        }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

        // Determine mouse position
        const clientOffset = monitor.getClientOffset()

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return
        }

        // Time to actually perform the action
        props.onMoveDeal(sourceDeal, targetStage, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().deal.order = hoverIndex
    },
}

class Deal extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        const {deal} = this.props;
        const {
            isDragging,
            connectDragSource,
            connectDropTarget,
        } = this.props

        const opacity = isDragging ? 0 : 1

        return connectDragSource(
            connectDropTarget(<div className="deal-item" style={{ ...style, opacity }}>{deal.name}</div>),

        );
    }

}


let dropWrapper = DropTarget(dragDropTypes.DEAL, dealTarget, (connect) => ({
    connectDropTarget: connect.dropTarget(),
}))(Deal);

let dragWrapper = DragSource(dragDropTypes.DEAL, dealSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))(dropWrapper);

export default dragWrapper;
