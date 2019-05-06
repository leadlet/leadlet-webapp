import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {updateUser, getUser} from '../../actions/user.actions';
import {connect} from "react-redux";
import InputMask from 'react-input-mask';

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
);

const renderPhoneField = ({
                              input,
                              label,
                              type,
                              meta: {error}
                          }) => (
    <div className="form-group">
        <label className="col-sm-2 control-label">{label}</label>
        <div className="col-sm-4">
            <InputMask {...input} type={type} className="form-control" mask="+99 999 999 99 99"/>
            <span style={{color: "red"}} className="help-block m-b-none">
                    {error && <span>{error}</span>}
                </span>

        </div>
    </div>
);

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit = (formValue) => {

        let profile = {};
        profile.id = formValue.id;
        profile.login = formValue.login;
        profile.firstName = formValue.firstName;
        profile.lastName = formValue.lastName;
        profile.password = formValue.newPassword;
        profile.phone = formValue.phone;

        this.props.updateUser(profile);
    }

    componentDidMount(){
        this.props.getUser();
    }
    render() {
        const {handleSubmit} = this.props;

        return (
            <div className="m-t">
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
                        name="phone"
                        type="text"
                        component={renderPhoneField}
                        label="Phone"
                    />
                    <Field
                        name="newPassword"
                        type="password"
                        component={renderField}
                        label="New Password"
                    />
                    <Field
                        name="confirmPassword"
                        type="password"
                        component={renderField}
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
        )
    }
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
Profile = reduxForm({
    form: 'profileForm',  // a unique identifier for this form
    enableReinitialize: true
})(Profile)

// You have to connect() to any reducers that you wish to connect to yourself
Profile = connect(
    state => ({
        initialValues: state.authentication.user // pull initial values from account reducer
    }),
    {
        updateUser, getUser
    }               // bind account loading action creator
)(Profile);

export default Profile
