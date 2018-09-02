import React, {Component} from 'react';
import {Field, formValueSelector, reduxForm} from 'redux-form';
import {connect} from "react-redux";
import {clearField, getAccount, updateAccount} from "../../actions/account.actions";


const renderField = ({
                         input,
                         label,
                         type,
                         meta: {touched, error}
                     }) => (
    <div className="form-group">
        <label className="col-sm-2 control-label">{label}</label>
        <div className="col-sm-8">
            <input {...input} placeholder={label} type={type} className="form-control"/>
            <span className="help-block m-b-none">{touched &&
            ((error && <span>{error}</span>))}
                </span>
        </div>
    </div>
);

class AccountPreferences extends Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit = (formValue) => {
        console.log(formValue);

        let account = {};
        account.id = formValue.id;
        account.name = formValue.name;
        account.address = formValue.address;
        account.storagePreference = formValue.storagePreference;

        this.props.updateAccount(account);
    }

    componentDidMount(){
        this.props.getAccount();
    }
    render() {
        const {handleSubmit} = this.props;

        return (
            <div className="m-t">
                <form className="form-horizontal">

                    <Field
                        name="name"
                        type="text"
                        component={renderField}
                        label="Company Name"
                    />
                    <Field
                        name="address"
                        type="text"
                        component={renderField}
                        label="Address"
                    />
                    <div className="hr-line-dashed"/>
                    <div className="form-group">
                        <div className="col-sm-4 col-sm-offset-6">
                            <button className="btn btn-primary" type="submit" onClick={handleSubmit(this.onSubmit)}>Save Changes</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
AccountPreferences = reduxForm({
    form: 'appAccountForm',
    enableReinitialize: true
})(AccountPreferences);

// You have to connect() to any reducers that you wish to connect to yourself
AccountPreferences = connect(
    state => ({
        initialValues: state.account.current
    }),
    {
        getAccount,
        updateAccount,
        clearField
    }               // bind account loading action creator
)(AccountPreferences);

export default AccountPreferences
