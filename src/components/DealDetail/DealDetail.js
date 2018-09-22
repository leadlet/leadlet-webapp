import React, {Component} from 'react';
import '../../../node_modules/fullcalendar/dist/fullcalendar.css';
import connect from "react-redux/es/connect/connect";
import {getDealById} from "../../actions/deal.actions";
import Timeline from "../Timeline/Timeline";
import {getById} from "../../actions/person.actions";
import CreateEditDeal from '../DealDetail/CreateEditDeal'
import LostReason from '../DealDetail/LostReason'
import moment from 'moment';
import Link from "react-router-dom/es/Link";
import {detailedDealSelector} from "../../models/selectors";
import Note from "../Note/Note";


class DealDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isEditDealModalVisible: false
        };

        this.openEditDealModal = this.openEditDealModal.bind(this);
        this.closeEditDealModal = this.closeEditDealModal.bind(this);
        this.closeLostReasonModal = this.closeLostReasonModal.bind(this);
        this.renderAssignee = this.renderAssignee.bind(this);
        this.renderLastUpdateDate = this.renderLastUpdateDate.bind(this);
        this.renderPossibleCloseDate = this.renderPossibleCloseDate.bind(this);
        this.renderCreatedDate = this.renderCreatedDate.bind(this);
        this.renderDealValue = this.renderDealValue.bind(this);
        this.openLostReasonModal = this.openLostReasonModal.bind(this);
    }

    closeEditDealModal() {
        this.setState({
            isEditDealModalVisible: false
        });
    }

    closeLostReasonModal() {
        this.setState({
            isLostReasonModalVisible: false
        });
    }

    openEditDealModal() {
        this.setState({
            isEditDealModalVisible: true
        });
    }

    openLostReasonModal() {
        this.setState({isLostReasonModalVisible: true});
    }

    componentDidMount() {
        this.props.getDealById(this.props.match.params.dealId);
    }

    componentDidUpdate() {

        if (!this.props.ids) {
            return;
        }
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
                <div className="container-fluid m-lg">
                    <div className="row">
                        <div className="col-md-4">
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
                                            <dt>Last Updated:</dt>
                                            <dd>{this.renderLastUpdateDate()}</dd>
                                            <dt>Created:</dt>
                                            <dd>{this.renderCreatedDate()}</dd>
                                            <dt>Possible Close:</dt>
                                            <dd>{this.renderLastUpdateDate()}</dd>
                                            <dt>Deal Status:</dt>
                                            <dd>{this.renderDealStatus()}</dd>
                                        </dl>
                                    </div>
                                    <div className="row">
                                        <button onClick={this.openEditDealModal}
                                                className="btn btn-white btn-xs pull-right">Edit Deal
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="ibox">
                                <div className="ibox-content">
                                    <Note initialValues={{
                                        dealId: this.props.viewedDeal.id
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="ibox">
                                <Timeline
                                    initialValues={{
                                        deal: {
                                            id: this.props.viewedDeal.id
                                        }
                                    }}
                                    defaultFilter={`deal_id:${this.props.viewedDeal.id}`}
                                    options={[
                                        {
                                            label: 'Activities',
                                            fields: ['ACTIVITY_CREATED']
                                        },
                                        {
                                            label: 'Notes',
                                            fields: ['NOTE_CREATED']
                                        }
                                    ]}
                                />
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
                            this.state.isLostReasonModalVisible &&
                            <LostReason showModal={this.state.isLostReasonModalVisible}
                                        close={this.closeLostReasonModal}
                                        initialValues={this.props.viewedDeal}
                            />
                        }


                    </div>
                </div>
            )
        }
    }

    renderDealStatus() {

        return (
            <p>
                <button onClick={() => this.openEditDealModal()} type="button" className="btn btn-primary btn-xs">WON
                </button>
                <button onClick={() => this.openLostReasonModal()} type="button"
                        className="deal-danger-btn btn btn-danger btn-xs">LOST
                </button>
            </p>
        );

    }

    renderAssignee() {
        const deal = this.props.viewedDeal;

        if (deal.owner) {
            return (<Link className="text-navy"
                          to={"/user/" + deal.owner.id}>{deal.owner.firstName} {deal.owner.lastName}</Link>);
        } else {
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
        viewedDeal: detailedDealSelector(state, props.match.params.dealId)
    };
}

export default connect(mapStateToProps, {
    getDealById,
    getById,
})(DealDetail);
