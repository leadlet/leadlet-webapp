import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getActivities, update} from "../../actions/activity.actions";
import '../../../node_modules/fullcalendar/dist/fullcalendar.css';
import {activitiesSelector, searchQuerySelector} from "../../models/selectors";
import * as _ from "lodash";
import ListFilter from "../Search/ListFilter";

var VisibilitySensor = require('react-visibility-sensor');

class Activities extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            activitySelectedForEdit: null,
            selectedType: null,
            currentPage: 0
        };

        this.openActivityModal = this.openActivityModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.renderActivityRows = this.renderActivityRows.bind(this);
        this.loadMoreDeal = this.loadMoreDeal.bind(this);
        this.hasMoreItem = this.hasMoreItem.bind(this);
    }

    openActivityModal(activity) {
        this.setState({showModal: true});
        this.setState({activitySelectedForEdit: activity});
    }

    closeModal() {
        this.setState({showModal: false});
    }

    componentDidMount() {
        this.props.getActivities(this.props.searchQuery);
    }

    componentDidUpdate(prevProps) {
        if( this.props.searchQuery !== prevProps.searchQuery){
            this.props.getActivities( this.props.searchQuery );
        }
    }

    renderActivityRows() {

        if (this.props.activities && this.props.activities.length > 0) {
            return this.props.activities.map(activity => (
                <tr key={activity.id}>
                    <td>{activity.id}</td>
                    <td><span className="pie">0.52,1.041</span></td>
                    <td>{activity.title}</td>
                    <td className="text-navy"><i className="fa fa-level-up"/> 40%</td>
                </tr>

            ));
        }
    }

    render() {
        return (
            <div className="wrapper wrapper-content  animated fadeInRight">
                <div className="row">
                    <div className="col-lg-2">
                        <div className="ibox float-e-margins">
                            <div className="ibox-content facet-filters">

                                <ListFilter
                                    id="types"
                                    dataField="activity_type.keyword"
                                    title="Types"
                                    emptyText ="No Product"
                                    multi={true}
                                    group="activities-page"
                                    index="leadlet-activity"
                                />
                                <ListFilter
                                    id="status"
                                    dataField="is_done"
                                    title="Status"
                                    emptyText ="No Product"
                                    multi={false}
                                    group="activities-page"
                                    index="leadlet-activity"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-10">
                        <div className="ibox float-e-margins">
                            <div className="ibox-content">

                                <table className="table table-hover">
                                    <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>Data</th>
                                        <th>User</th>
                                        <th>Value</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.renderActivityRows()}
                                    <VisibilitySensor onChange={this.loadMoreDeal}/>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }

    loadMoreDeal(isVisible) {
        if (isVisible && this.hasMoreItem()) {
            this.setState({currentPage: this.state.currentPage + 1},
                () => this.props.getActivities(this.props.searchQuery,
                    this.state.currentPage,
                    true));
        }
    }

    hasMoreItem() {
        return _.get(this, ["props", "maxActivityCount"], -1) >
            _.get(this, ["props", "activities", "length"], 0);
    }

}

function mapStateToProps(state) {
    return {
        activities: activitiesSelector(state),
        searchQuery: searchQuerySelector(state, {group: "activities-page"}),
        maxActivityCount: state.activities.maxActivityCount
    }
}

export default connect(mapStateToProps, {getActivities, update})(Activities);
