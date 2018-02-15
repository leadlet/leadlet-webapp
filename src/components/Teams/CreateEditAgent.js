import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import Modal from '../../modal-shim';
import {connect} from 'react-redux';
import SweetAlert from 'sweetalert-react';
import {updateUser} from "../../actions/user.actions";

import 'react-select/dist/react-select.css';
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
    return errors
};

const renderAgentInputField = (props) => (
    <div className="form-group">
        <label>{props.label}</label>
        <input {...props.input} placeholder={props.label} type={props.type} className="form-control"/>
        <span className="help-block m-b-none">
                {props.meta.touched && ((props.meta.error && <span>{props.meta.error}</span>))}
            </span>
    </div>
);

class CreateEditAgent extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.confirmDeleteAgent = this.confirmDeleteAgent.bind(this);
        this.cancelDeleteAgent = this.cancelDeleteAgent.bind(this);
        this.onDeleteAgent = this.onDeleteAgent.bind(this);
        this.onClose = this.onClose.bind(this);

        this.state = {
            showDeleteDialog: false
        };
    }

    componentDidMount() {

    }

    confirmDeleteAgent() {
        this.setState({showDeleteDialog: false});
        this.props.close();
    }

    cancelDeleteAgent() {
        this.setState({showDeleteDialog: false});
    }

    onDeleteAgent(event) {
        event.preventDefault();
        this.setState({showDeleteDialog: true});
    }

    onSubmit = (formValues) => {

        let agent = {
            id: formValues.id,
            firstName: formValues.firstName,
            lastName: formValues.lastName
        }

        if (agent.id) {
            this.props.updateUser(agent);
        } else {
            //create user (first create 'createUser' action)
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
                            component={renderAgentInputField}
                            label="First Name"
                        />
                        <Field
                            name="lastName"
                            type="text"
                            component={renderAgentInputField}
                            label="Last Name"
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

CreateEditAgent.defaultProps = {
    showUserSelection: true
}


const selector = formValueSelector('postNewAgentForm');

function mapStateToProps(state) {
    return {
        firstName: selector(state, 'firstName'),
        lastName: selector(state, 'lastName')
    };
}

export default reduxForm({
    form: 'postNewAgentForm',
    validate, // <--- validation function given to redux-form
    enableReinitialize: true
})(
    connect(mapStateToProps, {updateUser})(CreateEditAgent)
);