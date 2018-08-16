import React from 'react';
import PropTypes from 'prop-types';
import Link from "react-router-dom/es/Link";
import moment from 'moment';

const propTypes = {
    item: PropTypes.object.isRequired,
    style: PropTypes.object
};

const Card = (props) => {
    const {style, item} = props;

    const formattedDate = moment(item.createdDate, "YYYY-MM-DDTHH:mm:ss+-HH:mm").format("DD.MM.YYYY");

    return (

        <li style={style} className="info-element" id={style ? item.id : null}>
            <div className="card-body">
                <div>
                    <p className="pull-left">{item.products.map(product => product.name)} | {item.dealChannel && item.dealChannel.name} | {item.dealSource && item.dealSource.name}</p>
                    <p className="pull-right">{item.dealValue && item.dealValue.potentialValue}</p>
                </div>
                <div>{item.person.phones.map(phone => phone.phone)} / {item.person.email}</div>
                <div>
                    <p className="pull-left">{item.person.name}</p>
                    <p className="pull-right">{item.createdDate}</p>
                    </div>
            </div>
            <div className="agile-detail">
                <Link to={"/deal/" + item.id}><i className="btn fa fa-edit"/></Link>
                <i className="btn fa fa-trash" onClick={() => props.deleteDeal(item.id)}/>
                <i className="fa fa-clock-o"/> {formattedDate}
            </div>
        </li>
    );
};

Card.propTypes = propTypes;

export default Card;
