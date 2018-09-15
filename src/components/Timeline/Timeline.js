import React, {Component} from 'react';
import moment from 'moment';
import connect from "react-redux/es/connect/connect";
import {getTimelineByFilter, resetTimelines} from "../../actions/timeline.actions";
import './../../styles/timeline.css';
import EditOrCreateActivity from "../Activity/EditOrCreateActivity";
import {searchQuerySelector, sortSelector, timelinesSelector} from "../../models/selectors";
import NoteCreated from "./NoteCreated";


class Timeline extends Component {

    PAGE_SIZE = 5;

    constructor(props) {
        super(props);

        this.state = {
            currentPage: 0,
            isActivityModalVisible: false
        };

        this.renderTimelineItems = this.renderTimelineItems.bind(this);
        this.openActivityModal = this.openActivityModal.bind(this);
        this.closeActivityModal = this.closeActivityModal.bind(this);
    }

    componentWillUnmount() {
        //this.props.resetTimelines();
    }

    componentDidMount() {
        this.props.getTimelineByFilter();
    }

    openActivityModal() {
        this.setState({isActivityModalVisible: true});
    }

    closeActivityModal() {
        this.setState({isActivityModalVisible: false});
    }
    renderTimelineItems() {
        return this.props.timelines.map(timelineItem => {
                    if (timelineItem.type === 'NOTE_CREATED') {
                        return (
                            <NoteCreated item={timelineItem}/>
                        )
                    } else {
                        return (
                            <em>Loading...</em>
                        );
                    }
                });
    }

    render() {
            return (
                <div className="ibox-content">
                    <div className="tracking-list">


                        <div className="tracking-item">
                            <div className="tracking-icon status-intransit">
                                <svg className="svg-inline--fa fa-circle fa-w-16" aria-hidden="true" data-prefix="fas" data-icon="circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                                    <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"/>
                                </svg>

                            </div>
                            <div className="tracking-content"><a className="btn btn-primary btn-sm" onClick={() => this.openActivityModal()}>New Activity</a></div>
                        </div>

                        <div className="tracking-item">
                            <div className="tracking-icon status-intransit">
                                <svg className="svg-inline--fa fa-circle fa-w-16" aria-hidden="true" data-prefix="fas" data-icon="circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                                    <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"/>
                                </svg>

                            </div>
                            <div className="tracking-date">Aug 10, 2018<span>11:19 AM</span></div>
                            <div className="tracking-content">SHIPMENT DELAYSHIPPER INSTRUCTION TO DESTROY<span>SHENZHEN, CHINA, PEOPLE'S REPUBLIC</span></div>
                        </div>

                        <div className="tracking-item-separator"><h2><span>past</span></h2></div>

                        {
                            this.renderTimelineItems()
                        }
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
}

function mapStateToProps(state) {
    return {
        timelines: timelinesSelector(state),
        query: searchQuerySelector(state, {group: "timelines-page"}),
        sort: sortSelector(state, {group: "timelines-page"}),
        maxTimelineCount: state.timelines.maxTimelineCount
    };
}

export default connect(mapStateToProps, {resetTimelines, getTimelineByFilter})(Timeline);
