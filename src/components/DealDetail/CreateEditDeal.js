import React, {Component} from 'react';
import {Field, Fields, reduxForm} from 'redux-form';
import Modal from '../../modal-shim';
import {connect} from 'react-redux';
import SweetAlert from 'sweetalert-react';
import DropdownButton from "react-bootstrap/es/DropdownButton";
import MenuItem from "react-bootstrap/es/MenuItem";
import Checkbox from "react-bootstrap/es/Checkbox";

import 'react-select/dist/react-select.css';
import {createDeal,updateDeal} from "../../actions/deal.actions";
import {getAllStagesByPipelineId} from "../../actions/stage.actions";

import renderInputField from '../../formUtils/renderInputField'
import renderPriceCurrencyField from '../../formUtils/renderPriceCurrencyField'
import formValueSelector from "redux-form/es/formValueSelector";
import renderSelectField from "../../formUtils/renderSelectField";
import renderAsyncSelectField  from "../../formUtils/renderAsyncSelectField";

import {getAllPersonByFilterAndReturn} from "../../actions/person.actions"
import {getAllOrganizationByFilterAndReturn} from "../../actions/organization.actions";
import {getAllUserByFilterAndReturn} from "../../actions/user.actions";

let currencies = [
    {value: 'USD', label: 'USD'},
    {value: 'TL', label: 'TL'},
    {value: 'EURO', label: 'EURO'}
];

const validate = values => {
    return {};
};




class CreateEditDeal extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.confirmDeleteDeal = this.confirmDeleteDeal.bind(this);
        this.cancelDeleteDeal = this.cancelDeleteDeal.bind(this);
        this.onDeleteDeal = this.onDeleteDeal.bind(this);
        this.onClose = this.onClose.bind(this);
        this.loadPerson = this.loadPerson.bind(this);
        this.loadUser = this.loadUser.bind(this);

        this.state = {
            showDeleteDialog: false
        };
    }

    loadUser(input, callback) {

        let successCallBack = (data) => {
            callback(null, {options: data.map(user => ({value: user.id, label: `${user.firstName} ${user.lastName}`}))});
        };
        let failCallBack = (error) => {
            callback(error, null);
        };

        getAllUserByFilterAndReturn(`name:${input}`, successCallBack, failCallBack);

    };

    loadPerson(input, callback) {

        let successCallBack = (data) => {
            callback(null, {options: data.map(person => ({value: person.id, label: person.name}))});
        };
        let failCallBack = (error) => {
            callback(error, null);
        };

        getAllPersonByFilterAndReturn(`name:${input}`, successCallBack, failCallBack);

    };

    loadOrganization(input, callback) {

        let successCallBack = (data) => {
            callback(null, {options: data.map(org => ({value: org.id, label: org.name}))});
        };
        let failCallBack = (error) => {
            callback(error, null);
        };

        getAllOrganizationByFilterAndReturn(`name:${input}`, successCallBack, failCallBack);

    };

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
            personId: formValues.person.id,
            organizationId: formValues.organization.id,
            stageId: formValues.stage.id,
            ownerId: formValues.owner.id,
//            possibleCloseDate: formValues.possibleCloseDate,
            dealValue: formValues.dealValue
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

                        <Field
                            name="owner.id"
                            label="Owner"
                            placeholder="Select deal owner"
                            component={renderAsyncSelectField}
                            loadOptions={this.loadUser}
                        />

                        <Field
                            name="person.id"
                            label="Contact Person"
                            placeholder="Select contact person"
                            component={renderAsyncSelectField}
                            loadOptions={this.loadPerson}
                        />

                        <Field
                            name="organization.id"
                            label="Contact Organization"
                            placeholder="Select contact organization"
                            component={renderAsyncSelectField}
                            loadOptions={this.loadOrganization}
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
                        <div className="col-md-1">
                            <DropdownButton noCaret id="detail-operations" className="btn-primary" title="...">
                                <MenuItem href="#" onClick={this.onDeleteDeal}>Delete</MenuItem>
                            </DropdownButton>
                        </div>
                        <div className="col-md-6 pull-right">
                            <div className="pull-right activity-detail-submit">
                                <button className="btn btn-sm btn-default" onClick={this.props.close}>Cancel</button>
                                <button className="btn btn-sm btn-primary" onClick={handleSubmit(this.onSubmit)}>
                                    <strong>Submit</strong></button>
                            </div>
                            <Checkbox className="mark pull-left">Mark as done</Checkbox>
                        </div>
                    </div>

                </Modal.Footer>
            </Modal>
        );
    }
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