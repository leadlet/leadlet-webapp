import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from "react-redux";
import {createProduct} from "../../actions/product.actions";

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
                    <div className="hr-line-dashed"/>
                    <div className="form-group">
                        <div className="col-sm-4 col-sm-offset-4">
                            <button className="btn btn-primary" onClick={handleSubmit(this.onSubmit)}>Save</button>
                        </div>
                    </div>
                </form>
            </div>
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
