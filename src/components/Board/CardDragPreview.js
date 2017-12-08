import React  from 'react';
import PropTypes from 'prop-types';

import Card from './Cards/Card';

const propTypes = {
  card: PropTypes.object
};

const CardDragPreview = (props) => {
  let width = `${props.card.clientWidth || 243}px`;
  let height = `${props.card.clientHeight || 243}px`;

  let styles = {
        display: 'inline-block',
        transform: 'rotate(-3deg)',
        WebkitTransform: 'rotate(-3deg)',
      height: height,
      width: width
    };

  return (
    <div style={styles}>
      <Card item={props.card.item} />
    </div>
  );
};

CardDragPreview.propTypes = propTypes;

export default CardDragPreview;
