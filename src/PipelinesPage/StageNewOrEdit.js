import React from 'react';
import Modal from '../modal-shim';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import {GithubPicker} from "react-color";
import {createStage, updateStage} from "../_actions/stage.actions";

const validate = values => {
    const errors = {}
    /*
    if (!values.name) {
        errors.name = 'Required'
    } else if (!values.type) {
        errors.type = 'Required'
    } else if (values.name.length > 15) {
        errors.name = 'Must be 15 characters or less'
    }
    */
    return errors
}

const warn = values => {
    const warnings = {}
    if (values.title && values.title.length < 2) {
        warnings.title = 'Hmm, you seem a bit young...'
    }
    return warnings
}

const renderField = ({
                         input,
                         label,
                         type,
                         meta: { touched, error, warning }
                     }) => (
    <div className="form-group">
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type}  className="form-control"/>
            <span className="help-block m-b-none">{touched &&
            ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
                </span>

        </div>
    </div>
);


const renderColorPickerList = (props) => (
        <div className="form-group">
            <label>{props.label} <span style={{display: 'inline-block', backgroundColor:props.input.value , width: '72px', height: '10px'}}></span></label>
            <div>
                <GithubPicker width="100%"
                              color={props.input.value}
                              onChange={ (color,event)=> props.input.onChange(color.hex)}/>
                <span className="help-block m-b-none">{props.meta.touched &&
                ((props.meta.error && <span>{props.meta.error}</span>) ||
                    (props.meta.warning && <span>{props.meta.warning}</span>))}
                </span>
            </div>


        </div>
    );

class StageNewOrEdit extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit = (values) => {
        // print the form values to the console
        console.log(values);
        if( values.id ){
            return this.props.updateStage(values,this.props.close);
        } else {
            return this.props.createStage(values,this.props.close);
        }

    }


    render () {
        const { handleSubmit, pristine, reset, submitting, stage } = this.props;
        let title = "Create New Stage";
        if( stage !== null ){
            title = "Edit Stage";
        }
        return (
            <Modal bsSize="small" show={this.props.showModal} onHide={this.props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={ handleSubmit(this.onSubmit) }>
                        <Field
                            name="name"
                            type="text"
                            component={renderField}
                            label="Name"
                        />

                        <Field
                            name="color"
                            component={renderColorPickerList}
                            label="Color"
                        />

                        <button className="btn btn-sm btn-primary pull-right"
                                type="submit" disabled={submitting}><strong>Submit</strong></button>


                    </form>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default reduxForm({
    form: 'stageNewOrEdit', // a unique identifier for this form
    validate, // <--- validation function given to redux-form
    warn, // <--- warning function given to redux-form
    enableReinitialize : true // this is needed!!
})(
   connect(null, {createStage,updateStage})( StageNewOrEdit)
);