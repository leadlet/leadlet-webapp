import React, {Component} from 'react';
import {Field, Fields, reduxForm} from 'redux-form';
import Modal from '../../modal-shim';
import {connect} from 'react-redux';
import SweetAlert from 'sweetalert-react';
import 'react-select/dist/react-select.css';
import {createDeal, updateDeal} from "../../actions/deal.actions";
import renderInputField from '../../formUtils/renderInputField'
import renderPriceCurrencyField from '../../formUtils/renderPriceCurrencyField'
import renderAsyncSelectField from "../../formUtils/renderAsyncSelectField";
import renderDatePicker from "../../formUtils/renderDatePicker";
import {loadUser, loadProduct, loadSource, loadChannel, loadContact} from "../../formUtils/form.actions";
import renderPipelineAndStageFields from "../../formUtils/renderPipelineAndStageFields";
import * as _ from "lodash";
import {required} from "../../formValidations/form.validations";
import {maxLength64} from "../../formValidations/form.validations";

const validate = values => {
    const errors = {};

    /* activity type */
    if (!values.stage) {
        errors.stage = "Please select a stage";
    }

    return errors

};

class CreateEditDeal extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.confirmDeleteDeal = this.confirmDeleteDeal.bind(this);
        this.cancelDeleteDeal = this.cancelDeleteDeal.bind(this);
        this.onDeleteDeal = this.onDeleteDeal.bind(this);
        this.onClose = this.onClose.bind(this);

        this.state = {
            showDeleteDialog: false
        };
    }

    confirmDeleteDeal() {
        this.setState({showDeleteDialog: false});
        this.props.close();
    }

    cancelDeleteDeal() {
        this.setState({showDeleteDialog: false});
    }

    onDeleteDeal(event) {
        event.preventDefault();
        this.setState({showDeleteDialog: true});
    }

    onSubmit = (formValues) => {

        let deal = {
            id: formValues.id,
            title: formValues.title,
            contact_id: _.get(formValues.contact,'id'),
            stage_id: _.get(formValues.stage,'id'),
            pipeline_id: _.get(formValues.pipeline,'id'),
            agent_id: _.get(formValues.agent,'id'),
            lost_reason_id: _.get(formValues.lost_reason,'id'),
            deal_value: formValues.deal_value,
            deal_status: formValues.deal_status,
            possible_close_date: formValues.possible_close_date && formValues.possible_close_date._d,
            product_ids: (formValues.products && formValues.products.map(p=>p.id)) || [],
            activity_ids: (formValues.activities && formValues.activities.map(p=>p.id)) || [],
            deal_source_id: _.get(formValues.deal_source,'id'),
            deal_channel_id: _.get(formValues.deal_channel,'id'),
            created_date: formValues.created_date
        };

        if (deal.id) {
            this.props.updateDeal(deal);
        } else {
            this.props.createDeal(deal);
        }
        this.props.close();
    };

    onClose() {
        this.props.reset();
        this.props.close();
    }

    render() {
        const {handleSubmit, pristine, submitting, valid} = this.props;

        return (
            <Modal show={this.props.showModal} onHide={this.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Deal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <Field
                            name="title"
                            type="text"
                            component={renderInputField}
                            label="Title"
                            validate={[required, maxLength64]}
                            readOnly={true}
                        />
                        <Fields
                            label="Potential Value"
                            names={['deal_value.potentialValue', 'deal_value.currency']}
                            component={renderPriceCurrencyField}
                            readOnly={true}
                        />


                        <Fields
                            names={['pipeline', 'stage']}
                            component={renderPipelineAndStageFields}
                            showPipelineSelection={this.props.showPipelineSelection}
                            showStageSelection={this.props.showStageSelection}
                            parse={(value,) => {
                                if (value) {
                                    return {
                                        'id': value.value,
                                        'name': value.label
                                    };
                                }
                            }}
                            format={(value) => {
                                if (value) {
                                    return {
                                        'value': value.id,
                                        'label': value.name
                                    }
                                }

                            }}
                            readOnly={true}
                        />
                        {this.props.showContactSelection &&
                        <Field
                            name="contact"
                            label="Contact"
                            placeholder="Select deal contact"
                            component={renderAsyncSelectField}
                            loadOptions={loadContact}
                            parse={(value) => {
                                if (value) {
                                    return {
                                        'id': value.value,
                                        'name': value.label
                                    };
                                }
                            }}
                            format={(value) => {
                                if (value) {
                                    return {
                                        'value': value.id,
                                        'label': value.name
                                    }
                                }

                            }}
                            readOnly={true}
                        />
                        }

                        {this.props.showUserSelection &&
                        <Field
                            name="agent"
                            label="Agent"
                            placeholder="Select deal agent"
                            component={renderAsyncSelectField}
                            loadOptions={loadUser}
                            parse={(value) => {
                                if (value) {
                                    return {
                                        'id': value.value,
                                        'name': value.label
                                    };
                                }
                            }}
                            format={(value) => {
                                if (value) {
                                    return {
                                        'value': value.id,
                                        'label': value.name || value.firstName + " " + value.lastName
                                    }
                                }

                            }}
                            readOnly={true}
                        />
                        }

                        <Field
                            label="Possible Close Date"
                            name="possible_close_date"
                            placeholder="Select Possible Close Date"
                            component={renderDatePicker}
                            readOnly={true}
                        />

                        <Field
                            name="products"
                            label="Product"
                            placeholder="Select Product"
                            component={renderAsyncSelectField}
                            multi={true}
                            loadOptions={loadProduct}
                            parse={(values) => {
                                if (values) {
                                    return values.map(value =>
                                        ({
                                            id: value.value,
                                            name: value.label
                                        })
                                    );

                                }
                            }}
                            format={(values) => {
                                if (values) {
                                    return values.map(value =>
                                        ({
                                            value: value.id,
                                            label: value.name
                                        })
                                    );

                                }
                            }}
                            readOnly={true}
                        />
                        <Field
                            name="deal_source"
                            label="Source"
                            placeholder="Select deal source"
                            component={renderAsyncSelectField}
                            loadOptions={loadSource}
                            parse={(value) => {
                                if (value) {
                                    return {
                                        'id': value.value,
                                        'name': value.label
                                    };
                                }
                            }}
                            format={(value) => {
                                if (value) {
                                    return {
                                        'value': value.id,
                                        'label': value.name
                                    }
                                }

                            }}
                            readOnly={true}
                        />
                        <Field
                            name="deal_channel"
                            label="Channel"
                            placeholder="Select deal channel"
                            component={renderAsyncSelectField}
                            loadOptions={loadChannel}
                            parse={(value) => {
                                if (value) {
                                    return {
                                        'id': value.value,
                                        'name': value.label
                                    };
                                }
                            }}
                            format={(value) => {
                                if (value) {
                                    return {
                                        'value': value.id,
                                        'label': value.name
                                    }
                                }

                            }}
                            readOnly={true}
                        />
                    </form>
                    <div>
                        <SweetAlert
                            title="Are you sure?"
                            text="You will not be able to recover this imaginary file!"
                            type="warning"
                            showCancelButton={true}
                            confirmButtonColor="#DD6B55"
                            confirmButtonText="Yes, delete it!"
                            show={this.state.showDeleteDialog}
                            onConfirm={this.confirmDeleteDeal}
                            onCancel={this.cancelDeleteDeal}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>

                    <div className="row">
                        <div className="col-md-6 pull-right">
                            <div className="pull-right activity-detail-submit">
                                <button className="btn btn-sm btn-default" onClick={this.props.close}>Cancel</button>
                                <button className="btn btn-sm btn-primary" onClick={handleSubmit(this.onSubmit)} disabled={pristine || submitting || !valid}>
                                    <strong>Submit</strong></button>
                            </div>
                        </div>
                    </div>

                </Modal.Footer>
            </Modal>
        );
    }
}

CreateEditDeal.defaultProps = {
    showPipelineSelection: true,
    showStageSelection: true,
    showContactSelection: true,
    showUserSelection: true
};

export default reduxForm({
    form: 'postNewDealForm',
    validate, // <--- validation function given to redux-form
    enableReinitialize: true,
    touchOnChange: true,
    touchOnBlur: true
})(
    connect(null, {createDeal, updateDeal})(CreateEditDeal)
);