import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {createNote} from "../../actions/note.actions";
import {getByIdOrganization} from "../../actions/organization.actions"
import moment from 'moment';
import '../../../node_modules/fullcalendar/dist/fullcalendar.css';
import $ from 'jquery';
import Timeline from "../Timeline/Timeline";
import ContactOrganization from "./ContactOrganization";
import {getTimelineByOrganizationId, getTimelineByOrganizationIdAndRefresh} from "../../actions/timeline.actions";
import {getActivitiesByOrganizationId} from "../../actions/activity.actions";
import EditOrCreateActivity from "../Activity/EditOrCreateActivity";
import CreateEditDeal from "../DealDetail/CreateEditDeal";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import {deleteDeal, getDealsByOrganizationId} from "../../actions/deal.actions";
import Link from "react-router-dom/es/Link";
import {organizationDealsSelector} from "../../models/selectors";

class OrganizationDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOrganizationModalVisible: false,
            isDealModalVisible: false,
            isActivityModalVisible: false,
            value: '',
            deletingDeal: null,
            showDeleteDealDialog: false,
            files: []

        };

        this.openEditModal = this.openEditModal.bind(this);
        this.closeEditModal = this.closeEditModal.bind(this);
        this.openActivityModal = this.openActivityModal.bind(this);
        this.closeActivityModal = this.closeActivityModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.refreshTimeline = this.refreshTimeline.bind(this);
        this.openDealModal = this.openDealModal.bind(this);
        this.closeDealModal = this.closeDealModal.bind(this);
        this.dataMapper = this.dataMapper.bind(this);
        this.titleFormatter = this.titleFormatter.bind(this);
        this.deleteDeal = this.deleteDeal.bind(this);
        this.urlFormatter = this.urlFormatter.bind(this);
    }

    dataMapper() {
        if (this.props.deals) {
            return this.props.deals.map(deal => {
                return {
                    id: deal.id,
                    title: deal.title,
                    dealValue: deal.dealValue && deal.dealValue.potentialValue,
                    stageId: deal.stage.name
                };
            });
        }

    }

    titleFormatter(cell, row) {
        return (<Link to={"/deal/" + row.id}>{cell}</Link>);
    }

    urlFormatter(cell, row) {
        return (<a href={cell}>{cell}</a>);
    }

    deleteDealFormatter(cell, row) {
        return (
            <i className="btn fa fa-trash" onClick={() => this.deleteDeal(row)}/>
        );
    }

    deleteDeal(deal) {
        this.setState({
            deletingDeal: deal,
            showDeleteDealDialog: true
        });
    }

    refreshTimeline() {
        this.props.getTimelineByOrganizationIdAndRefresh(null, null, null, this.props.viewedOrganization.id);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("Note Event: ", event.target);
        this.props.createNote({
            content: this.state.value,
            organizationId: this.props.viewedOrganization.id
        }, () => this.props.getTimelineByOrganizationIdAndRefresh(null, null, null, this.props.match.params.organizationId));
        this.setState({value: ''});
    }

    openEditModal() {
        this.setState({isOrganizationModalVisible: true});
    }

    closeEditModal() {
        this.setState({isOrganizationModalVisible: false});
    }

    openActivityModal() {
        this.setState({isActivityModalVisible: true});
    }

    closeActivityModal() {
        this.setState({isActivityModalVisible: false});
    }

    openDealModal() {
        this.setState({isDealModalVisible: true});
    }

    closeDealModal() {
        this.setState({isDealModalVisible: false});
    }

    componentDidMount() {
        this.props.getByIdOrganization(this.props.match.params.organizationId);
        this.props.getActivitiesByOrganizationId(this.props.match.params.organizationId);
        this.props.getDealsByOrganizationId(this.props.match.params.organizationId);
    }

    componentDidUpdate() {

        if (!this.props.ids) {
            return;
        }

        let events = this.props.ids.map(function (item) {
            return this.props.activities[item];
        }, this);

        if (events) {
            $('#contact-calendar').fullCalendar('destroy');

            $('#contact-calendar').fullCalendar({
                header: {
                    left: 'prev,next today',
                    right: 'listDay,listWeek,month'
                },
                views: {
                    listDay: {buttonText: 'list day'},
                    listWeek: {buttonText: 'list week'}
                },
                defaultView: 'listWeek',
                navLinks: true,
                editable: true,
                eventLimit: true,
                timezone: 'local',
                events
            });
        }
    }

    render() {
        if (!this.props.viewedOrganization) {
            return (
                <em>Loading details for {this.props.match.params.organizationId}</em>
            );
        } else {
            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2">
                            <div className="contact-box center-version">
                                <a onClick={() => this.openEditModal(this.props.viewedOrganization.type)}>
                                    <i className="fa fa-user-circle-o fa-5x" aria-hidden="true"/>
                                    <h3 className="m-b-xs">
                                        <strong>{this.props.viewedOrganization && this.props.viewedOrganization.name}</strong>
                                    </h3>

                                    <address className="m-t-md">
                                        {this.props.viewedOrganization && this.props.viewedOrganization.address}<br/>
                                        {this.props.viewedOrganization && this.props.viewedOrganization.phones.map(phoneItem => {
                                            return (
                                                <div><i className="fa fa-phone"/> {phoneItem.phone}<br/></div>
                                            );
                                        })}

                                        {this.props.viewedOrganization && this.props.viewedOrganization.email &&
                                        <span><i
                                            className="fa fa-envelope"/> {this.props.viewedOrganization.email}</span>}
                                    </address>
                                </a>
                                <div className="contact-box-footer">
                                    <div className="m-t-xs btn-group">
                                        <a onClick={() => this.openEditModal(this.props.viewedOrganization.type)}
                                           className="btn btn-primary btn-sm">Edit</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="ibox">
                                <div className="ibox-content">
                                    <div className="row m-t-sm">
                                        <div className="col-lg-12">
                                            <div className="panel blank-panel">
                                                <div className="panel-heading">
                                                    <div className="panel-options">
                                                        <ul className="nav nav-tabs">
                                                            <li className="active"><a href="#tab-1"
                                                                                      data-toggle="tab">Add
                                                                a Note</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="panel-body">
                                                    <div className="tab-content">
                                                        <div className="tab-pane active" id="tab-1">
                                                            <div className="note-form">
                                                                <form onSubmit={this.handleSubmit}>
                                                                    <div className="form-group">
                                                                            <textarea placeholder="Please enter a note."
                                                                                      className="form-control"
                                                                                      value={this.state.value}
                                                                                      onChange={this.handleChange}
                                                                            />
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <button type="submit"
                                                                                className="btn btn-sm btn-primary m-t-n-xs">
                                                                            <strong>Save</strong></button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane" id="tab-2">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ibox">
                                <Timeline
                                    pageSize={5}
                                    getTimelineItems={this.props.getTimelineByOrganizationId}
                                    itemId={this.props.match.params.organizationId}
                                />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="ibox">
                                <div className="ibox-title">
                                    <i className="btn btn-sm fa fa-plus pull-right" aria-hidden="true"
                                       onClick={() => this.openDealModal()}/>
                                    <h5>Deals</h5>
                                </div>
                                <div className="ibox-content text-center">
                                    <BootstrapTable
                                        tableHeaderClass='client-table-header'
                                        containerClass='client-table-container'
                                        tableContainerClass='client-table'
                                        tableBodyClass='table-hover'
                                        data={this.dataMapper()}
                                        remote={true}
                                        pagination={true}
                                        keyField='id'
                                        fetchInfo={{dataTotalSize: parseInt(this.props.viewedOrganization.dataTotalSize, 10)}}
                                        options={{
                                            sizePerPage: 5,
                                            onPageChange: this.props.viewedOrganization.onPageChange,
                                            sizePerPageList: [5, 10],
                                            page: this.props.viewedOrganization.currentPage,
                                            onSizePerPageList: this.props.viewedOrganization.onSizePerPageList
                                        }}

                                    >
                                        <TableHeaderColumn dataField='title'
                                                           dataFormat={this.titleFormatter}>Title</TableHeaderColumn>
                                        <TableHeaderColumn dataField='dealValue'>Deal Value</TableHeaderColumn>
                                        <TableHeaderColumn dataField='stageId'>Stage</TableHeaderColumn>
                                        <TableHeaderColumn disabled
                                                           dataFormat={this.deleteDealFormatter}/>
                                    </BootstrapTable>
                                </div>
                            </div>
                            <div className="ibox">
                                <div className="ibox-title">
                                    <i className="btn btn-sm fa fa-plus pull-right" aria-hidden="true"
                                       onClick={() => this.openActivityModal({
                                           start: moment(),
                                           end: moment()
                                       })}/>
                                    <h5>Activities</h5>
                                </div>
                                <div className="ibox-content">
                                    <div id="contact-calendar"/>
                                </div>
                            </div>
                        </div>
                        <EditOrCreateActivity showModal={this.state.isActivityModalVisible}
                                              close={this.closeActivityModal}
                                              initialValues={{
                                                  organization: {
                                                      id: this.props.viewedOrganization.id
                                                  }
                                              }}
                                              createCallback={this.refreshTimeline}
                                              showOrganizationSelection={false}
                        />
                        <ContactOrganization showEditModal={this.state.isOrganizationModalVisible}
                                             close={this.closeEditModal}
                                             initialValues={this.props.viewedOrganization}
                        />
                        <CreateEditDeal showModal={this.state.isDealModalVisible}
                                        close={this.closeDealModal}
                                        initialValues={{
                                            organization: {
                                                id: this.props.viewedOrganization.id
                                            }
                                        }}
                                        pipelineId={this.props.viewedOrganization.pipelineId}
                                        showOrganizationSelection={false}
                        />
                    </div>
                </div>
            )
        }
    }
}


function mapStateToProps(state, props) {
    return {
        viewedOrganization: state.organizations.viewedOrganization,
        activities: state.activities.items,
        ids: state.activities.ids,
        deals: organizationDealsSelector(state, props.match.params.organizationId)
    };
}

export default connect(mapStateToProps, {
    getByIdOrganization,
    createNote,
    getTimelineByOrganizationId,
    getTimelineByOrganizationIdAndRefresh,
    getActivitiesByOrganizationId,
    getDealsByOrganizationId,
    deleteDeal
})(OrganizationDetail);
