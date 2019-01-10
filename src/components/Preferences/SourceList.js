import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import SweetAlert from 'sweetalert-react';
import * as _ from "lodash";
import {_deleteSource, getAllSources} from "../../actions/source.actions";
import CreateEditSource from "./CreateEditSource";

class SourceList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isSourceEditModalVisible: false,
            editingSource: null
        };

        this.openSourceModal = this.openSourceModal.bind(this);
        this.closeSourceModal = this.closeSourceModal.bind(this);
        this.onDeleteSource = this.onDeleteSource.bind(this);
        this.cancelDeleteSource = this.cancelDeleteSource.bind(this);
        this.confirmDeleteSource = this.confirmDeleteSource.bind(this);
        this.renderSourcesTable = this.renderSourcesTable.bind(this);
    }

    openSourceModal(source) {
        this.setState({
            isEditSourceModalVisible: true,
            editingSource: source
        });
    }

    closeSourceModal() {
        this.setState({
            isEditSourceModalVisible: false,
            editingSource: null
        });
    }

    onDeleteSource(id) {
        this.setState({deletingSourceId: id});
        this.setState({showDeleteDialog: true});
    }

    cancelDeleteSource() {
        this.setState({deletingSourceId: null});
        this.setState({showDeleteDialog: false});
    }

    confirmDeleteSource() {
        this.props._deleteSource(this.state.deletingSourceId);
        this.setState({deletingSourceId: null});
        this.setState({showDeleteDialog: false});
    }

    componentDidMount() {
        this.props.getAllSources();
    }

    renderSourcesTable(sources) {
        return sources.ids.map(sourceId => {
            const source = sources.items[sourceId];
            return (

                <tr key={source.id}>
                    <td>{source.name}</td>
                    <td>
                        <button type="button" onClick={() => this.openSourceModal(source)} className="btn btn-link">edit</button> | <button type="button"  onClick={() => this.onDeleteSource(source.id)}className="btn btn-link">delete</button>
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
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {_.get(this,["props","sources","ids","length"],0) > 0 && this.renderSourcesTable(this.props.sources)}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="row">
                                    <button onClick={this.openSourceModal}
                                            className="btn btn-white btn-xs pull-right"> + Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        this.state.isEditSourceModalVisible &&
                        <CreateEditSource showModal={this.state.isEditSourceModalVisible}
                                           close={this.closeSourceModal}
                                           initialValues={this.state.editingSource}
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
                            onConfirm={() => this.confirmDeleteSource()}
                            onCancel={() => this.cancelDeleteSource()}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        sources: state.sources
    };
}

export default connect(mapStateToProps, {getAllSources, _deleteSource})(SourceList);
