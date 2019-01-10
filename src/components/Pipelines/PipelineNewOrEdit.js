import React from 'react';
import Modal from '../../modal-shim';
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux';
import {createPipeline, updatePipeline} from "../../actions/pipeline.actions";
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


class PipelineNewOrEdit extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    onSubmit = (pipeline) => {

        if (pipeline.id) {
            return this.props.updatePipeline(pipeline, () => this.onClose());
        } else {
            return this.props.createPipeline(pipeline, () => this.onClose());
        }

    }

    onClose() {
        this.props.reset();
        this.props.close();
    }


    render() {
        const {handleSubmit, submitting, stage, pristine, valid} = this.props;
        let title = "Create";
        if (stage !== null) {
            title = "Update";
        }
        return (
            <Modal bsSize="small" show={this.props.showModal} onHide={this.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title} Pipeline</Modal.Title>
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
    form: 'pipelineNewOrEdit', // a unique identifier for this form
    enableReinitialize: true // this is needed!!
})(
    connect(null, {createPipeline, updatePipeline})(PipelineNewOrEdit)
);