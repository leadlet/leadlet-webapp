import React from 'react';
import PropTypes from 'prop-types';
import Card from "./DealCard";

const propTypes = {
    card: PropTypes.object
};

const DealCardDragPreview = (props) => {
    let styles = {
        listStyle: 'none',
        backgroundColor: '#FAFAFB',
        display: 'inline-block',
        transform: 'rotate(-3deg)',
        WebkitTransform: 'rotate(-3deg)',
        border: '1px solid #e7eaec',
        margin: '0 0 10px 0',
        padding: '10px',
        borderRadius: '2px',
        width: `${props.card.clientWidth || 243}px`,
        height: `${props.card.clientHeight || 80}px`
    }

    return (
        <div style={styles}>
            <Card item={props.card.item}/>
        </div>
    );
};

DealCardDragPreview.propTypes = propTypes;

export default DealCardDragPreview;
