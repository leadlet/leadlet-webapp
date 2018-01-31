import React, {Component} from 'react';
import {Field, Fields, reduxForm} from 'redux-form';
import Modal from '../../modal-shim';
import {connect} from 'react-redux';
import SweetAlert from 'sweetalert-react';
import DropdownButton from "react-bootstrap/es/DropdownButton";
import MenuItem from "react-bootstrap/es/MenuItem";
import Checkbox from "react-bootstrap/es/Checkbox";

import 'react-select/dist/react-select.css';
import {createDeal} from "../../actions/deal.actions";

import renderInputField from '../../formUtils/renderInputField'
import renderPriceCurrencyField from '../../formUtils/renderPriceCurrencyField'
import formValueSelector from "redux-form/es/formValueSelector";
import renderSelectField from "../../formUtils/renderSelectField";
import renderAsyncSelectField  from "../../formUtils/renderAsyncSelectField";

import {getAllPerson2} from "../../actions/person.actions"

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

        this.state = {
            showDeleteDialog: false
        };
    }

    loadPerson = (input, callback) => {

        setTimeout(() => {
            callback(null, {
                options: [
                    { value: 'one', label: 'PERSON1' },
                    { value: 'two', label: 'PERSON2' }
                ],
                // CAREFUL! Only set this to true when there are no more options,
                // or more specific queries will not be sent to the server.
            });
        }, 500);

    };


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
        // print the form values to the console
        let deal = {
            name: formValues.name,
            stageId: formValues.stageId
        }

        this.props.createDeal(deal);
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
                            options={[
                                {label:"yavuz", value:"12"},
                                {label:"2", value:"2"},
                                {label:"3", value:"3"},
                                {label:"4", value:"4"},
                            ]}
                        />

                        <Field
                            name="owner.id"
                            label="Owner"
                            placeholder="Select deal owner"
                            component={renderSelectField}
                            options={[
                                {label:"yavuz", value:"12"},
                                {label:"2", value:"2"},
                                {label:"3", value:"3"},
                                {label:"4", value:"4"},
                            ]}
                        />

                        <Field
                            name="person.id"
                            label="Contact Person"
                            placeholder="Select contact person"
                            component={renderSelectField}
                            options={[
                                {label:"yavuz", value:"12"},
                                {label:"2", value:"2"},
                                {label:"3", value:"3"},
                                {label:"4", value:"4"},
                            ]}
                        />

                        <Field
                            name="organization.id"
                            label="Contact Organization"
                            placeholder="Select contact organization"
                            component={renderSelectField}
                            options={[
                                {label:"yavuz", value:"12"},
                                {label:"2", value:"2"},
                                {label:"3", value:"3"},
                                {label:"4", value:"4"},
                            ]}
                        />

                        <Field
                            name="organization.id"
                            label="Contact Organization"
                            placeholder="Select contact organization"
                            component={renderAsyncSelectField}
                            loadOptions={this.loadPerson}
                        />

                        <div>
                            <p>title: {this.props && this.props.title}</p>
                            <p>potentialValue: {this.props.dealValue && this.props.dealValue.potentialValue}</p>
                            <p>currency: {this.props.dealValue && this.props.dealValue.currency}</p>
                            <p>owner: {this.props && this.props.ownerId}</p>
                            <p>person: {this.props && this.props.personId}</p>
                            <p>organization: {this.props && this.props.organizationId}</p>
                            <p>stage: {this.props && this.props.stageId}</p>

                        </div>
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
        stageId : selector(state, 'stage.id')

    };
}

export default reduxForm({
    form: 'postNewDealForm',
    validate, // <--- validation function given to redux-form
    enableReinitialize: true
})(
    connect(mapStateToProps, {createDeal, getAllPerson2})(CreateEditDeal)
);