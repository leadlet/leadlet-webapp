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

const validate = values => {
    const errors = {};
    let per_email_valid = true;

    const re_per = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (values.email !== undefined) {
        per_email_valid = re_per.test(values.email);
    }
    else {
        errors.email = ""
    }
    if (!values.name) {
        errors.name = 'Required'
    }
    else {
        errors.name = ""
    }
    if (values.name && (values.name.length > 30)) {
        errors.name = 'Must be 30 characters or less'
    } else {
        errors.name = ""
    }
    if (!per_email_valid) {
        errors.email = "mail is not valid"
    } else {
        errors.email = ""
    }
    return errors
};

const warn = values => {
    const warnings = {};
    if (values.login && values.login.length < 2) {
        warnings.login = 'too short!'
    }
    return warnings
};

const renderField = ({
                         input,
                         label,
                         type,
                         meta: {touched, error, warning}
                     }) => (
    <div className="form-group">
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} className="form-control"/>
            <span className="help-block m-b-none">{touched &&
            ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
                </span>

        </div>
    </div>
);

const renderPhoneField = ({
                              input,
                              label,
                              type,
                              meta: {touched, error, warning}
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
            <span className="help-block m-b-none">{touched &&
            ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
                </span>

        </div>
    </div>
)

const renderEmailField = ({
                              input,
                              label,
                              type,
                              meta: {touched, error, warning}
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
            <span className="help-block m-b-none">{touched &&
            ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
                </span>

        </div>
    </div>
);

const renderLocationField = ({
                                 input,
                                 label,
                                 type,
                                 meta: {touched, error, warning}
                             }) => (
    <div className="form-group">
        <label>{label}</label>
        <div>
            <FormControl {...input} componentClass="textarea" placeholder=""/>
            <span className="help-block m-b-none">{touched &&
            ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
                </span>

        </div>
    </div>
)

const renderGenderField = ({
                               input,
                               label,
                               meta: {touched, error}
                           }) => (
    <div className="form-group">
        <label>{label}</label>
        <ButtonToolbar>
            <ToggleButtonGroup {...input} type="radio" value={input.value}>
                <ToggleButton value="M">Male <i className="fa fa-male"/></ToggleButton>
                <ToggleButton value="F">Female <i className="fa fa-female"/></ToggleButton>
            </ToggleButtonGroup>
        </ButtonToolbar>

        <span className="help-block m-b-none">{touched &&
        ((error && <span>{error}</span>))}
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
        const {handleSubmit, pristine, submitting, initialValues, valid, warn} = this.props;

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
                        />
                        <Field
                            name="login"
                            type="text"
                            component={renderField}
                            label="Login"
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
                        />
                        <Field
                            name="address"
                            type="text"
                            component={renderLocationField}
                            label="Address"
                        />
                        <button className="btn btn-sm btn-primary pull-right"
                                type="submit" disabled={pristine || submitting || !valid || !warn}>
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
    form: 'contactForm', // a unique identifier for this form
    validate, // <--- validation function given to redux-form
    warn // <--- warning function given to redux-form
})(
    connect(mapStateToProps, {updateContact, createContact, getById})(NewEditContact)
);