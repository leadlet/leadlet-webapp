import React from 'react';
import Modal from '../../modal-shim';
import {Field, reduxForm} from 'redux-form'
import {createContact} from "../../actions/contact.actions";
import {connect} from 'react-redux';
import Select from '../../../node_modules/react-select';
import {contactConstants} from "../../constants/contact.constants";

const validate = values => {
    const errors = {}
    if (!values.name) {
        errors.name = 'Required'
    } else if (!values.type) {
        errors.type = 'Required'
    } else if (values.name.length > 15) {
        errors.name = 'Must be 15 characters or less'
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

class ContactNew extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit = (values) => {
        // print the form values to the console
        values.type = contactConstants.CONTACT_TYPE_ORGANIZATION;
        console.log(values);
        this.props.close();
        return this.props.createContact(values, this.props.close);

    }
    render() {
        const {handleSubmit, pristine, reset, submitting, contact} = this.props;

        let title = "Create";
        if (contact && contact.id) {
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
                            component={renderField}
                            label="Mobile Phone"
                        />
                        <Field
                            name="phones[1].phone"
                            type="text"
                            component={renderField}
                            label="Work Phone"
                        />
                        <Field
                            name="email"
                            type="text"
                            component={renderField}
                            label="Email"
                        />
                        <Field
                            name="location"
                            type="text"
                            component={renderField}
                            label="Address"
                        />
                        <button className="btn btn-sm btn-primary pull-right"
                                type="submit" disabled={submitting}><strong>Submit</strong></button>
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
    validate, // <--- validation function given to redux-form
    warn // <--- warning function given to redux-form
})(
    connect(null, {createContact})(ContactNew)
);