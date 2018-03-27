import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {getByTeamId} from "../../actions/team.actions";
import CreateEditTeam from "./CreateEditTeam";

class TeamDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isEditTeamModalVisible: false
        };

        this.openEditTeamModal = this.openEditTeamModal.bind(this);
        this.closeEditTeamModal = this.closeEditTeamModal.bind(this);
    }

    openEditTeamModal(){
        this.setState({
            isEditTeamModalVisible: true
        });
    }

    closeEditTeamModal(){
        this.setState({
            isEditTeamModalVisible: false
        });
    }

    componentDidMount() {
        this.props.getByTeamId(this.props.match.params.teamId);
    }


    render() {

        const team = this.props.teams && this.props.teams[this.props.match.params.teamId];

        if (!team) {
            return (
                <em>Loading details for {this.props.match.params.teamId}</em>
            );
        } else {

            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="ibox">
                                <div className="ibox-content info-card">
                                    <div className="row">
                                        <dl className="dl-horizontal">
                                            <dt>Team Name:</dt>
                                            <dd>{team.name}</dd>
                                            <dt>Description:</dt>
                                            <dd>{team.description}</dd>
                                        </dl>
                                    </div>
                                    <div className="row">
                                        <button onClick={this.openEditTeamModal} className="btn btn-white btn-xs pull-right">Edit Team</button>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {
                            this.state.isEditTeamModalVisible &&
                            <CreateEditTeam showModal={this.state.isEditTeamModalVisible}
                                            close={this.closeEditTeamModal}
                                            initialValues={this.props.teams[this.props.match.params.teamId]}
                            />
                        }

                    </div>
                </div>
            )
        }
    }
}

function

mapStateToProps(state) {
    return {
        teams: state.teams.items
    };
}

export default connect(mapStateToProps, {getByTeamId})

(
    TeamDetail
)
;
