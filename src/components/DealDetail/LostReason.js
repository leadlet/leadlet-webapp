import React, {Component} from 'react';
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import Modal from "react-bootstrap/es/Modal";
import Field from "redux-form/es/Field";
import renderAsyncSelectField from "../../formUtils/renderAsyncSelectField";
import {loadLostReason} from "../../formUtils/form.actions";
import {updateDeal} from "../../actions/deal.actions";
import * as _ from "lodash";

class LostReason extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    onSubmit = (formValues) => {

        let deal = {
            id: formValues.id,
            title: formValues.title,
            contact_id: _.get(formValues.contact,'id'),
            stage_id: _.get(formValues.stage,'id'),
            pipeline_id: _.get(formValues.pipeline,'id'),
            agent_id: _.get(formValues.agent,'id'),
            deal_value: formValues.deal_value,
            possible_close_date: formValues.possibleCloseDate && formValues.possibleCloseDate._d,
            product_ids: (formValues.products && formValues.products.map(p=>p.id)) || [],
            activity_ids: (formValues.activities && formValues.activities.map(p=>p.id)) || [],
            deal_source_id: _.get(formValues.deal_source,'id'),
            deal_channel_id: _.get(formValues.deal_channel,'id'),
            created_date: formValues.created_date,
            lost_reason_id: _.get(formValues.lostReason,'id'),
        };

        this.props.updateDeal(deal);

        this.props.close();
    }

    onClose() {
        this.props.reset();
        this.props.close();
    }

    render() {
        const {handleSubmit} = this.props;

        return (
            <Modal show={this.props.showModal} onHide={this.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>What is your lost reason?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <Field
                            name="lostReason"
                            label=""
                            placeholder="select reason"
                            multi={false}
                            component={renderAsyncSelectField}
                            loadOptions={loadLostReason}
                            parse={(value) => {
                                if( value ) {
                                    return {
                                        'id': value.value,
                                        'name': value.label
                                    };
                                }
                            }}
                            format={(value) => {
                                if( value ){
                                    return {
                                        'value': value.id,
                                        'label': value.name
                                    }
                                }

                            }}
                        />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <div className="row">
                        <div className="col-md-6 pull-right">
                            <div className="pull-right activity-detail-submit">
                                <button className="btn btn-sm btn-default" onClick={this.onClose}>Cancel</button>
                                <button className="btn btn-sm btn-primary" onClick={handleSubmit(this.onSubmit)}>
                                    <strong>Submit</strong></button>
                            </div>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
       //?????
    }
}

export default reduxForm({
    form: 'postLostReasonForm',
    enableReinitialize: true
})(
    connect(mapStateToProps, {updateDeal})(LostReason)
);