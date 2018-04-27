import React, {Component} from 'react';
import {Field, formValueSelector, reduxForm} from 'redux-form';
import {connect} from "react-redux";
import {clearField, getAccount, updateAccount} from "../../actions/account.actions";
import Fields from "redux-form/es/Fields";

const adaptFileEventToValue = delegate =>
    e => delegate(e.target.files[0]);

const renderGsFileName = (props) => {

    if (props.storagePreference.gsKeyFileName && props.storagePreference.gsKeyFileName.input && props.storagePreference.gsKeyFileName.input.value) {
        return (<span> <b>{props.storagePreference.gsKeyFileName.input.value}</b><i className="btn fa fa-trash" onClick={
            () => props.clearField('appAccountForm', 'storagePreference.gsKeyFileName', null)
        }/></span> );

    }
}


const renderGsPreferenceField = (props) => (
    <div>
        <div className="form-group">
            <label className="col-sm-4 control-label">Bucket Name</label>
            <div className="col-sm-8">
                <input {...props.storagePreference.gsBucketName.input} placeholder="Google Storage Bucket" type="text" className="form-control"/>
            </div>
        </div>
        <div className="form-group">
            <label className="col-sm-4 control-label">Key File</label>
            <div className="col-sm-8">
                <input
                    onChange={adaptFileEventToValue(props.storagePreference.gsKeyFile.input.onChange)}
                    onBlur={adaptFileEventToValue(props.storagePreference.gsKeyFile.input.onBlur)}
                    type="file"
                    {...props.storagePreference.gsKeyFile.input.inputProps}
                    {...props.storagePreference.gsKeyFile}
                />
                { renderGsFileName(props) }
            </div>
        </div>
    </div>

);
const renderS3PreferenceField = (props) => (
    <div className="form-group">
        <label className="col-sm-4 control-label">Api Key</label>
        <div className="col-sm-8">
            <input placeholder="api-key"
                   {...props.storagePreference.s3ApiKey.input}
                   className="form-control" />
        </div>
    </div>
);

const renderSpecificStorageProvider = (props) => {
    if(props.storagePreference && props.storagePreference.type){
        if(props.storagePreference.type.input.value === 'GOOGLE_STORAGE'){
            return renderGsPreferenceField(props);
        }else if(props.storagePreference.type.input.value === 'AMAZON_S3'){
            return renderS3PreferenceField(props);

        }
    }
}


const renderStoragePreferenceField = (props) => (
    <div className="form-group">
        <label className="col-sm-2 control-label">Document Storage</label>
        <div className="col-sm-2">
            <label>
                <Field {...props.storagePreference.enabled.input} id="enabled" component="input" type="checkbox"/>
                {' '}
                Enable
            </label>
            {
                props.storagePreference && props.storagePreference.enabled && props.storagePreference.enabled.input
                && props.storagePreference.enabled.input.value && <div>

                    <label>
                        <Field {...props.storagePreference.type.input} component="input" type="radio" value="GOOGLE_STORAGE" />
                        {' '}
                        Google Storage
                    </label>
                    <label>
                        <Field {...props.storagePreference.type.input} component="input" type="radio" value="AMAZON_S3" disabled />
                        {' '}
                        Amazon S3
                    </label>
                </div>

            }



        </div>
        <div className="col-sm-6">
            { props.storagePreference && props.storagePreference.enabled && props.storagePreference.enabled.input
            && props.storagePreference.enabled.input.value && renderSpecificStorageProvider(props)}
        </div>
    </div>
);



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
)

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
                    <Fields
                        label="Document Storage"
                        names={[ 'storagePreference.type', 'storagePreference.s3ApiKey', 'storagePreference.gsKeyFile','storagePreference.gsKeyFileName','storagePreference.gsBucketName','storagePreference.enabled' ]}
                        component={renderStoragePreferenceField}
                        clearField={(a,b,c) => this.props.clearField(a,b,c)}
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

const selector = formValueSelector('appAccountForm');

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
AccountPreferences = reduxForm({
    form: 'appAccountForm'  // a unique identifier for this form
})(AccountPreferences)

// You have to connect() to any reducers that you wish to connect to yourself
AccountPreferences = connect(
    state => ({
        initialValues: state.account.current, // pull initial values from account reducer
        storagePreference: selector(state, 'storagePreference'),

    }),
    {
        getAccount,
        updateAccount,
        clearField
    }               // bind account loading action creator
)(AccountPreferences);

export default AccountPreferences
