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
                                className='short-text width-chars-9 font-size-smaller'>{ _.has(item, ["products","0","name"])? _.get(item, ["products","0","name"]) : "-"}</div>|
                            <div className='short-text width-chars-9 font-size-smaller'>{item.dealChannel ? item.dealChannel.name : "-"}</div>|
                            <div className='short-text width-chars-9 font-size-smaller'>{item.dealSource ? item.dealSource.name : "-"}</div>
                        </div>
                        <div className="potential-value">{item.dealValue && item.dealValue.potentialValue} <i className="fa fa-money"/> </div>
                    </div>
                    <div className="small-line">
                        <div className="source-channel-product">
                            <div className="short-text width-chars-9 font-size-small">{  _.has(item, ["person","phones","0","phone"]) ? _.get(item, ["person","phones","0","phone"]) : "-"}</div> /
                            <div className="short-text width-chars-9 font-size-small">{  _.has(item, ["person","email"]) ?  _.get(item, ["person","email"])  : "-"}</div>
                        </div>
                        <div className={"dot " + getActivityStatusColor(item)}/>
                    </div>
                    <div className="small-line">
                        <div className="short-text width-chars-15 font-size-smaller">{ _.has(item, ["person","name"])? _.has(item, ["person","name"]) : "-"}</div>
                        <div className="short-text width-chars-15 font-size-smaller text-right">{formattedDate}</div>
                    </div>
                </div>
            </Link>
        </li>
    );
};


Card.propTypes = propTypes;

export default Card;
