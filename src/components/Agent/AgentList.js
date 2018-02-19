import React, {Component} from 'react';
import {connect} from "react-redux";
import {getAll, _delete} from "../../actions/user.actions";
import CreateEditAgent from "./CreateEditAgent";
import Link from "react-router-dom/es/Link";
import SweetAlert from 'sweetalert-react';

class AgentList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isAgentModalVisible: false,
            showDeleteDialog: false,
            selectedAgentForDelete: null
        };

        this.openEditAgentForm = this.openEditAgentForm.bind(this);
        this.closeAgentModal = this.closeAgentModal.bind(this);
        this.renderAgentList = this.renderAgentList.bind(this);
        this.onDeleteAgent = this.onDeleteAgent.bind(this);
        this.confirmDeleteAgent = this.confirmDeleteAgent.bind(this);
        this.cancelDeleteAgent = this.cancelDeleteAgent.bind(this);
    }

    openEditAgentForm() {
        this.setState({isAgentModalVisible: true});
    }

    closeAgentModal() {
        this.setState({isAgentModalVisible: false});
    }

    confirmDeleteAgent() {
        this.props._delete(this.state.selectedAgentForDelete);
        this.setState({showDeleteDialog: false});
    }

    cancelDeleteAgent() {
        this.setState({showDeleteDialog: false});
    }

    onDeleteAgent(login) {
        this.setState({showDeleteDialog: true});
        this.setState({selectedAgentForDelete: login});
    }

    componentDidMount() {
        this.props.getAll();
    }

    render() {
        return (
            <div>
                {this.renderAgentList()}
                <div className="col-lg-2 agent-create-box">
                    <div className="contact-box center-version">
                        <a onClick={() => this.openEditAgentForm()}>
                            <img alt="plus-img" src="img/plus_icon.png"/>
                        </a>
                    </div>
                </div>
                <CreateEditAgent
                    showModal={this.state.isAgentModalVisible}
                    close={this.closeAgentModal}
                />
                <div>
                    <SweetAlert
                        title="Are you sure?"
                        text="You will not be able to recover this recording!"
                        type="warning"
                        showCancelButton={true}
                        confirmButtonColor="#DD6B55"
                        confirmButtonText="Yes, delete it!"
                        show={this.state.showDeleteDialog}
                        onConfirm={this.confirmDeleteAgent}
                        onCancel={this.cancelDeleteAgent}
                    />
                </div>
            </div>
        );

    }

    renderAgentList() {
        if (this.props.users.ids) {
            return this.props.users.ids.map(id => {
                let item = this.props.users.items[id];
                return (
                    <div className="col-lg-2" key={id}>
                        <div className="contact-box center-version">
                            <a href="profile.html">
                                <img alt="agent-img" className="img-circle" src="img/headshot-placeholder.jpg"/>
                                <h3 className="m-b-xs"><strong>{item.firstName} {item.lastName}</strong></h3>

                                <div className="font-bold">{item.login}</div>
                                <address className="m-t-md">
                                    <strong>Twitter, Inc.</strong><br/>
                                    795 Folsom Ave, Suite 600<br/>
                                    San Francisco, CA 94107<br/>
                                    <abbr title="Phone">P:</abbr> (123) 456-7890
                                </address>

                            </a>
                            <div className="contact-box-footer">
                                <div className="m-t-xs btn-group">
                                    <Link to={"/user/"+item.id}><i className="fa fa-pencil"/> Edit</Link>
                                    <a className="btn btn-xs btn-white" onClick={ () => this.onDeleteAgent(item.login)}><i className="fa fa-trash"/> Delete</a>
                                </div>
                            </div>

                        </div>
                    </div>
                )
                    ;
            });
        } else {
            return (
                <em>Loading...</em>
            );
        }
    }

}

function mapStateToProps(state) {
    return {
        users: state.users
    };
}

export default connect(mapStateToProps, {getAll, _delete})(AgentList);
