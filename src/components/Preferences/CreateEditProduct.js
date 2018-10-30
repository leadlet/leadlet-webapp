import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from "react-redux";
import {createProduct} from "../../actions/product.actions";
import Modal from "react-bootstrap/es/Modal";

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

class CreateEditProduct extends Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.onSubmit = this.onSubmit.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    onSubmit = (formValue) => {

        let product = {
            ...formValue,
            id: formValue.id,
            price: formValue.price,
            description: formValue.description
        }

        if (!product.id) {
            this.props.createProduct(product);
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
                    <Modal.Title>{title} Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-horizontal">
                        <Field
                            name="name"
                            type="text"
                            component={renderField}
                            label=" Name"
                        />
                        <Field
                            name="price"
                            type="text"
                            component={renderField}
                            label="Price"
                        />
                        <Field
                            name="description"
                            type="text"
                            component={renderField}
                            label="Description"
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
        products: state.products
    };
}

export default reduxForm({
    form: 'postNewProductForm',
    enableReinitialize: true
})(
    connect(mapStateToProps, {createProduct})(CreateEditProduct)
);
