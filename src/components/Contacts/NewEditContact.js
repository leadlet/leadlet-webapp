import React from 'react';
import Modal from '../../modal-shim';
import {Field, reduxForm, reset} from 'redux-form'
import {connect} from 'react-redux';
import FormGroup from "react-bootstrap/es/FormGroup";
import InputGroup from "react-bootstrap/es/InputGroup";
import FormControl from "react-bootstrap/es/FormControl";
import {createContact, updateContact, getById} from "../../actions/contact.actions";
import InputMask from 'react-input-mask';
import ButtonToolbar from "react-bootstrap/es/ButtonToolbar";
import ToggleButtonGroup from "react-bootstrap/es/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/es/ToggleButton";
import {required} from "../../formValidations/form.validations";
import {email} from "../../formValidations/form.validations";

const renderField = ({
                         input,
                         label,
                         type,
                         meta: {error}
                     }) => (
    <div className="form-group">
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} className="form-control"/>
            <span style={{color: "red"}} className="help-block m-b-none">
                    {error && <span>{error}</span>}
                </span>

        </div>
    </div>
);

const renderPhoneField = ({
                              input,
                              label,
                              type,
                              meta: {error}
                          }) => (
    <div className="form-group">
        <label>{label}</label>
        <div>
            <FormGroup>
                <InputGroup>
                    <InputGroup.Addon><i className="fa fa-phone" aria-hidden="true"/></InputGroup.Addon>
                    <InputMask {...input} type={type} className="form-control" mask="+99 999 999 99 99"/>
                </InputGroup>
            </FormGroup>
            <span style={{color: "red"}} className="help-block m-b-none">
                    {error && <span>{error}</span>}
                </span>

        </div>
    </div>
)

const renderEmailField = ({
                              input,
                              label,
                              type,
                              meta: {error}
                          }) => (
    <div className="form-group">
        <label>{label}</label>
        <div className="contact">
            <FormGroup>
                <InputGroup>
                    <InputGroup.Addon>@</InputGroup.Addon>
                    <FormControl {...input} placeholder={label} type={type} className="form-control"/>
                </InputGroup>
            </FormGroup>
            <span style={{color: "red"}} className="help-block m-b-none">
                    {error && <span>{error}</span>}
                </span>
        </div>
    </div>
);

const renderLocationField = ({
                                 input,
                                 label,
                                 type,
                                 meta: {error}
                             }) => (
    <div className="form-group">
        <label>{label}</label>
        <div>
            <FormControl {...input} componentClass="textarea" placeholder=""/>
            <span style={{color: "red"}} className="help-block m-b-none">
                    {error && <span>{error}</span>}
                </span>

        </div>
    </div>
)

const renderGenderField = ({
                               input,
                               label,
                               meta: {error}
                           }) => (
    <div className="form-group">
        <label>{label}</label>
        <ButtonToolbar>
            <ToggleButtonGroup {...input} type="radio" value={input.value}>
                <ToggleButton value="M">Male <i className="fa fa-male"/></ToggleButton>
                <ToggleButton value="F">Female <i className="fa fa-female"/></ToggleButton>
            </ToggleButtonGroup>
        </ButtonToolbar>

        <span style={{color: "red"}} className="help-block m-b-none">
                    {error && <span>{error}</span>}
                </span>
    </div>
)

class NewEditContact extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    onSubmit = (values) => {

        if (this.props.initialValues && this.props.initialValues.id) {
            return this.props.updateContact(values, () => {
                this.props.getById(this.props.initialValues.id);
                this.onClose();
            });
        } else {
            return this.props.createContact(values, () => this.onClose());
        }
    }

    onClose() {
        this.props.close();
        this.props.dispatch(reset('contactForm'));
    }

    render() {
        const {handleSubmit, initialValues, submitting, pristine, valid} = this.props;

        let title = "Create";
        if (initialValues && initialValues.id) {
            title = "Update";
        }

        return (
            <Modal show={this.props.showEditModal} onHide={this.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title} New Contact</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <Field
                            name="name"
                            type="text"
                            component={renderField}
                            label="Name"
                            validate={[required]}
                        />
                        <Field
                            name="gender"
                            type="text"
                            component={renderGenderField}
                            label="Gender"
                        />
                        <Field
                            name="phones[0].phone"
                            type="text"
                            component={renderPhoneField}
                            label="Mobile Phone"
                        />
                        <Field
                            name="phones[1].phone"
                            type="text"
                            component={renderPhoneField}
                            label="Work Phone"
                        />

                        <Field
                            name="email"
                            type="text"
                            component={renderEmailField}
                            label="Email"
                            validate={[email]}
                        />
                        <Field
                            name="address"
                            type="text"
                            component={renderLocationField}
                            label="Address"
                        />
                        <button className="btn btn-sm btn-primary pull-right"
                                type="submit" disabled={pristine || submitting || !valid}>
                            <strong>Submit</strong>
                        </button>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default reduxForm({
    form: 'contactForm' // a unique identifier for this form
})(
    connect(mapStateToProps, {updateContact, createContact, getById})(NewEditContact)
);