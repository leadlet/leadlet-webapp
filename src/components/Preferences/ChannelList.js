import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import SweetAlert from 'sweetalert-react';
import * as _ from "lodash";
import {_deleteChannel, getAllChannels} from "../../actions/channel.actions";
import CreateEditChannel from "./CreateEditChannel";

class ChannelList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isEditChannelModalVisible: false,
            editingChannel: null
        };

        this.openChannelModal = this.openChannelModal.bind(this);
        this.closeChannelModal = this.closeChannelModal.bind(this);
        this.onDeleteChannel = this.onDeleteChannel.bind(this);
        this.cancelDeleteChannel = this.cancelDeleteChannel.bind(this);
        this.confirmDeleteChannel = this.confirmDeleteChannel.bind(this);
        this.renderChannelsTable = this.renderChannelsTable.bind(this);
    }

    openChannelModal(channel) {
        this.setState({
            isEditChannelModalVisible: true,
            editingChannel: channel
        });
    }

    closeChannelModal() {
        this.setState({
            isEditChannelModalVisible: false,
            editingChannel: null
        });
    }

    onDeleteChannel(id) {
        this.setState({deletingChannelId: id});
        this.setState({showDeleteDialog: true});
    }

    cancelDeleteChannel() {
        this.setState({deletingChannelId: null});
        this.setState({showDeleteDialog: false});
    }

    confirmDeleteChannel() {
        this.props._deleteChannel(this.state.deletingChannelId);
        this.setState({deletingChannelId: null});
        this.setState({showDeleteDialog: false});
    }

    componentDidMount() {
        this.props.getAllChannels();
    }

    renderChannelsTable(channels) {
        return channels.ids.map(channelId => {
            const channel = channels.items[channelId];
            return (

                <tr key={channel.id}>
                    <td>{channel.name}</td>
                    <td>
                        <button type="button" onClick={() => this.openChannelModal(channel)} className="btn btn-link">edit</button> | <button type="button"  onClick={() => this.onDeleteChannel(channel.id)}className="btn btn-link">delete</button>
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
                                        {_.get(this,["props","channels","ids","length"],0) > 0 && this.renderChannelsTable(this.props.channels)}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="row">
                                    <button onClick={this.openChannelModal}
                                            className="btn btn-white btn-xs pull-right"> + Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        this.state.isEditChannelModalVisible &&
                        <CreateEditChannel showModal={this.state.isEditChannelModalVisible}
                                           close={this.closeChannelModal}
                                           initialValues={this.state.editingChannel}
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
                            onConfirm={() => this.confirmDeleteChannel()}
                            onCancel={() => this.cancelDeleteChannel()}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        channels: state.channels
    };
}

export default connect(mapStateToProps, {getAllChannels, _deleteChannel})(ChannelList);
