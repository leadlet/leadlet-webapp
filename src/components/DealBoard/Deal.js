import React from 'react';
import {connect} from "react-redux";
import {dragDropTypes} from "../../constants/drag.drop.types";
import { DragSource } from 'react-dnd';
import flow from 'lodash.flow';

const dealSource = {
    beginDrag(props) {
        // Return the data describing the dragged item
        const item = { id: props.id };
        return item;
    },

    endDrag(props, monitor, component) {
        if (!monitor.didDrop()) {
            return;
        }

        // When dropped on a compatible target, do something
        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();
        console.log("DROP DEAL {} TO STAGE {}",item.id, dropResult.id)
    }
};


class Deal extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        const {deal} = this.props;
        const { isDragging, connectDragSource } = this.props;

        return connectDragSource(
            <li className="warning-element" id={deal.id}>
                {deal.name}
                <div className="agile-detail pull-right">
                    <i className="fa fa-clock-o"/> 12.10.2015
                    <div className="btn-group btn-group-xs" role="group" aria-label="...">
                        <i className="btn fa fa-edit"  onClick={() => this.props.onEditDeal(deal.id)}></i>
                        <i className="btn fa fa-trash" onClick={() => this.props.onDeleteDeal(deal.id)}></i>
                    </div>
                </div>
                <div>
                    I am a draggable card number {deal.id}
                    {isDragging && ' (and I am being dragged now)'}
                </div>
            </li>

        );
    }

}

export default flow(
    DragSource(dragDropTypes.DEAL, dealSource, (connect, monitor) => ({
        // Call this function inside render()
        // to let React DnD handle the drag events:
        connectDragSource: connect.dragSource(),
        // You can ask the monitor about the current drag state:
        isDragging: monitor.isDragging()
    }))
)(Deal);

