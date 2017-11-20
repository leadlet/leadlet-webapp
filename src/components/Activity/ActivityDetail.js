import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import Modal from '../../modal-shim';
import {connect} from 'react-redux';
import {createActivity} from '../../actions/activity.actions';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const validate = values => {
    const errors = {}
    if (!values.name) {
        errors.name = 'Required'
    } else if (!values.description) {
        errors.description = 'Required'
    } else if (values.name.length > 15) {
        errors.name = 'Must be 15 characters or less'
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
                             handleChange,
                             startDate,
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
                selected={startDate}
                onChange={handleChange}
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

        this.state = {
            startDate: moment()
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        console.log("Handle Date: ", date);
        this.setState({
            startDate: date
        });
    }

    onSubmit = (activity) => {
        // print the form values to the console
        console.log("ACTIVITY: ", activity);
        return this.props.createActivity(activity);

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
                            name="name"
                            type="text"
                            component={renderField}
                            label="Name"
                        />
                        <Field
                            name="description"
                            type="text"
                            component={renderField}
                            label="Description"
                        />
                        <Field
                            name="date"
                            startDate={this.state.startDate}
                            handleChange={this.handleChange}
                            component={renderDateField}
                            label="Date"
                        />
                        <button className="btn btn-sm btn-primary pull-right"
                                type="submit"><strong>Submit</strong></button>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>

        );
    }
}

export default reduxForm({
    form: 'postNewActivityForm',
    validate // <--- validation function given to redux-form
})(
    connect(null, {createActivity})(ActivityDetail)
);