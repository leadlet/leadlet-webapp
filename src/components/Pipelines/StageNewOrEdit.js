import React from 'react';
import Modal from '../../modal-shim';
import {Field, reduxForm, reset} from 'redux-form'
import {connect} from 'react-redux';
import {createStage, updateStage} from "../../actions/stage.actions";
import {required} from "../../formValidations/form.validations";
import {maxLength32} from "../../formValidations/form.validations";

const renderField = ({
                         input,
                         label,
                         type,
                         meta: {error}
                     }) => (
    <div className="form-group">
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} className="form-control"/>
            <span style={{color: "red"}} className="help-block m-b-none">{(error && <span>{error}</span>)}
                </span>

        </div>
    </div>
);


class StageNewOrEdit extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    onSubmit = (values) => {
        // print the form values to the console
        const stageDto = {
            id: values.id,
            name: values.name,
            pipelineId: this.props.pipelineId
        }
        if (stageDto.id) {
            return this.props.updateStage(stageDto, () => this.onClose());
        } else {
            return this.props.createStage(stageDto, () => this.onClose());
        }

    }

    onClose() {
        this.props.close();
        this.props.reset();
        //this.props.dispatch(reset('stageNewOrEdit'));
    }


    render() {
        const {handleSubmit, submitting, pristine, valid, initialValues} = this.props;
        let title = "Create";
        if (initialValues) {
            title = "Update";
        }
        return (
            <Modal bsSize="small" show={this.props.showModal} onHide={this.props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>{title} Stage</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <Field
                            name="name"
                            type="text"
                            component={renderField}
                            label="Name"
                            validate={[required, maxLength32]}
                        />

                        <button className="btn btn-sm btn-primary pull-right"
                                type="submit" disabled={pristine || submitting || !valid}><strong>Submit</strong>
                        </button>


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
    enableReinitialize: true // this is needed!!
})(
    connect(null, {createStage, updateStage})(StageNewOrEdit)
);