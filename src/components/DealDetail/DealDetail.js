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
import {getActivitiesByDealId} from "../../actions/activity.actions";
import $ from "jquery";
import {dealSelector, detailedDealSelector} from "../../models/selectors";


class DealDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: '',
            isEditDealModalVisible: false,
            isActivityModalVisible: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.openActivityModal = this.openActivityModal.bind(this);
        this.closeActivityModal = this.closeActivityModal.bind(this);
        this.openEditDealModal = this.openEditDealModal.bind(this);
        this.closeEditDealModal = this.closeEditDealModal.bind(this);
        this.renderAssignee = this.renderAssignee.bind(this);
        this.renderOrganization = this.renderOrganization.bind(this);
        this.renderLastUpdateDate = this.renderLastUpdateDate.bind(this);
        this.renderPossibleCloseDate = this.renderPossibleCloseDate.bind(this);
        this.refreshTimeline = this.refreshTimeline.bind(this);
        this.renderCreatedDate = this.renderCreatedDate.bind(this);
        this.renderDealValue = this.renderDealValue.bind(this);
    }

    closeEditDealModal(){
        this.setState({
            isEditDealModalVisible: false
        });
    }

    openEditDealModal(){
        this.setState({
            isEditDealModalVisible: true
        });
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("Note Event: ", event.target);
        this.props.createNote({
            content: this.state.value,
            dealId: this.props.viewedDeal.id
        }, () => this.props.getTimelineByDealIdAndRefresh(null, null, null, this.props.match.params.dealId));
        this.setState({value: ''});
    }

    componentDidMount() {
        this.props.getDealById(this.props.match.params.dealId);
        this.props.getActivitiesByDealId(this.props.match.params.dealId);
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
                // customize the button names,
                // otherwise they'd all just say "list"
                views: {
                    listDay: {buttonText: 'list day'},
                    listWeek: {buttonText: 'list week'}
                },
                defaultView: 'listWeek',
                navLinks: true, // can click day/week names to navigate views
                editable: true,
                eventLimit: true, // allow "more" link when too many events
                timezone: 'local',
                events
            });
        }
    }

    openActivityModal() {
        this.setState({isActivityModalVisible: true});
    }

    closeActivityModal() {
        this.setState({isActivityModalVisible: false});
    }

    refreshTimeline() {
        this.props.getTimelineByDealIdAndRefresh(null, null, null, this.props.viewedDeal.id)
    }

    render() {
        const deal = this.props.viewedDeal;

        // TODO fix this part
        if (!deal || !deal.pipeline) {
            return (
                <em>Loading details for {this.props.match.params.dealId}</em>
            );
        } else {

            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="ibox">
                                <div className="ibox-content info-card">
                                    <div className="row">
                                        <dl className="dl-horizontal">
                                            <dt>Title:</dt>
                                            <dd>{deal.title}</dd>
                                            <dt>Pipeline:</dt>
                                            <dd>{deal.pipeline.name}</dd>
                                            <dt>Stage:</dt>
                                            <dd>{deal.stage.name}</dd>
                                            <dt>Deal Value:</dt>
                                            <dd>{this.renderDealValue()}</dd>
                                            <dt>Owner:</dt>
                                            <dd>{this.renderAssignee()}</dd>
                                            <dt>Contact:</dt>
                                            <dd>{this.renderPersons()}</dd>
                                            <dt>Organization:</dt>
                                            <dd>{this.renderOrganization()}</dd>
                                            <dt>Last Updated:</dt>
                                            <dd>{this.renderLastUpdateDate()}</dd>
                                            <dt>Created:</dt>
                                            <dd>{this.renderCreatedDate()}</dd>
                                            <dt>Possible Close:</dt>
                                            <dd>{this.renderLastUpdateDate()}</dd>
                                        </dl>
                                    </div>
                                    <div className="row">
                                        <button onClick={this.openEditDealModal} className="btn btn-white btn-xs pull-right">Edit Deal</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-5">
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
                                                            <li className="disabled"><a href="#tab-2">Send an
                                                                Email</a></li>
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
                                    getTimelineItems={this.props.getTimelineByDealId}
                                    itemId={this.props.viewedDeal.id}
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="ibox">
                                <div className="ibox-title">
                                    <i className="fa fa-plus pull-right" aria-hidden="true"
                                       onClick={() => this.openActivityModal({
                                           start: moment(),
                                           end: moment()
                                       })}
                                    />
                                    <h5>Activities</h5>
                                </div>
                                <div className="ibox-content">
                                    <div id="contact-calendar"/>
                                </div>
                            </div>
                        </div>

                        {
                            this.state.isEditDealModalVisible &&
                            <CreateEditDeal showModal={this.state.isEditDealModalVisible}
                                            close={this.closeEditDealModal}
                                            initialValues={this.props.viewedDeal}
                                            showPipelineSelection={false}
                            />
                        }
                        {
                            this.state.isActivityModalVisible &&
                            <EditOrCreateActivity showModal={this.state.isActivityModalVisible}
                                                  close={this.closeActivityModal}
                                                  initialValues={{dealId: this.props.viewedDeal.id}}
                                                  createCallback={this.refreshTimeline}
                                                  showDealSelection={false}
                            />
                        }




                    </div>
                </div>
            )
        }
    }


    renderAssignee() {
        const deal = this.props.viewedDeal;

        if(deal.owner){
            return (<Link className="text-navy" to={"/user/" + deal.owner.id}>{deal.owner.firstName} {deal.owner.lastName}</Link>);
        }else{
            return (<em>Not set</em>);
        }
    }

    renderOrganization() {
        const deal = this.props.viewedDeal;

        if(deal.organization){
            return (<Link className="text-navy" to={"/organization/" + deal.organization.id}>{deal.organization.name}</Link>);
        }else{
            return (<em>Not set</em>);
        }
    }

    renderPersons() {
        const deal = this.props.viewedDeal;

        if(deal.person){

            return (<Link className="text-navy" to={"/person/" + deal.person.id}>{deal.person.name}</Link>);


        }else{
            return (<em>Not set</em>);
        }
    }

    renderLastUpdateDate() {
        const deal = this.props.viewedDeal;

        if(deal.lastModifiedDate){
            return (
                moment(deal.lastModifiedDate, "YYYY-MM-DDTHH:mm:ss+-HH:mm").format("DD.MM.YYYY")
            );
        }else{
            return (<em>Not set</em>);
        }
    }

    renderPossibleCloseDate() {
        const deal = this.props.viewedDeal;

        if(deal.possibleCloseDate){
            return (
                moment(deal.possibleCloseDate, "YYYY-MM-DDTHH:mm:ss+-HH:mm").format("DD.MM.YYYY")
            );
        }else{
            return (<em>Not set</em>);
        }
    }
    renderCreatedDate() {
        const deal = this.props.viewedDeal;

        if(deal.createdDate){
            return (
                moment(deal.createdDate, "YYYY-MM-DDTHH:mm:ss+-HH:mm").format("DD.MM.YYYY")
            );
        }else{
            return (<em>Not set</em>);
        }
    }

    renderDealValue() {
        const deal = this.props.viewedDeal;

        if(deal.dealValue){
            return (
                <b>{deal.dealValue.potentialValue}</b>
            );
        }else{
            return (<em>Not set</em>);
        }
    }
}

function mapStateToProps(state, props) {
    return {
        viewedDeal: detailedDealSelector(state, props.match.params.dealId),
        activities: state.activities.items,
        ids: state.activities.ids
    };
}

export default connect(mapStateToProps, {
    getDealById,
    createNote,
    getTimelineByDealId,
    getTimelineByDealIdAndRefresh,
    getByIdOrganization,
    getById,
    getActivitiesByDealId
})(DealDetail);
