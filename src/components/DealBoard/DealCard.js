import React from 'react';
import PropTypes from 'prop-types';
import Link from "react-router-dom/es/Link";
import moment from 'moment';

const propTypes = {
    item: PropTypes.object.isRequired,
    style: PropTypes.object
};

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

const DealCard = (props) => {
    const {style, item} = props;
    const agentFirstName = item.agent.firstName.charAt(0);
    const agentLastName = item.agent.lastName.charAt(0);
    let dealProdutsName;
    item.products.map(x => {
        if (x.length !== 0) {
            dealProdutsName = x.name;
        }
    });
    const formattedDate = moment(item.createdDate).fromNow();
    return (
        <li style={style} className="info-element" id={style ? item.id : null}>
            <Link style={{ textDecoration: 'inherit', color:'inherit' }} to={"/deal/" + item.id}>
                <div className="lead-card">
                    <span className="lead-user">{agentFirstName + agentLastName}</span>
                    <span className="lead-product">{dealProdutsName}</span>
                    <span className="lead-name">{item.contact.name}</span>
                    <span className="lead-price">${item.dealValue && item.dealValue.potentialValue}</span>
                    <span className={"lead-status " + getActivityStatusColor(item)}>{item.activityStatus}</span>
                    <span className="lead-time">{formattedDate}</span>
                    <div className="lead-source">
                        <span className="icon">
                            <i className="icon-channel-facebook"></i>
                        </span>
                        <span className="icon">
                            <span className="icon-channel-web"><span className="path1"></span><span className="path2"></span><span className="path3"></span><span className="path4"></span></span>
                        </span>
                        <span className="icon country">
                            <span className="icon-channel-flag-turkey">
                                <span className="path1"></span><span className="path2"></span><span className="path3"></span><span className="path4"></span><span className="path5"></span><span className="path6"></span><span className="path7"></span><span className="path8"></span><span className="path9"></span><span className="path10"></span><span className="path11"></span><span className="path12"></span><span className="path13"></span>
                            </span>
                        </span>
                        <span className="icon">
                            <span className="icon-channel-phone"><span className="path1"></span><span className="path2"></span><span className="path3"></span><span className="path4"></span></span>
                        </span>
                        <span className="icon">
                            <span className="icon-channel-write"><span className="path1"></span><span className="path2"></span><span className="path3"></span><span className="path4"></span><span className="path5"></span><span className="path6"></span></span>
                        </span>
                    </div>
                    <span className="lead-score"><span className="score high green"></span></span>
                </div>
            </Link>
        </li>
    );
};

DealCard.propTypes = propTypes;
export default DealCard;