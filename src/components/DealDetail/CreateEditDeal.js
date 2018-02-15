import React, {Component} from 'react';
import {Field, Fields, reduxForm} from 'redux-form';
import Modal from '../../modal-shim';
import {connect} from 'react-redux';
import SweetAlert from 'sweetalert-react';

import 'react-select/dist/react-select.css';
import {createDeal,updateDeal} from "../../actions/deal.actions";
import {getAllStagesByPipelineId} from "../../actions/stage.actions";

import renderInputField from '../../formUtils/renderInputField'
import renderPriceCurrencyField from '../../formUtils/renderPriceCurrencyField'
import formValueSelector from "redux-form/es/formValueSelector";
import renderSelectField from "../../formUtils/renderSelectField";
import renderAsyncSelectField  from "../../formUtils/renderAsyncSelectField";

import renderDatePicker from "../../formUtils/renderDatePicker";
import {loadOrganization, loadPerson, loadUser} from "../../formUtils/form.actions";

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
    if (!values.stage || !values.stage.id) {
        errors.stage ={
            id: "Please select a stage"
        }
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

    componentDidMount(){
        this.props.getAllStagesByPipelineId(this.props.pipelineId);
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
            ownerId: formValues.owner && formValues.owner.id,
            dealValue: formValues.dealValue,
            possibleCloseDate: formValues.possibleCloseDate && formValues.possibleCloseDate._d
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
        const {handleSubmit} = this.props;

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
                        <Field
                            name="stage.id"
                            label="Stage"
                            placeholder="Select deal stage"
                            component={renderSelectField}
                            options={this.props.stages.ids && this.props.stages.ids.map(id => (
                                {
                                    value: id,
                                    label: this.props.stages.items[id].name
                                }
                            ))}
                        />

                        { this.props.showUserSelection &&
                            <Field
                                name="owner.id"
                                label="Owner"
                                placeholder="Select deal owner"
                                component={renderAsyncSelectField}
                                loadOptions={loadUser}
                            />
                        }

                        {this.props.showPersonSelection &&
                            <Field
                                name="person.id"
                                label="Contact Person"
                                placeholder="Select contact person"
                                component={renderAsyncSelectField}
                                loadOptions={loadPerson}
                            />
                        }

                        { this.props.showOrganizationSelection &&
                            <Field
                                name="organization.id"
                                label="Contact Organization"
                                placeholder="Select contact organization"
                                component={renderAsyncSelectField}
                                loadOptions={loadOrganization}
                            />
                        }
                        <Field
                            label="Possible Close Date"
                            name="possibleCloseDate"
                            placeholder="Select Possible Close Date"
                            component={renderDatePicker}
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
    showPersonSelection: true,
    showOrganizationSelection: true,
    showUserSelection: true
}


const selector = formValueSelector('postNewDealForm');

function mapStateToProps(state) {
    return {
        title : selector(state, 'title'),
        dealValue : selector(state, 'dealValue'),
        ownerId : selector(state, 'owner.id'),
        personId : selector(state, 'person.id'),
        organizationId : selector(state, 'organization.id'),
        stageId : selector(state, 'stage.id'),
        stages: state.stages

    };
}

export default reduxForm({
    form: 'postNewDealForm',
    validate, // <--- validation function given to redux-form
    enableReinitialize: true
})(
    connect(mapStateToProps, {createDeal, updateDeal,getAllStagesByPipelineId})(CreateEditDeal)
);