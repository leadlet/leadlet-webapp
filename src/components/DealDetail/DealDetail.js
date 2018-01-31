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


class DealDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: '',
            isEditDealModalVisible: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.openActivityModal = this.openActivityModal.bind(this);
        this.closeActivityModal = this.closeActivityModal.bind(this);
        this.openEditDealModal = this.openEditDealModal.bind(this);
        this.closeEditDealModal = this.closeEditDealModal.bind(this);
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
        this.state.value = '';
    }

    componentDidMount() {
        this.props.getDealById(this.props.match.params.dealId);

    }

    openActivityModal() {
        this.setState({showModal: true});
    }

    closeActivityModal() {
        this.setState({showModal: false});
    }

    refreshTimeline() {
        this.props.getTimelineByDealIdAndRefresh(null, null, null, this.props.viewedDeal.id)
    }

    render() {
        const deal = this.props.viewedDeal;
        if (!deal) {
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
                                            <dt>Stage:</dt>
                                            <dd>{deal.stage.name}</dd>
                                            <dt>Assigned To:</dt>
                                            <dd><Link className="text-navy" to={"/user/" + deal.owner.id}>{deal.owner.firstName} {deal.owner.lastName}</Link></dd>
                                            <dt>Organization:</dt>
                                            <dd><Link className="text-navy" to={"/organization/" + deal.organization.id}>{deal.organization.name}</Link></dd>
                                            <dt>Last Updated:</dt>
                                            <dd>{moment(deal.lastModifiedDate, "YYYY-MM-DDTHH:mm:ss+-HH:mm").format("DD.MM.YYYY")}</dd>
                                            <dt>Created:</dt>
                                            <dd>{moment(deal.createdDate, "YYYY-MM-DDTHH:mm:ss+-HH:mm").format("DD.MM.YYYY")}</dd>
                                            <dt>Contact:</dt>
                                            <dd className="project-people">
                                                <Link className="text-navy" to={"/person/" + deal.person.id} data-toggle="tooltip" title={deal.person.name}>
                                                    <img alt="image" className="img-circle" src={process.env.PUBLIC_URL + '/img/headshot-placeholder.jpg'}/>
                                                </Link>
                                            </dd>
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
                                                                <form role="form" onSubmit={this.handleSubmit}>
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
                        <div className="col-lg-4">
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
                            />
                        }

                    </div>
                </div>
            )
        }
    }


}

function mapStateToProps(state) {
    return {
        viewedDeal: state.deals.viewedDeal
    };
}

export default connect(mapStateToProps, {
    getDealById,
    createNote,
    getTimelineByDealId,
    getTimelineByDealIdAndRefresh,
    getByIdOrganization,
    getById
})(DealDetail);
