import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import Modal from '../../modal-shim';
import {connect} from 'react-redux';
import {createUser} from "../../actions/user.actions";
import formValueSelector from "redux-form/es/formValueSelector";
import renderInputField from "../../formUtils/renderInputField";

const validate = values => {
    const errors = {}

    let per_email_valid = true;

    const re_per = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (values.login !== undefined) {
        per_email_valid = re_per.test(values.login);
    }
    else {
        errors.login = ""
    }
    if (!values.firstName) {
        errors.firstName = 'Please write a name'
    }
    if (!values.lastName) {
        errors.lastName = 'Please write a name'
    }
    if (!values.login) {
        errors.login = 'Please write a email'
    }
    if (!per_email_valid) {
        errors.login = "mail is not valid"
    } else {
        errors.login = ""
    }
    return errors
};

class CreateEditAgent extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onClose = this.onClose.bind(this);

    }

    onSubmit = (formValues) => {

        let agent = {
            id: formValues.id,
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            password: formValues.password,
            login: formValues.login
        }

        if (!agent.id) {
            this.props.createUser(agent);
        }

        this.props.close();
    }

    onClose() {
        this.props.reset();
        this.props.close();
    }

    render() {
        const {handleSubmit, initialValues, pristine, submitting, valid} = this.props;

        let title = "";
        if (initialValues && initialValues.id) {
            title = "Update";
        } else {
            title = "Create";
        }

        return (
            <Modal show={this.props.showModal} onHide={this.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title} Agent</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <Field
                            name="firstName"
                            type="text"
                            component={renderInputField}
                            label="First Name"
                        />
                        <Field
                            name="lastName"
                            type="text"
                            component={renderInputField}
                            label="Last Name"
                        />
                        <Field
                            name="password"
                            type="password"
                            component={renderInputField}
                            label="New Password"
                        />
                        <Field
                            name="login"
                            type="email"
                            component={renderInputField}
                            label="Email"
                        />
                    </form>
                </Modal.Body>
                <Modal.Footer>

                    <div className="row">
                        <div className="col-md-6 pull-right">
                            <div className="pull-right activity-detail-submit">
                                <button className="btn btn-sm btn-default" onClick={this.onClose}>Cancel</button>
                                <button className="btn btn-sm btn-primary" onClick={handleSubmit(this.onSubmit)}
                                        disabled={pristine || submitting || !valid}>
                                    <strong>Submit</strong></button>
                            </div>
                        </div>
                    </div>

                </Modal.Footer>
            </Modal>
        );
    }
}

CreateEditAgent.defaultProps = {
    showUserSelection: true
}


const selector = formValueSelector('postNewAgentForm');

function mapStateToProps(state) {
    return {
        firstName2: selector(state, 'firstName'),
        lastName2: selector(state, 'lastName'),
        password2: selector(state, 'password'),
        login2: selector(state, 'login')
    };
}

export default reduxForm({
    form: 'postNewAgentForm',
    validate, // <--- validation function given to redux-form
    enableReinitialize: true
})(
    connect(mapStateToProps, {createUser})(CreateEditAgent)
);