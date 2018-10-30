import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {getAllProducts, deleteProduct} from "../../actions/product.actions";
import CreateEditProduct from "./CreateEditProduct";
import SweetAlert from 'sweetalert-react';
import * as _ from "lodash";

class ProductList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isSaveProductModalVisible: false,
            editingProduct: null
        };

        this.openProductModal = this.openProductModal.bind(this);
        this.closeProductModal = this.closeProductModal.bind(this);
        this.onDeleteProduct = this.onDeleteProduct.bind(this);
        this.cancelDeleteProduct = this.cancelDeleteProduct.bind(this);
        this.confirmDeleteProduct = this.confirmDeleteProduct.bind(this);
        this.renderProductsTable = this.renderProductsTable.bind(this);
    }

    openProductModal(product) {
        this.setState({
            isSaveProductModalVisible: true,
            editingProduct: product
        });
    }

    closeProductModal() {
        this.setState({
            isSaveProductModalVisible: false,
            editingProduct: null
        });
    }

    onDeleteProduct(id) {
        this.setState({deletingProductId: id});
        this.setState({showDeleteDialog: true});
    }

    cancelDeleteProduct() {
        this.setState({deletingProductId: null});
        this.setState({showDeleteDialog: false});
    }

    confirmDeleteProduct() {
        this.props.deleteProduct(this.state.deletingProductId);
        this.setState({deletingProductId: null});
        this.setState({showDeleteDialog: false});
    }

    componentDidMount() {
        this.props.getAllProducts();
    }

    renderProductsTable(products) {
        return products.ids.map(productId => {
            const product = products.items[productId];
            return (

                <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.description}</td>
                    <td>
                        <button type="button" onClick={() => this.openProductModal(product)} className="btn btn-link">edit</button> | <button type="button"  onClick={() => this.onDeleteProduct(product.id)}className="btn btn-link">delete</button>
                    </td>
                </tr>
            );
        });
    }

    render() {

        return (
            <div className="container-fluid m-t-lg">
                <div className="row">
                    <div className="col-md-9">
                        <div className="ibox float-e-margins">
                            <div className="ibox-content">
                                <div className="row">
                                    <table className="table table-hover">
                                        <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Description</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {_.get(this,["props","products","ids","length"],0) > 0 && this.renderProductsTable(this.props.products)}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="row">
                                    <button onClick={this.openProductModal}
                                            className="btn btn-white btn-xs pull-right"> + Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        this.state.isSaveProductModalVisible &&
                        <CreateEditProduct showModal={this.state.isSaveProductModalVisible}
                                           close={this.closeProductModal}
                                           initialValues={this.state.editingProduct}
                        />
                    }
                    <div>
                        <SweetAlert
                            title="Are you sure?"
                            text="You will not be able to recover this imaginary file!"
                            type="warning"
                            showCancelButton={true}
                            confirmButtonColor="#DD6B55"
                            confirmButtonText="Yes, delete it!"
                            show={this.state.showDeleteDialog}
                            onConfirm={() => this.confirmDeleteProduct()}
                            onCancel={() => this.cancelDeleteProduct()}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        products: state.products
    };
}

export default connect(mapStateToProps, {getAllProducts, deleteProduct})(ProductList);
