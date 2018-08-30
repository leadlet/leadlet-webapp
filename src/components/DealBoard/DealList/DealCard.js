import React from 'react';
import PropTypes from 'prop-types';
import Link from "react-router-dom/es/Link";
import moment from 'moment';

const propTypes = {
    item: PropTypes.object.isRequired,
    style: PropTypes.object
};

function createPhoneMail(item) {
    var phones_mail = [];

    if (item.person.phones && item.person.phones.length > 0) {
        phones_mail.push(item.person.phones[0].phone);
    }
    if (item.person.email) {
        phones_mail.push(item.person.email);
    }

    return phones_mail.join(" / ");
}

function getActivityStatusColor(item) {
    if (item.activityStatus === "EXPIRED") {
        return "red-bg";
    }
    if (item.activityStatus === "TODAY") {
        return "yellow-green-bg";
    }
    if (item.activityStatus === "IN_FUTURE") {
        return "orange-bg";
    }
    if (item.activityStatus === "NO_ACTIVITY") {
        return "slate-gray-bg";
    }
}

const Card = (props) => {
    const {style, item} = props;

    const formattedDate = moment(item.createdDate).fromNow();

    return (


        <li style={style} className="info-element" id={style ? item.id : null}>
            <Link style={{ textDecoration: 'inherit', color:'inherit' }} to={"/deal/" + item.id}>
                <div className="card-body">
                    <div className="small-line">
                        <div className="source-channel-product">
                            <div
                                className='short-text width-chars-10 font-size-smaller'>{item.products && item.products.length > 0 ? item.products[0].name : "-"}</div>|
                            <div className='short-text width-chars-10 font-size-smaller'>{item.dealChannel ? item.dealChannel.name : "-"}</div>|
                            <div className='short-text width-chars-10 font-size-smaller'>{item.dealSource ? item.dealSource.name : "-"}</div>
                        </div>
                        <div className="potential-value">{item.dealValue && item.dealValue.potentialValue} <i className="fa fa-money"/> </div>
                    </div>
                    <div className="small-line">
                        <div className="source-channel-product">
                            <div className="short-text width-chars-10 font-size-small">{item.person.phones && item.person.phones.length > 0 ? item.person.phones[0].phone : "-"}</div> /
                            <div className="short-text width-chars-10 font-size-small">{item.person.email ? item.person.email : "-"}</div>
                        </div>
                        <div className={"dot " + getActivityStatusColor(item)}/>
                    </div>
                    <div className="small-line">
                        <div className="short-text width-chars-15 font-size-smaller">{item.person.name}</div>
                        <div className="short-text width-chars-15 font-size-smaller text-right">{formattedDate}</div>
                    </div>
                </div>
            </Link>
        </li>
    );
};

Card.propTypes = propTypes;

export default Card;
