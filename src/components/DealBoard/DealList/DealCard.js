import React from 'react';
import PropTypes from 'prop-types';
import Link from "react-router-dom/es/Link";
import moment from 'moment';

const propTypes = {
    item: PropTypes.object.isRequired,
    style: PropTypes.object
};

const Card = (props) => {
    const { style, item } = props;

    const formattedDate = moment(item.createdDate, "YYYY-MM-DDTHH:mm:ss+-HH:mm").format("DD.MM.YYYY");

    return (

        <li style={style} className="info-element" id={style ? item.id : null}>
            <div className="card-body">{item.title}</div>
            <div className="agile-detail">
                <a href="/done" className="pull-right btn btn-xs btn-primary">Done</a>
                <Link to={"/deal/"+item.id}><i className="btn fa fa-edit" /></Link>
                <i className="btn fa fa-trash" onClick={() => props.deleteDeal(item)}/>
                <i className="fa fa-clock-o"/> {formattedDate}
            </div>
        </li>
    );
};

Card.propTypes = propTypes;

export default Card;
