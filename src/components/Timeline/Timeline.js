import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {getTimelineByFilter, resetTimelines} from "../../actions/timeline.actions";
import EditOrCreateActivity from "../Activity/EditOrCreateActivity";
import NoteCreated from "./NoteCreated";
import * as _ from "lodash";
import ActivityCreated from "./ActivityCreated";
import {getActivities} from "../../actions/activity.actions";
import moment from "moment";
import UpcomingActivity from "./UpcomingActivity";
import NavigationFilter from "../Search/NavigationFilter";
import DealCreated from "./DealCreated";
import {QueryUtils} from "../Search/QueryUtils";

let VisibilitySensor = require('react-visibility-sensor');


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
        this.getQuery = this.getQuery.bind(this);
    }

    refreshTimeline() {
        let newQuery = this.combineDefaultFilter2Query(this.getQuery(), this.props.defaultFilter);
        this.props.getTimelineByFilter(newQuery, this.SORT);

        let newActivityQuery = this.combineDefaultFilter2Query(this.props.defaultFilter, `start_date:[${moment()} TO *]`);

        this.props.getActivities(newActivityQuery, this.SORT);
    }

    componentDidMount() {
        this.refreshTimeline();
    }

    componentDidUpdate(prevProps) {
        if ((this.props.lastModifiedDate !== prevProps.lastModifiedDate)
            || ( this.getQuery() !== this.getQuery(prevProps))
            || (this.props.activityStore.ids !== prevProps.activityStore.ids)) {
            this.refreshTimeline();
        }
    }

    loadMoreItem(isVisible) {
        if (isVisible && this.hasMoreItem()) {
            let newQuery = this.combineDefaultFilter2Query(this.getQuery(), this.props.defaultFilter);

            this.setState({currentPage: this.state.currentPage + 1},
                () => this.props.getTimelineByFilter(newQuery,
                    this.SORT,
                    this.state.currentPage,
                    true));
        }
    }

    combineDefaultFilter2Query(query, defaultFilter) {
        return [query, defaultFilter].filter(item => !_.isEmpty(item)).join(" AND ")
    }

    openActivityModal() {
        this.setState({isActivityModalVisible: true});
    }

    closeActivityModal() {
        this.setState({isActivityModalVisible: false});
    }

    renderUpcomingActivities() {
        if( _.get(this, ["props","activityStore", "ids", "length"],0) > 0 ){
            return this.props.activityStore.ids.map(activityId => {
                    let activity = this.props.activityStore.items[activityId];
                    return (<UpcomingActivity key={activityId} item={activity}/>);
                }
            );
        }
    }

    renderTimelineItems() {
        if( _.get(this, ["props","timeLineStore", "ids", "length"],0) > 0 ){
            return this.props.timeLineStore.ids.map(timelineId => {
                let timelineItem = this.props.timeLineStore.items[timelineId];
                if (timelineItem.type === 'NOTE_CREATED') {
                    return (
                        <NoteCreated key={timelineId} item={timelineItem}/>
                    )
                } else if (timelineItem.type === 'ACTIVITY_CREATED') {
                    return (
                        <ActivityCreated key={timelineId} item={timelineItem}/>
                    )
                } else if (timelineItem.type === 'DEAL_CREATED') {
                    return (
                        <DealCreated key={timelineId} item={timelineItem}/>
                    )
                } else {
                    return (
                        <em>Loading...</em>
                    );
                }
            });
        }

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
                            <svg className="svg-inline--fa fa-circle fa-w-16" role="img"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="currentColor"
                                      d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"/>
                            </svg>

                        </div>
                        <div className="tracking-content"><a className="btn btn-primary btn-sm"
                                                             onClick={() => this.openActivityModal()}>New Activity</a>
                        </div>
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
                                          showPersonSelection={this.props.showPersonSelection}
                                          showDealSelection={this.props.showDealSelection}

                    />

                }
            </div>
        );
    }


    hasMoreItem() {
        return _.get(this, ["props", "timeLineStore", "maxTimelineCount"], -1) >
            _.get(this, ["props", "timeLineStore", "ids", "length"], 0);
    }

    getQuery(props = this.props) {
        return QueryUtils.getQuery(props.filterStore, {group: "timelines-page"})
    }
}

function mapStateToProps(state) {
    return {
        activityStore: state.activityStore,
        timeLineStore: state.timeLineStore,
        filterStore: state.filterStore,
        maxTimelineCount: state.timeLineStore.maxTimelineCount
    };
}

export default connect(mapStateToProps, {resetTimelines, getTimelineByFilter, getActivities})(Timeline);
