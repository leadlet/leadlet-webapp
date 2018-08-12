import React, {Component} from 'react';
import {Field, Fields, reduxForm} from 'redux-form';
import Modal from '../../modal-shim';
import {connect} from 'react-redux';
import SweetAlert from 'sweetalert-react';

import 'react-select/dist/react-select.css';
import {createDeal,updateDeal} from "../../actions/deal.actions";

import renderInputField from '../../formUtils/renderInputField'
import renderPriceCurrencyField from '../../formUtils/renderPriceCurrencyField'
import formValueSelector from "redux-form/es/formValueSelector";
import renderAsyncSelectField  from "../../formUtils/renderAsyncSelectField";

import renderDatePicker from "../../formUtils/renderDatePicker";
import {loadOrganization, loadPerson, loadPipeline, loadStage, loadUser, loadProduct, loadSource, loadChannel} from "../../formUtils/form.actions";
import renderPipelineAndStageFields from "../../formUtils/renderPipelineAndStageFields";
import renderPersonAndOrganizationFields from "../../formUtils/renderPersonAndOrganizationFields";

/*let currencies = [
    {value: 'USD', label: 'USD'},
    {value: 'TL', label: 'TL'},
    {value: 'EURO', label: 'EURO'}
];*/

const validate = values => {
    const errors = {}

    /*  title validation */
    if (!values.title) {
        errors.title = 'Please write a title'
    } else if (values.title.length >= 64) {
        errors.title = 'Must be 64 characters or less!'
    }

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
            personId: formValues.person && formValues.person.id,
            organizationId: formValues.organization && formValues.organization.id,
            stageId: formValues.stage && formValues.stage.id,
            pipelineId: formValues.pipeline && formValues.pipeline.id,
            ownerId: formValues.owner && formValues.owner.id,
            dealValue: formValues.dealValue,
            possibleCloseDate: formValues.possibleCloseDate && formValues.possibleCloseDate._d,
            products: formValues.products
        }

        if( deal.id ){
            this.props.updateDeal(deal);
        }else {
            this.props.createDeal(deal);
        }
        this.props.close();
    }

    onClose() {
        this.props.reset();
        this.props.close();
    }

    render() {
        const {handleSubmit, pipelineId} = this.props;

        return (
            <Modal show={this.props.showModal} onHide={this.onClose} >
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
                        />
                        <Fields
                            label="Potential Value"
                            names={[ 'dealValue.potentialValue', 'dealValue.currency' ]}
                                component={renderPriceCurrencyField}/>


                        <Fields
                            names={[ 'pipeline', 'stage' ]}
                            component={renderPipelineAndStageFields}
                            showPipelineSelection={this.props.showPipelineSelection}
                            showStageSelection={this.props.showStageSelection}
                            parse={(value, name) => {
                                if( value ) {
                                    return {
                                        'id': value.value,
                                        'name': value.label
                                    };
                                }
                            }}
                            format={(value, name) => {
                                if( value ){
                                    return {
                                        'value': value.id,
                                        'label': value.name
                                    }
                                }

                            }}
                        />

                        { this.props.showUserSelection &&
                            <Field
                                name="owner"
                                label="Owner"
                                placeholder="Select deal owner"
                                component={renderAsyncSelectField}
                                loadOptions={loadUser}
                            />
                        }


                        <Fields
                            names={[ 'person', 'organization' ]}
                            component={renderPersonAndOrganizationFields}
                            showPersonSelection={this.props.showPersonSelection}
                            showOrganizationSelection={this.props.showOrganizationSelection}
                            parse={(value, name) => {
                                if( value ) {
                                    return {
                                        'id': value.value,
                                        'name': value.label
                                    };
                                }
                            }}
                            format={(value, name) => {
                                if( value ){
                                    return {
                                        'value': value.id,
                                        'label': value.name
                                    }
                                }

                            }}
                        />


                        <Field
                            label="Possible Close Date"
                            name="possibleCloseDate"
                            placeholder="Select Possible Close Date"
                            component={renderDatePicker}
                        />

                        <Field
                            name="products"
                            label="Product"
                            placeholder="Select Product"
                            component={renderAsyncSelectField}
                            multi={true}
                            loadOptions={loadProduct}
                            parse={(values) => {
                                if( values ) {
                                    return values.map( value =>
                                        ({
                                            id: value.value,
                                            name: value.label
                                        })
                                    );

                                }
                            }}
                            format={(values) => {
                                if( values ) {
                                    return values.map( value =>
                                        ({
                                            value: value.id,
                                            label: value.name
                                        })
                                    );

                                }
                            }}
                        />
                        <Field
                            name="source"
                            label="Source"
                            placeholder="Select deal source"
                            component={renderAsyncSelectField}
                            loadOptions={loadSource}
                        />
                        <Field
                            name="channel"
                            label="Channel"
                            placeholder="Select deal channel"
                            component={renderAsyncSelectField}
                            loadOptions={loadChannel}
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

CreateEditDeal.defaultProps = {
    showPipelineSelection: true,
    showStageSelection: true,
    showPersonSelection: true,
    showOrganizationSelection: true,
    showUserSelection: true
}


const selector = formValueSelector('postNewDealForm');

function mapStateToProps(state) {
    return {
    };
}

export default reduxForm({
    form: 'postNewDealForm',
    validate, // <--- validation function given to redux-form
    enableReinitialize: true
})(
    connect(mapStateToProps, {createDeal, updateDeal})(CreateEditDeal)
);