import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import Modal from '../../modal-shim';
import {connect} from 'react-redux';
import SweetAlert from 'sweetalert-react';
import DropdownButton from "react-bootstrap/es/DropdownButton";
import MenuItem from "react-bootstrap/es/MenuItem";
import Checkbox from "react-bootstrap/es/Checkbox";
import 'react-select/dist/react-select.css';
import {createDeal} from "../../actions/deal.actions";

const validate = values => {
    const errors = {}
    if (!values.title) {
        errors.title = 'Required'
    } else if (values.title.length > 15) {
        errors.title = 'Must be 15 characters or less'
    }
    return errors
}

const renderField = ({
                         input,
                         label,
                         type,
                         meta: {touched, error}
                     }) => (
    <div className="form-group">
        <div>
            <input {...input} placeholder={label} type={type} className="form-control"/>
            <span className="help-block m-b-none">{touched &&
            ((error && <span>{error}</span>))}
                </span>
        </div>
    </div>
)


class NewDeal extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.confirmDeleteDeal = this.confirmDeleteDeal.bind(this);
        this.cancelDeleteDeal = this.cancelDeleteDeal.bind(this);
        this.onDeleteDeal = this.onDeleteDeal.bind(this);
        this.onClose = this.onClose.bind(this);

        this.state = {
            showDeleteDialog: false
        };
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
                            name="name"
                            type="text"
                            component={renderField}
                            label="Name"
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


export default reduxForm({
    form: 'postNewDealForm',
    validate, // <--- validation function given to redux-form
    enableReinitialize: true
})(
    connect(null, {createDeal})(NewDeal)
);