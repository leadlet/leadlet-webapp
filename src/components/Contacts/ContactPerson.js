import React from 'react';
import Modal from '../../modal-shim';
import {Field, reduxForm} from 'redux-form'
import {updateContact, getAll, createContact} from "../../actions/contact.actions";
import {connect} from 'react-redux';
import {contactConstants} from "../../constants/contact.constants";
import Select from '../../../node_modules/react-select';
import FormGroup from "react-bootstrap/es/FormGroup";
import InputGroup from "react-bootstrap/es/InputGroup";
import FormControl from "react-bootstrap/es/FormControl";
import Phone from 'react-phone-number-input';

const validate = values => {
    const errors = {}

    const re_per = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const per_email_valid = re_per.test(values.email);

    if (!values.name) {
        errors.name = 'Required'
    }
    if (!values.type) {
        errors.type = 'Required'
    }
    if (values.name && (values.name.length > 15)) {
        errors.name = 'Must be 15 characters or less'
    }
    if (!per_email_valid) {
        errors.email = "mail is not valid"
    }
    return errors
}

const warn = values => {
    const warnings = {}
    if (values.title && values.title.length < 2) {
        warnings.title = 'Hmm, you seem a bit young...'
    }
    return warnings
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
                    <InputGroup.Addon><i class="fa fa-phone" aria-hidden="true"></i></InputGroup.Addon>
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

const renderSelectField = ({
                               input,
                               options,
                               onChange,
                               label,
                               multi,
                               selected
                           }) => (
    <div className="form-group">
        <label>{label}</label>
        <Select
            closeOnSelect={true}
            disabled={false}
            multi={multi}
            placeholder="Select..."
            options={options}
            removeSelected={true}
            rtl={false}
            onChange={input.onChange}
            value={input.value}
            simpleValue
            selected={input.value ? input.value : null}
        />
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
        this.mapContact2Options = this.mapContact2Options.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    componentDidMount() {
        this.props.getAll();
    }

    onSubmit = (values) => {
        // print the form values to the console
        values.type = contactConstants.CONTACT_TYPE_PERSON;
        console.log(values);
        this.props.close();

        if (this.props.initialValues && this.props.initialValues.id) {
            return this.props.updateContact(values, this.props.close);
        } else {
            return this.props.createContact(values, this.props.close);
        }
    }

    mapContact2Options(type) {

        if (!this.props.contacts.ids) {
            return [];
        } else {
            return this.props.contacts.ids.filter(id => {
                return this.props.contacts.items[id].type === type;
            })
                .map(id => {
                    return {label: this.props.contacts.items[id].name, value: this.props.contacts.items[id].id}
                });
        }
    }

    onClose() {
        this.props.close();
    }

    render() {
        const {handleSubmit, pristine, submitting, contact, valid} = this.props;

        let title = "Create";
        if (contact && contact.id) {
            title = "Update";
        }

        return (
            <Modal show={this.props.showEditModal} onHide={this.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title} New Person</Modal.Title>
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
                            name="title"
                            type="text"
                            component={renderField}
                            label="Title"
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
                            name="organizationId"
                            type="text"
                            component={renderSelectField}
                            label="Organization Name"
                            multi={false}
                            options={this.mapContact2Options(contactConstants.CONTACT_TYPE_ORGANIZATION)}
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

function mapStateToProps(state) {
    return {
        contacts: state.contacts
    };
}

export default reduxForm({
    form: 'simple', // a unique identifier for this form
    validate, // <--- validation function given to redux-form
    warn // <--- warning function given to redux-form
})(
    connect(mapStateToProps, {updateContact, getAll, createContact})(ContactNew)
);