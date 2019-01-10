import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from "react-redux";
import Modal from "react-bootstrap/es/Modal";
import {createSource, updateSource} from "../../actions/source.actions";

const renderField = ({
                         input,
                         label,
                         type,
                         meta: {touched, error}
                     }) => (
    <div className="form-group">
        <label className="col-sm-2 control-label">{label}</label>
        <div className="col-sm-4">
            <input {...input} type={type} className="form-control"/>
            <span className="help-block m-b-none">{touched &&
            ((error && <span>{error}</span>))}
                </span>
        </div>
    </div>
)

class CreateEditSource extends Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.onSubmit = this.onSubmit.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    onSubmit = (formValue) => {

        let source = {
            ...formValue,
            id: formValue.id,
            name: formValue.name
        }

        if (!source.id) {
            this.props.createSource(source);
        } else {
            this.props.updateSource(source);
        }

        this.onClose();
    }

    onClose() {

        this.props.reset();
        this.props.close();
    }

    render() {
        const {handleSubmit, initialValues} = this.props;

        let title = "Create";
        if (initialValues && initialValues.name) {
            title = "Update";
        }

        return (
            <Modal show={this.props.showModal} onHide={this.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title} Source</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-horizontal">
                        <Field
                            name="name"
                            type="text"
                            component={renderField}
                            label=" Name"
                        />
                    </form>
                </Modal.Body>
                <Modal.Footer>

                    <div className="row">
                        <div className="col-md-6 pull-right">
                            <div className="pull-right activity-detail-submit">
                                <button className="btn btn-sm btn-default" onClick={this.props.close}>Cancel</button>
                                <button className="btn btn-sm btn-primary"
                                        onClick={handleSubmit(this.onSubmit)}>
                                    <strong>Submit</strong></button>
                            </div>
                        </div>
                    </div>

                </Modal.Footer>
            </Modal>

        )
    }
}

function mapStateToProps(state) {
    return {
        sources: state.sources
    };
}

export default reduxForm({
    form: 'postSourceForm',
    enableReinitialize: true
})(
    connect(mapStateToProps, {createSource, updateSource})(CreateEditSource)
);
