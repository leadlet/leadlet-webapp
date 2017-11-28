import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import Modal from '../../modal-shim';
import {connect} from 'react-redux';
import {create, update, _delete} from '../../actions/activity.actions';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {ButtonToolbar} from "react-bootstrap";
import SweetAlert from 'sweetalert-react';
import {Editor, EditorState} from 'draft-js';
import Dropdown, {
    DropdownTrigger,
    DropdownContent
} from '../../../node_modules/react-simple-dropdown/lib/components/Dropdown';
import ToggleButtonGroup from "react-bootstrap/es/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/es/ToggleButton";
import DropdownButton from "react-bootstrap/es/DropdownButton";
import MenuItem from "react-bootstrap/es/MenuItem";

const validate = values => {
    const errors = {}
    if (!values.title) {
        errors.title = 'Required'
    } else if (!values.memo) {
        errors.memo = 'Required'
    } else if (values.title.length > 15) {
        errors.title = 'Must be 15 characters or less'
    } else if (values.memo.length < 15 || values.memo.length > 300) {
        errors.memo = 'Must be between 15 and 300 characters'
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
    <div className="form-group">
        <label>{label}</label>
        <div>
            <Editor editorState={editorState} onChange={input.onChange}/>
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
                             customClass,
                             meta: {touched, error}
                         }) => (
    <div className={"form-group " + customClass}>
        <label>{label}</label>
        <DatePicker
            className="form-control"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            placeholderText="Click to select a date"
            dateFormat="DD/MM/YYYY HH:mm"
            selected={input.value ? moment(input.value, 'DD/MM/YYYY') : moment()}
            onChange={input.onChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            shouldCloseOnSelect={false}
        />
    </div>
)

const renderTypeField = ({
                             input,
                             label,
                             meta: {touched, error}
                         }) => (
    <div className="form-group">
        <ButtonToolbar>
            <ToggleButtonGroup {...input} type="radio">
                <ToggleButton value="CALL">CALL <i className="fa fa-phone"></i></ToggleButton>
                <ToggleButton value="MEETING">MEETING <i className="fa fa-users"></i></ToggleButton>
                <ToggleButton value="TASK">TASK <i className="fa fa-clock-o"></i></ToggleButton>
                <ToggleButton value="DEADLINE">DEADLINE <i className="fa fa-flag"></i></ToggleButton>
                <ToggleButton value="EMAIL">EMAIL <i className="fa fa-paper-plane"></i></ToggleButton>
            </ToggleButtonGroup>
        </ButtonToolbar>

        <span className="help-block m-b-none">{touched &&
        ((error && <span>{error}</span>))}
        </span>
    </div>
)

const renderAssignField = ({
                               input,
                               label,
                               type,
                               meta: {touched, error}
                           }) => (

    <div className="form-group">
        <label>{label}</label>
        <div>
            <select
                className="form-control m-b"
                value={input.value}
                onChange={input.onChange}>
                <option value="ME">Me</option>
                <option value="YAVUZ">Yavuz</option>
            </select>

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
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleLinkClick = this.handleLinkClick.bind(this);

        this.state = {
            startDate: moment(),
            showDeleteDialog: false,
            selectValue: null,
            editorState: EditorState.createEmpty()
        };
    }

    handleLinkClick() {
        this.refs.dropdown.hide();
    }

    confirmDeleteActivity() {
        this.props._delete(this.props.initialValues.title);
        this.setState({showDeleteDialog: false});
        this.props.close();
    }

    cancelDeleteActivity() {
        this.setState({showDeleteDialog: false});
    }

    onDeleteActivity(activityTitle) {
        //this.setState({deletingStageId: id});
        this.setState({showDeleteDialog: true});
    }

    onSubmit = (activity) => {
        // print the form values to the console
        console.log("ACTIVITY: ", activity);
        activity.start = activity.start._d;
        activity.end = activity.end._d;

        if (this.props.activity) {
            this.props.update(activity);
        } else {
            this.props.create(activity);
        }
        this.props.close();
    }

    handleTypeChange = (type) => {
        this.setState({selectValue: type.target.value});
    }

    onChange = (editorState) => {
        this.setState({editorState});
    }

    render() {
        const {handleSubmit, initialValues} = this.props;
        let title = "Create";

        if (initialValues && initialValues.title) {
            title = "Update";
        }
        return (
            <Modal show={this.props.showModal} onHide={this.props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>{title} New Activity</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <Field
                            name="type"
                            component={renderTypeField}
                            label="Activity Type"
                        />
                        <Field
                            name="title"
                            type="text"
                            component={renderField}
                            label="Title"
                        />
                        <div className="form-inline">
                            <Field
                                name="start"
                                selected={this.state.startDate}
                                component={renderDateField}
                                label="Start Date & Time"
                            />
                            <Field
                                name="end"
                                customClass="m-l-md"
                                selected={this.state.startDate}
                                component={renderDateField}
                                label="End Date & Time"
                            />

                        </div>
                        <Field
                            name="memo"
                            component={renderMemoField}
                            label="Description"
                            editorState={this.state.editorState}
                        />
                        <Field
                            name="assign"
                            component={renderAssignField}
                            label="Assigned To"
                        />

                        <button className="btn btn-sm btn-primary">...</button>
                        <ButtonToolbar className="pull-right">
                            <button className="btn btn-sm btn-danger" onClick={() => this.onDeleteActivity()}><strong>Delete</strong>
                            </button>
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
                            confirmButtonText="Yes, delete it!"
                            show={this.state.showDeleteDialog}
                            onConfirm={() => this.confirmDeleteActivity()}
                            onCancel={() => this.cancelDeleteActivity()}
                        />
                    </div>

                    <div>
                        <DropdownButton className="btn-primary" id="sample-menu" title="Settings">
                            <MenuItem href="/pipelines">Pipelines & Stages</MenuItem>
                            <MenuItem href="/register">Profile</MenuItem>
                            <MenuItem href="/body1">Billing</MenuItem>
                        </DropdownButton>


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
    connect(null, {create, update, _delete})(ActivityDetail)
);