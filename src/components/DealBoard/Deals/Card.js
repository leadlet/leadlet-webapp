import React from 'react';
import PropTypes from 'prop-types';
import Link from "react-router-dom/es/Link";

const propTypes = {
    item: PropTypes.object.isRequired,
    style: PropTypes.object,
    editDeal: PropTypes.func.isRequired,
    deleteDeal: PropTypes.func.isRequired
};



const Card = (props) => {
    const { style, item } = props;

    return (

        <li style={style} className="info-element" id={style ? item.id : null}>
            {item.name}
            <div className="agile-detail">
                <a href="#" className="pull-right btn btn-xs btn-primary">Done</a>
                <Link to={"/deals/"+item.id}><i className="btn fa fa-edit" /></Link>
                <i className="btn fa fa-trash" onClick={() => props.deleteDeal(item.id)}/>
                <i className="fa fa-clock-o"/> 08.04.2015
            </div>
        </li>
    );
};

Card.propTypes = propTypes;

export default Card;
