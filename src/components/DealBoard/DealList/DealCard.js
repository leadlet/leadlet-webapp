import React from 'react';
import PropTypes from 'prop-types';
import Link from "react-router-dom/es/Link";
import moment from 'moment';

const propTypes = {
    item: PropTypes.object.isRequired,
    style: PropTypes.object
};

function createCardSource(item) {
    var names = [];

    if (item.products && item.products.length > 0) {
        names.push(item.products[0].name);
    } else {
        names.push("-")
    }
    if (item.dealChannel) {
        names.push(item.dealChannel.name);
    } else {
        names.push("-")
    }
    if (item.dealSource) {
        names.push(item.dealSource.name);
    } else {
        names.push("-")
    }
    return names.join(" | ");
}

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

const Card = (props) => {
    const {style, item} = props;

    const formattedDate = moment(item.createdDate, "YYYY-MM-DDTHH:mm:ss+-HH:mm").format("DD.MM.YYYY");

    return (

        <li style={style} className="info-element" id={style ? item.id : null}>
            <div className="card-body">
                <div className="small-line">
                    <div
                        className="short-text-10">{createCardSource(item)}</div>
                    <div className="potential-value">{item.dealValue && item.dealValue.potentialValue}</div>
                </div>
                <div className="small-line">
                    <div className="phone-mail">{createPhoneMail(item)}</div>
                    <div className="dot red-bg"/>
                </div>
                <div className="small-line">
                    <div className="short-text-10">{item.person.name}</div>
                    <div className="short-text-10 text-right">{formattedDate}</div>
                </div>
                <div className="edit-trash-icon">
                    <i className="fa fa-trash trash-icon" onClick={() => props.deleteDeal(item.id)}/>
                    <Link to={"/deal/" + item.id}><i className="fa fa-edit edit-icon"/></Link>
                </div>
            </div>
        </li>
    );
};

Card.propTypes = propTypes;

export default Card;
