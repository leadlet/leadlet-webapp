import React from 'react';
import Modal from '../../modal-shim';
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux';
import FormGroup from "react-bootstrap/es/FormGroup";
import InputGroup from "react-bootstrap/es/InputGroup";
import FormControl from "react-bootstrap/es/FormControl";
import Phone from 'react-phone-number-input';
import {createOrganization, updateOrganization, getByIdOrganization} from "../../actions/organization.actions";

const validate = values => {
    const errors = {}
    let org_email_valid = true;

    const re_org = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (values.email !== undefined) {
        org_email_valid = re_org.test(values.email);
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
    if (!org_email_valid) {
        errors.email = "mail is not valid"
    } else {
        errors.email = ""
    }
    return errors
}

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
)

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
                    <InputGroup.Addon><i class="fa fa-phone" aria-hidden="true"/></InputGroup.Addon>

                    <Phone
                        placeholder="enter phone number"
                        value={input.value}
                        onChange={input.onChange}/>
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
)

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

class ContactNew extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit = (values) => {
        // print the form values to the console
        this.props.close();

        if (this.props.initialValues && this.props.initialValues.id) {
            return this.props.updateOrganization(values, () => this.props.getByIdOrganization(this.props.initialValues.id) && this.props.close);
        } else {
            return this.props.createOrganization(values, this.props.close);
        }
    }

    render() {
        const {handleSubmit, pristine, submitting, initialValues, valid} = this.props;

        let title = "Create";
        if (initialValues && initialValues.id) {
            title = "Update";
        }

        return (
            <Modal show={this.props.showEditModal} onHide={this.props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>{title} New Organization</Modal.Title>
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
                            name="location"
                            type="text"
                            component={renderLocationField}
                            label="Address"
                        />
                        <button className="btn btn-sm btn-primary pull-right"
                                type="submit" disabled={pristine || submitting || !valid}><strong>Submit</strong>
                        </button>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default reduxForm({
    form: 'simple', // a unique identifier for this form
    validate // <--- validation function given to redux-form
})(
    connect(null, {updateOrganization, createOrganization, getByIdOrganization})(ContactNew)
);