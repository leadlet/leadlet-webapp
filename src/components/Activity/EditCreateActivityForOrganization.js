import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import Modal from '../../modal-shim';
import {connect} from 'react-redux';
import {create, update, _delete} from '../../actions/activity.actions';
import {ButtonToolbar} from "react-bootstrap";
import SweetAlert from 'sweetalert-react';
import ToggleButtonGroup from "react-bootstrap/es/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/es/ToggleButton";
import DropdownButton from "react-bootstrap/es/DropdownButton";
import MenuItem from "react-bootstrap/es/MenuItem";
import Checkbox from "react-bootstrap/es/Checkbox";
import FormControl from "../../../node_modules/react-bootstrap/es/FormControl";
import Select from '../../../node_modules/react-select';
import 'react-select/dist/react-select.css';
import 'react-dates/lib/css/_datepicker.css';
import formValueSelector from "redux-form/es/formValueSelector";
import renderDateTimePicker from "./renderDateTimePicker";

const validate = values => {
    const errors = {}

    /*  title validation */
    if (!values.title) {
        errors.title = 'Please write a title'
    } else if (values.title.length >= 64) {
        errors.title = 'Must be 64 characters or less!'
    }

    /* activity type */
    if (!values.activityType) {
        errors.title = "Please select a type"
    }

    /* start date */
    if (!values.start) {
        errors.start = "Please select a start date"
    }

    /* end date */
    if (!values.end) {
        errors.end = "Please select an end date"
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

const renderMemoField = ({
                             label,
                             input,
                             editorState,
                             meta: {touched, error}
                         }) => (
    <div className="form-group m-t-sm">
        <label>{label}</label>
        <div>
            <FormControl {...input} componentclassName="textarea" placeholder=""/>
        </div>
    </div>
)

const renderTypeField = ({
                             input,
                             meta: {touched, error}
                         }) => (
    <div className="form-group">
        <ButtonToolbar>
            <ToggleButtonGroup {...input} type="radio" value={input.value}>
                <ToggleButton value="CALL">CALL <i className="fa fa-phone"/></ToggleButton>
                <ToggleButton value="MEETING">MEETING <i className="fa fa-users"/></ToggleButton>
                <ToggleButton value="TASK">TASK <i className="fa fa-clock-o"/></ToggleButton>
                <ToggleButton value="DEADLINE">DEADLINE <i className="fa fa-flag"/></ToggleButton>
                <ToggleButton value="EMAIL">EMAIL <i className="fa fa-paper-plane"/></ToggleButton>
            </ToggleButtonGroup>
        </ButtonToolbar>

        <span className="help-block m-b-none">{touched &&
        ((error && <span>{error}</span>))}
        </span>
    </div>
)

const renderSelectField = ({
                               input,
                               options,
                               label,
                               multi
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
        />
    </div>
)

class EditCreateActivityForOrganization extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.confirmDeleteActivity = this.confirmDeleteActivity.bind(this);
        this.cancelDeleteActivity = this.cancelDeleteActivity.bind(this);
        this.onDeleteActivity = this.onDeleteActivity.bind(this);
        this.onClose = this.onClose.bind(this);

        this.state = {
            showDeleteDialog: false
        };
    }


    confirmDeleteActivity() {
        this.props._delete(this.props.initialValues.id);
        this.setState({showDeleteDialog: false});
        this.props.close();
    }

    cancelDeleteActivity() {
        this.setState({showDeleteDialog: false});
    }

    onDeleteActivity(event) {
        event.preventDefault();
        this.setState({showDeleteDialog: true});
    }

    onSubmit = (formValue) => {

        let activity = {};
        activity.id = formValue.id;
        activity.start = formValue.start ? formValue.start._d : '';
        activity.end = formValue.end ? formValue.end._d : '';
        activity.memo = formValue.memo;
        activity.type = formValue.activityType;
        activity.title = formValue.title;
        activity.organizationId = this.props.organization.id;

        if (this.props.initialValues && this.props.initialValues.id) {
            this.props.update(activity);
        } else {
            this.props.create(activity, this.props.createCallback);
        }
        this.props.close();
    }

    onClose() {
        this.setState({
            startDate: null
        });
        this.props.reset();
        this.props.close();
    }


    render() {
        const {handleSubmit, initialValues, submitting, pristine, valid} = this.props;

        let title = "Create";
        if (initialValues && initialValues.title) {
            title = "Update";
        }

        return (
            <Modal show={this.props.showModal} onHide={this.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title} New Activity</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <Field
                            name="activityType"
                            component={renderTypeField}
                            label="Activity Type"
                        />
                        <Field
                            name="title"
                            type="text"
                            component={renderField}
                            label="Title"
                        />
                        <div className="form-horizontal">
                            <div className="form-group">
                                <Field
                                    label="Start Date"
                                    name="start"
                                    maximumDate={this.props.end}
                                    component={renderDateTimePicker}
                                />
                            </div>
                            <div className="form-group">
                                <Field
                                    label="End Date"
                                    name="end"
                                    minimumDate={this.props.start}
                                    component={renderDateTimePicker}
                                />
                            </div>
                        </div>
                        <Field
                            name="memo"
                            component={renderMemoField}
                            label="Description"
                        />
                        <Field
                            name="assign"
                            component={renderSelectField}
                            label="Assigned To"
                            multi={false}
                        />
                        <Field
                            name="deal"
                            component={renderSelectField}
                            label="Deal"
                            multi={false}
                        />
                        <div className="invisible form-group">
                            <Checkbox>Send invitations to attendees</Checkbox>
                        </div>
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
                            onConfirm={this.confirmDeleteActivity}
                            onCancel={this.cancelDeleteActivity}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>

                    <div className="row">
                        <div className="col-md-1">
                            <DropdownButton noCaret id="detail-operations" className="btn-primary" title="...">
                                <MenuItem href="#" onClick={this.onDeleteActivity}>Delete</MenuItem>
                            </DropdownButton>
                        </div>
                        <div className="col-md-6 pull-right">
                            <div className="pull-right activity-detail-submit">
                                <button className="btn btn-sm btn-default" onClick={this.props.close}>Cancel</button>
                                <button className="btn btn-sm btn-primary"
                                        disabled={pristine || submitting || !valid}
                                        onClick={handleSubmit(this.onSubmit)}>
                                    <strong>Submit</strong></button>
                            </div>
                            <Checkbox className="mark pull-left invisible">Mark as done</Checkbox>
                        </div>
                    </div>

                </Modal.Footer>
            </Modal>
        );
    }
}

const selector = formValueSelector('postNewActivityForOrganizationForm') // <-- same as form name

function mapStateToProps(state) {
    return {
        persons: state.persons,
        organizations: state.organizations,
        start : selector(state, 'start'),
        end : selector(state, 'end')
    };
}

export default reduxForm({
    form: 'postNewActivityForOrganizationForm',
    validate, // <--- validation function given to redux-form
    enableReinitialize: true
})(
    connect(mapStateToProps, {create, update, _delete})(EditCreateActivityForOrganization)
);