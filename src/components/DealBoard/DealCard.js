import React from 'react';
import PropTypes from 'prop-types';
import Link from "react-router-dom/es/Link";
import moment from 'moment';
import * as _ from "lodash";

const propTypes = {
    item: PropTypes.object.isRequired,
    style: PropTypes.object
};

function getActivityStatusColor(item) {
    if (item.activity_status === "EXPIRED") {
        return "red";
    }
    if (item.activity_status === "TODAY") {
        return "green";
    }
    if (item.activity_status === "IN_FUTURE") {
        return "orange";
    }
    if (item.activity_status === "NO_ACTIVITY") {
        return "gray";
    }
}

const DealCard = (props) => {
    const {style, item} = props;
    //const agentFirstName = item.agent && item.agent.firstName.charAt(0);
    //const agentLastName = item.agent && item.agent.lastName.charAt(0);
    const dealChannelName = item.deal_channel ? item.deal_channel.name.slice(0, 12) : 'Not Found';
    const dealSourceName = item.deal_source ? item.deal_source.name.slice(0, 8) : 'Not Found';
    const dealPhoneNumber = _.get(item, ["contact","phones","0","phone"], 'Not Number');
    let dealProductsName = item.products.map( x => x.length !== 0 ? dealProductsName = x.name.slice(0, 15) : dealProductsName = 'Not Products Name');
    const formattedDate = moment(item.created_date).fromNow();
    const agentImage = _.get(item, ["agent","imageUrl","length"],0) !== 0 ? item.agent.imageUrl : 'img/default-user-image.png' ;
    return (
        <li className="info-element" id={item.id} style={style}>
            <Link style={{ textDecoration: 'inherit', color:'inherit' }} to={"/deal/" + item.id}>
                <div className="lead-card">
                    <span className="lead-photo"><img alt="Deal Card" src={agentImage} /></span>
                    <span className="lead-product">{dealProductsName}</span>
                    <span className="lead-name">{item.contact && item.contact.name}</span>
                    <span className="lead-phone">{dealPhoneNumber}</span>
                    <div className="lead-icon">
                        <span/>
                        <span><i className="fa fa-trash" aria-hidden="true"
                                 onClick={(e)=> {
                                     e.preventDefault();
                                     props.deleteDeal(item);
                                 }}/>
                        </span>
                        <span><i className="fa fa-pencil" aria-hidden="true"/></span>
                    </div>
                    <div className="lead-channel">
                        <span className="first">{dealSourceName}</span>
                        <span className="second">{dealChannelName}</span>
                    </div>
                    <span className="lead-time">{formattedDate}</span>
                    <span className="lead-score"><span className="score high orange"/></span>
                </div>
            </Link>
        </li>
    );
};

DealCard.propTypes = propTypes;
export default DealCard;