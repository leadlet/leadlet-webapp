import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import Link from "react-router-dom/es/Link";
import {getAllProducts} from "../../actions/product.actions";
import CreateEditProduct from "./CreateEditProduct";
import * as _ from "lodash";

class ProductList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isSaveProductModalVisible: false,
        };

        this.openProductModal = this.openProductModal.bind(this);
        this.closeProductModal = this.closeProductModal.bind(this);
        this.renderProductsTable = this.renderProductsTable.bind(this);
    }

    openProductModal() {
        this.setState({
            isSaveProductModalVisible: true
        });
    }

    closeProductModal() {
        this.setState({
            isSaveProductModalVisible: false
        });
    }

    componentDidMount() {
        this.props.getAllProducts();
    }

    renderProductsTable(products) {
        return products.map(product => {
            return (
                <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.description}</td>
                    <td>
                        <Link to={"/products/" + product.id}>edit</Link> | <a>delete</a>
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
                            <div className="ibox-title">
                                <h5>Products</h5>
                            </div>
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
                                        {_.get(this,["props","products","ids","length"],0) > 0 && this.renderProductsTable(this.props.products.items)}
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
                                           initialValues={this.props.products.ids}
                        />
                    }
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

export default connect(mapStateToProps, {getAllProducts})(ProductList);
