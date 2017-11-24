import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import Modal from '../../modal-shim';
import {connect} from 'react-redux';
import {createActivity, updateActivity, deleteActivity} from '../../actions/activity.actions';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {ButtonToolbar} from "react-bootstrap";
import SweetAlert from 'sweetalert-react';

const validate = values => {
    const errors = {}
    if (!values.title) {
        errors.title = 'Required'
    } else if (!values.description) {
        errors.description = 'Required'
    } else if (values.title.length > 15) {
        errors.title = 'Must be 15 characters or less'
    } else if (values.description.length < 15 || values.description.length > 300) {
        errors.description = 'Must be between 15 and 300 characters'
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
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} className="form-control"/>
            <span className="help-block m-b-none">{touched &&
            ((error && <span>{error}</span>))}
                </span>

        </div>
    </div>
)

const renderDateField = ({
                             input,
                             selected,
                             label,
                             meta: {touched, error}
                         }) => (
    <div className="form-group">
        <label>{label}</label>
        <div>
            <DatePicker
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="Click to select a date"
                dateFormat="DD/MM/YYYY"
                selected={input.value ? moment(input.value, 'DD/MM/YYYY') : moment()}
                onChange={input.onChange}
            />
            <span className="help-block m-b-none">{touched &&
            ((error && <span>{error}</span>))}
                </span>
        </div>
    </div>
)

class ActivityDetail extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.confirmDeleteActivity = this.confirmDeleteActivity.bind(this);
        this.cancelDeleteActivity = this.cancelDeleteActivity.bind(this);
        this.onDeleteActivity = this.onDeleteActivity.bind(this);

        this.state = {
            startDate: moment(),
            showDeleteDialog: false
        };
    }

    confirmDeleteActivity(){
        this.props.deleteActivity(this.props.initialValues.title);
        this.setState({showDeleteDialog: false});
        this.props.close();
    }

    cancelDeleteActivity(){
        this.setState({showDeleteDialog: false});
    }

    onDeleteActivity(activityTitle){
        //this.setState({deletingStageId: id});
        this.setState({showDeleteDialog: true});
    }

    onSubmit = (activity) => {
        // print the form values to the console
        console.log("ACTIVITY: ", activity);
        activity.start = activity.start._d;

        if (this.props.activity) {
            this.props.updateActivity(activity);
        } else {
            this.props.createActivity(activity);
        }
        this.props.close();
    }

    render() {
        const {handleSubmit} = this.props;
        return (
            <Modal show={this.props.showModal} onHide={this.props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Activity</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <Field
                            name="title"
                            type="text"
                            component={renderField}
                            label="Title"
                        />
                        <Field
                            name="description"
                            type="text"
                            component={renderField}
                            label="Description"
                        />
                        <Field
                            name="start"
                            selected={this.state.startDate}
                            component={renderDateField}
                            label="Date"
                        />
                        <ButtonToolbar className="pull-right">
                            <button className="btn btn-sm btn-danger" onClick={() => this.onDeleteActivity()}><strong>Delete</strong></button>
                            <button className="btn btn-sm btn-primary" type="submit"><strong>Submit</strong></button>
                        </ButtonToolbar>

                    </form>

                    <div>
                        <SweetAlert
                            title="Are you sure?"
                            text="You will not be able to recover this imaginary file!"
                            type="warning"
                            showCancelButton={true}
                            confirmButtonColor="#DD6B55"
                            confirmButtonText= "Yes, delete it!"
                            show={this.state.showDeleteDialog}
                            onConfirm={() => this.confirmDeleteActivity()}
                            onCancel={() => this.cancelDeleteActivity()}
                        />
                    </div>

                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>

        );
    }
}

export default reduxForm({
    form: 'postNewActivityForm',
    validate, // <--- validation function given to redux-form
    enableReinitialize: true
})(
    connect(null, {createActivity, updateActivity, deleteActivity})(ActivityDetail)
);