import React from 'react';
import PropTypes from 'prop-types';
import Card from "./Deals/Card";

let styles = {};

const propTypes = {
    card: PropTypes.object
};

const CardDragPreview = (props) => {
    let styles = {
        display: 'inline-block',
        transform: 'rotate(-3deg)',
        WebkitTransform: 'rotate(-3deg)',
        width: `${props.card.clientWidth || 243}px`,
        height: `${props.card.clientHeight || 243}px`
    }

    return (
        <div style={styles}>
            <Card item={props.card.item}/>
        </div>
    );
};

CardDragPreview.propTypes = propTypes;

export default CardDragPreview;
