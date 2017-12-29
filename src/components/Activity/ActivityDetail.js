import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import Modal from '../../modal-shim';
import {connect} from 'react-redux';
import {create, update, _delete} from '../../actions/activity.actions';
import DatePicker from 'react-datepicker';
import moment from 'moment';
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
import {getAll} from "../../actions/contact.actions";
import {contactConstants} from "../../constants/contact.constants";

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

const renderMemoField = ({
                             label,
                             input,
                             editorState,
                             meta: {touched, error}
                         }) => (
    <div className="form-group m-t-sm">
        <label>{label}</label>
        <div>
            <FormControl {...input} componentClass="textarea" placeholder=""/>
        </div>
    </div>
)

const renderStartDateField = ({
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
            minDate={moment()}
            onChange={input.onChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            shouldCloseOnSelect={false}
        />
    </div>
)

const renderEndDateField = ({
                                input,
                                selected,
                                label,
                                minDate,
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
            minDate={minDate}
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
            <ToggleButtonGroup {...input} type="radio" value={input.value}>
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

const renderSelectField = ({
                               input,
                               options,
                               label,
                               multi,
                               contact
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
            selected={contact ? contact : null}
        />
    </div>
)

class ActivityDetail extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.confirmDeleteActivity = this.confirmDeleteActivity.bind(this);
        this.cancelDeleteActivity = this.cancelDeleteActivity.bind(this);
        this.onDeleteActivity = this.onDeleteActivity.bind(this);
        this.mapContact2Options = this.mapContact2Options.bind(this);
        this.onClose = this.onClose.bind(this);
        this.checkDate = this.checkDate.bind(this);

        this.state = {
            showDeleteDialog: false,
            contact: null
        };
    }

    componentDidMount() {
        this.props.getAll();
    }

    mapContact2Options(type) {

        if(!this.props.contacts.ids ){
            return [];
        }else{
           return this.props.contacts.ids.filter(id => {
               return this.props.contacts.items[id].type === type;
           })
                .map( id => {
                    return {label: this.props.contacts.items[id].name, value: this.props.contacts.items[id].id}
                });
        }
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
        activity.personId = formValue.contact;
        activity.organizationId = formValue.organization;

        if (this.props.initialValues && this.props.initialValues.id) {
            this.props.update(activity);
        } else {
            this.props.create(activity);
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

    checkDate() {
        if (this.props.initialValues) {
            if (this.props.initialValues.end < this.props.initialValues.start) {
                this.props.initialValues.end = this.props.initialValues.start;
            }
        }
    }

    render() {
        const {handleSubmit, initialValues, submitting, pristine, valid} = this.props;

        let title = "Create";
        if (initialValues && initialValues.title) {
            title = "Update";
        }

        return (
            <Modal show={this.props.showModal} onHide={this.onClose} onChange={this.checkDate()}>
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
                        <div className="form-inline">
                            <Field
                                name="start"
                                component={renderStartDateField}
                                label="Start Date & Time"
                                onChange={(newDate) => {
                                    this.setState({
                                        startDate: moment(newDate._d, 'DD/MM/YYYY')
                                    });
                                }}
                            />
                            <Field
                                name="end"
                                customClass="m-l-md"
                                component={renderEndDateField}
                                minDate={this.state.startDate || ((this.props.initialValues && this.props.initialValues.start) ? this.props.initialValues.start : moment())}
                                label="End Date & Time"
                            />
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
                        <Field
                            name="contact"
                            component={renderSelectField}
                            label="Contact"
                            multi={false}
                            options={this.mapContact2Options(contactConstants.CONTACT_TYPE_PERSON)}
                            contact={this.props.contact}
                        />
                        <Field
                            name="organization"
                            component={renderSelectField}
                            label="Organization"
                            multi={false}
                            options={this.mapContact2Options(contactConstants.CONTACT_TYPE_ORGANIZATION)}
                            contact={this.props.contact}
                        />
                        <div className="form-group">
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
                            <Checkbox className="mark pull-left">Mark as done</Checkbox>
                        </div>
                    </div>

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
    form: 'postNewActivityForm',
    validate, // <--- validation function given to redux-form
    enableReinitialize: true
})(
    connect(mapStateToProps, {create, update, _delete, getAll})(ActivityDetail)
);