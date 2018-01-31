import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import { updateUser } from '../../actions/index';
import {connect} from "react-redux";
import {authentication} from "../../reducers/authentication.reducer";


const renderField = ({
                         input,
                         label,
                         type,
                         meta: {touched, error}
                     }) => (
    <div className="form-group">
        <label className="col-sm-2 control-label">{label}</label>
        <div className="col-sm-4">
            <input {...input} placeholder={label} type={type} className="form-control"/>
            <span className="help-block m-b-none">{touched &&
            ((error && <span>{error}</span>))}
                </span>
        </div>
    </div>
)

const renderPassField = ({
                             input,
                             label,
                             type,
                             meta: {touched, error}
                         }) => (
    <div className="form-group">
        <label className="col-sm-2 control-label">{label}</label>
        <div className="col-sm-4">
            <input {...input} placeholder={label} type={type} className="form-control"/>
            <span className="help-block m-b-none">{touched &&
            ((error && <span>{error}</span>))}
                </span>
        </div>
    </div>
)

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit = (formValue) => {
        console.log(formValue);

        let profile = {};
        profile.id = formValue.id;
        profile.firstName = formValue.firstName;
        profile.lastName = formValue.lastName;
        profile.password = formValue.newPassword;

        this.props.updateUser(profile);
    }

    render() {
        const {handleSubmit} = this.props;

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="fh-breadcrumb">
                        <div className="fh-column">
                            <ul className="list-group">
                                <li className="list-group-item-heading m-l-md">
                                    <h2>Preferences</h2>
                                </li>
                            </ul>
                            <ul className="list-group elements-list">
                                <li className="list-group-item">
                                    <a data-toggle="tab" href="/profile">
                                        <strong>Profile</strong>

                                    </a>
                                </li>
                                <li className="list-group-item">
                                    <a data-toggle="tab" href="#">
                                        <strong>Manage Account</strong>

                                    </a>
                                </li>
                                <li className="list-group-item">
                                    <a data-toggle="tab" href="#">
                                        <strong>Manage Users</strong>

                                    </a>
                                </li>
                                <li className="list-group-item">
                                    <a data-toggle="tab" href="/pipelines">
                                        <strong>Pipelines</strong>

                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-md-10">
                        <div className="ibox">
                            <div className="ibox-content">
                                <form className="form-horizontal">
                                    <Field
                                        name="firstName"
                                        type="text"
                                        component={renderField}
                                        label="First Name"
                                    />
                                    <Field
                                        name="lastName"
                                        type="text"
                                        component={renderField}
                                        label="Last Name"
                                    />
                                    <Field
                                        name="newPassword"
                                        type="password"
                                        component={renderPassField}
                                        label="New Password"
                                    />
                                    <Field
                                        name="confirmPassword"
                                        type="password"
                                        component={renderPassField}
                                        label="Confirm Password"
                                    />
                                    <div className="hr-line-dashed"/>
                                    <div className="form-group">
                                        <div className="col-sm-4 col-sm-offset-4">
                                            <button className="btn btn-primary" type="submit" onClick={handleSubmit(this.onSubmit)}>Save Changes</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        initialValues: state.authentication
     };
}


export default reduxForm({
    form: 'profileForm'
})(
    connect(mapStateToProps, {
        updateUser
    })(Profile)
);

