import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import Modal from '../../modal-shim';
import {connect} from 'react-redux';
import {createUser} from "../../actions/user.actions";
import formValueSelector from "redux-form/es/formValueSelector";

const validate = values => {
    const errors = {}

    /*  name validation */
    if (!values.firstName) {
        errors.title = 'Please write a name'
    }
    if (!values.lastName) {
        errors.title = 'Please write a name'
    }
    if (!values.password) {
        errors.title = 'Please write a password'
    }
    if (!values.login) {
        errors.title = 'Please write a email'
    }
    return errors
};

const renderAgentField = ({
                              input,
                              label,
                              type,
                              meta: {touched, error}
                          }) => (
    <div className="form-group">
        <label>{label}</label>
        <input {...input} placeholder={label} type={type} className="form-control"/>
        <span className="help-block m-b-none">{touched &&
        ((error && <span>{error}</span>))}
                </span>

    </div>
)


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
        const {handleSubmit} = this.props;

        return (
            <Modal show={this.props.showModal} onHide={this.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Agent</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <Field
                            name="firstName"
                            type="text"
                            component={renderAgentField}
                            label="First Name"
                        />
                        <Field
                            name="lastName"
                            type="text"
                            component={renderAgentField}
                            label="Last Name"
                        />
                        <Field
                            name="password"
                            type="password"
                            component={renderAgentField}
                            label="New Password"
                        />
                        <Field
                            name="login"
                            type="email"
                            component={renderAgentField}
                            label="Email"
                        />
                    </form>
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