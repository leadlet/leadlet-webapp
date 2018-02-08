import React, {Component} from 'react';
import '../../../node_modules/fullcalendar/dist/fullcalendar.css';
import connect from "react-redux/es/connect/connect";
import {getDealById} from "../../actions/deal.actions";
import {createNote} from "../../actions/note.actions";
import {getTimelineByDealId, getTimelineByDealIdAndRefresh} from "../../actions/timeline.actions";
import Timeline from "../Timeline/Timeline";
import {getByIdOrganization} from "../../actions/organization.actions";
import {getById} from "../../actions/person.actions";
import CreateEditDeal from '../DealDetail/CreateEditDeal'
import moment from 'moment';
import Link from "react-router-dom/es/Link";
import EditOrCreateActivity from "../Activity/EditOrCreateActivity";


export const NotPermitted = function (props) {
    return (
      <h2>You Don't have permission to see this page</h2>
    );
}
