import React, { Component } from 'react';
import { DropTarget, DragSource } from 'react-dnd';
import PropTypes from 'prop-types';

import Cards from './Cards';

const listSource = {
  beginDrag(props) {
    return {
      id: props.id,
      x: props.x
    };
  },
  endDrag(props) {
    props.stopScrolling();
  }
};

const listTarget = {
  canDrop() {
    return false;
  },
  hover(props, monitor) {
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
    const { id: listId } = monitor.getItem();
    const { id: nextX } = props;
    if (listId !== nextX) {
      props.moveList(listId, props.x);
    }
  }
};

class CardsContainer extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    item: PropTypes.object,
    x: PropTypes.number,
    moveCard: PropTypes.func.isRequired,
    moveList: PropTypes.func.isRequired,
    isDragging: PropTypes.bool,
    startScrolling: PropTypes.func,
    stopScrolling: PropTypes.func,
    isScrolling: PropTypes.bool,
      deleteDeal: PropTypes.func.isRequired

  }

  render() {
    const { connectDropTarget, connectDragSource, item, x, moveCard, isDragging } = this.props;
    const opacity = isDragging ? 0.5 : 1;

    return connectDragSource(connectDropTarget(
        <div className="list" style={{ opacity }}>
          <div className="stage-header">
            <div className="stage-name">{item.name}</div>
          </div>
        <Cards
          moveCard={moveCard}
          x={x}
          startScrolling={this.props.startScrolling}
          stopScrolling={this.props.stopScrolling}
          isScrolling={this.props.isScrolling}
          cards={this.props.cards}
          deleteDeal={this.props.deleteDeal}
        />
        <footer>Total potential: 1000$</footer>
      </div>
    ));
  }
}


let dropWrapper = DropTarget('list', listTarget, connectDragSource => ({
    connectDropTarget: connectDragSource.dropTarget(),
}))(CardsContainer);

let dragWrapper = DragSource('list', listSource, (connectDragSource, monitor) => ({
    connectDragSource: connectDragSource.dragSource(),
    isDragging: monitor.isDragging()
}))(dropWrapper);

export default dragWrapper;