import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getActivities, update} from "../../actions/activity.actions";
import '../../../node_modules/fullcalendar/dist/fullcalendar.css';
import * as _ from "lodash";
import ListFilter from "../Search/ListFilter";
import SelectedFilters from "../Search/SelectedFilters";
import moment from "moment";
import Button from "react-bootstrap/es/Button";
import ColumnSorter from "../Search/ColumnSorter";
import EditOrCreateActivity from "./EditOrCreateActivity";
import {QueryUtils} from "../Search/QueryUtils";

let VisibilitySensor = require('react-visibility-sensor');

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
        this.getQuery = this.getQuery.bind(this);
        this.getSort = this.getSort.bind(this);
    }

    getSort(props = this.props) {
        return QueryUtils.getSort(props.sortStore, {group: "activities-page"})
    }

    openActivityModal(activity) {
        this.setState({showModal: true});
        this.setState({activitySelectedForEdit: activity});
    }

    closeModal() {
        this.setState({showModal: false});
    }

    componentDidMount() {
        this.props.getActivities(this.getQuery());
    }

    componentDidUpdate(prevProps) {
        if ((this.getQuery() !== this.getQuery(prevProps))
            || (this.getSort() !== this.getSort(prevProps))) {
            this.setState({currentPage: 0},
                () => this.props.getActivities(this.getQuery(), this.getSort(),
                    this.state.currentPage,
                    false));
        }
    }

    renderActivityRows() {
        if (_.has(this, ["props", "activityStore", "ids"])) {

            return this.props.activityStore.ids.map(activityId => {
                    let activity = this.props.activityStore.items[activityId];
                    if (activity === undefined) {
                        debugger;
                    }
                    const startDate = moment(activity.start);
                    return (
                        <tr key={activity.id}>
                            <td><a onClick={(e) => {
                                e.preventDefault();
                                this.openActivityModal(activity)
                            }}>{activity.title}</a></td>
                            <td>{_.get(activity, ["contact", "name"])}</td>
                            <td>{activity.type.name}</td>
                            <td>{activity.done ? "Done" : "Not Done"}</td>
                            <td>{startDate.format('DD/MM/YYYY')}</td>
                        </tr>
                    );
                }
            );
        }
    }

    render() {
        return (
            <div className="wrapper activities">
                <div className="row activities-toolbar">
                    <SelectedFilters
                        group="activities-page"
                        index="leadlet-activity"/>
                    <Button bsStyle="primary" bsSize="small" className="m-l-sm" onClick={this.openActivityModal}>New
                        Activity</Button>

                </div>
                <div className="row">
                    <div className="col-lg-2">
                        <div className="ibox float-e-margins">
                            <div className="ibox-content side-search-menu">

                                <ListFilter
                                    id="types"
                                    dataField="activity_type.keyword"
                                    title="Types"
                                    emptyText="No Product"
                                    multi={true}
                                    group="activities-page"
                                    index="leadlet-activity"
                                />
                                <ListFilter
                                    id="status"
                                    dataField="is_done"
                                    title="Status"
                                    emptyText="No Product"
                                    multi={false}
                                    group="activities-page"
                                    index="leadlet-activity"
                                    keyMapper={(key) => (key === "true" ? "Done" : "Not Done")}
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
                                        <th>Title <ColumnSorter dataField="title.keyword" group="activities-page"/></th>
                                        <th>Contact</th>
                                        <th>Type <ColumnSorter dataField="activity_type.keyword"
                                                               group="activities-page"/></th>
                                        <th>Status <ColumnSorter dataField="is_done" group="activities-page"/></th>
                                        <th>Date <ColumnSorter dataField="start_date" group="activities-page"/></th>
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
                <div>
                    <EditOrCreateActivity showModal={this.state.showModal}
                                          close={this.closeModal}
                                          initialValues={this.state.activitySelectedForEdit}
                    />
                </div>
            </div>
        );
    }

    loadMoreDeal(isVisible) {
        if (isVisible && this.hasMoreItem()) {
            this.setState({currentPage: this.state.currentPage + 1},
                () => this.props.getActivities(this.getQuery(), this.getSort(),
                    this.state.currentPage,
                    true));
        }
    }

    hasMoreItem() {
        return _.get(this, ["props", "activityStore", "maxActivityCount"], -1) >
            _.get(this, ["props", "activityStore", "ids", "length"], 0);
    }

    getQuery(props = this.props) {
        return QueryUtils.getQuery(props.filterStore, {group: "activities-page"})
    }


}

function mapStateToProps(state) {
    return {
        activityStore: state.activityStore,
        filterStore: state.filterStore,
        sortStore: state.sortStore
    }
}

export default connect(mapStateToProps, {getActivities, update})(Activities);
