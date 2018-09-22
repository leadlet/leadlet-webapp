import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {getTimelineByFilter, resetTimelines} from "../../actions/timeline.actions";
import './../../styles/timeline.css';
import EditOrCreateActivity from "../Activity/EditOrCreateActivity";
import {activitiesSelector, searchQuerySelector, sortSelector, timelinesSelector} from "../../models/selectors";
import NoteCreated from "./NoteCreated";
import * as _ from "lodash";
import ActivityCreated from "./ActivityCreated";
import {getActivities} from "../../actions/activity.actions";
import moment from "moment";
import UpcomingActivity from "./UpcomingActivity";
import NavigationFilter from "../Search/NavigationFilter";
import DealCreated from "./DealCreated";
var VisibilitySensor = require('react-visibility-sensor');


class Timeline extends Component {

    SORT = "sort=created_date,desc";

    constructor(props) {
        super(props);

        this.state = {
            currentPage: 0,
            isActivityModalVisible: false
        };

        this.renderTimelineItems = this.renderTimelineItems.bind(this);
        this.openActivityModal = this.openActivityModal.bind(this);
        this.closeActivityModal = this.closeActivityModal.bind(this);
        this.loadMoreItem = this.loadMoreItem.bind(this);
        this.hasMoreItem = this.hasMoreItem.bind(this);
        this.refreshTimeline = this.refreshTimeline.bind(this);
        this.renderUpcomingActivities = this.renderUpcomingActivities.bind(this);

    }

    refreshTimeline(){
        let newQuery =  this.combineDefaultFilter2Query( this.props.query, this.props.defaultFilter);
        this.props.getTimelineByFilter(newQuery, this.SORT);

        let newActivityQuery =  this.combineDefaultFilter2Query( this.props.defaultFilter, `start_date:[${moment()} TO *]`);

        this.props.getActivities(newActivityQuery, this.SORT);


    }

    componentDidMount() {
        this.refreshTimeline();
    }

    componentDidUpdate(prevProps) {
        if( (this.props.lastModifiedDate !== prevProps.lastModifiedDate)
        ||  ( this.props.query !== prevProps.query)){
            this.refreshTimeline();
        }
    }

    loadMoreItem(isVisible) {
        if (isVisible && this.hasMoreItem()) {
            let newQuery =  this.combineDefaultFilter2Query( this.props.query, this.props.defaultFilter);

            this.setState({currentPage: this.state.currentPage + 1},
                () => this.props.getTimelineByFilter( newQuery,
                    this.SORT,
                    this.state.currentPage,
                    true));
        }
    }

    combineDefaultFilter2Query( query, defaultFilter){
        return [query, defaultFilter].filter( item => !_.isEmpty(item)).join(" AND ")
    }

    openActivityModal() {
        this.setState({isActivityModalVisible: true});
    }

    closeActivityModal() {
        this.setState({isActivityModalVisible: false});
    }
    renderUpcomingActivities() {
        return this.props.upcomingActivities.map(item =>
            (<UpcomingActivity item={item}/>)
        );

        return( <h3>{this.props.upcomingActivities.length}</h3>);
    }

    renderTimelineItems() {
        return this.props.timelines.map(timelineItem => {
                    if (timelineItem.type === 'NOTE_CREATED') {
                        return (
                            <NoteCreated item={timelineItem}/>
                        )
                    } else if (timelineItem.type === 'ACTIVITY_CREATED') {
                        return (
                            <ActivityCreated item={timelineItem}/>
                        )
                    } else if (timelineItem.type === 'DEAL_CREATED') {
                        return (
                            <DealCreated item={timelineItem}/>
                        )
                    } else  {
                        return (
                            <em>Loading...</em>
                        );
                    }
                });
    }

    render() {
            return (
                <div className="ibox-content">
                    <div>
                        <NavigationFilter
                            id="Timelines"
                            dataField="type.keyword"
                            group="timelines-page"
                            index="leadlet-timeline"
                            options={this.props.options}
                        />
                    </div>
                    <div className="tracking-list">

                        <div className="tracking-item" key="new-activity">
                            <div className="tracking-icon status-intransit">
                                <svg className="svg-inline--fa fa-circle fa-w-16" aria-hidden="true" data-prefix="fas" data-icon="circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                                    <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"/>
                                </svg>

                            </div>
                            <div className="tracking-content"><a className="btn btn-primary btn-sm" onClick={() => this.openActivityModal()}>New Activity</a></div>
                        </div>

                        {
                            this.renderUpcomingActivities()
                        }

                        <div className="tracking-item-separator"><h2><span>past</span></h2></div>

                        {
                            this.renderTimelineItems()
                        }
                        <VisibilitySensor onChange={this.loadMoreItem}/>

                    </div>

                    {
                        this.state.isActivityModalVisible &&
                        <EditOrCreateActivity showModal={this.state.isActivityModalVisible}
                                              close={this.closeActivityModal}
                                              initialValues={this.props.initialValues}
                                              createCallback={this.refreshTimeline}
                                              showPersonSelection={false}
                        />

                    }
                </div>
            );
    }


    hasMoreItem() {
        return _.get(this, ["props", "maxTimelineCount"], -1) >
            _.get(this, ["props", "timelines", "length"], 0);
    }

}

function mapStateToProps(state) {
    return {
        upcomingActivities: activitiesSelector(state),
        timelines: timelinesSelector(state),
        query: searchQuerySelector(state, {group: "timelines-page"}),
        maxTimelineCount: state.timelines.maxTimelineCount
    };
}

export default connect(mapStateToProps, {resetTimelines, getTimelineByFilter, getActivities})(Timeline);
