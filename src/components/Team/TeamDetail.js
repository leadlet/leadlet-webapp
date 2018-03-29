import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {getByTeamId} from "../../actions/team.actions";
import CreateEditTeam from "./CreateEditTeam";
import Link from "react-router-dom/es/Link";
import CreateObjective from "../Objective/CreateObjective";
import {getObjectivesByTeamId} from "../../actions/objective.actions";

class TeamDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isEditTeamModalVisible: false,
            isEditObjectiveModalVisible: false
        };

        this.openEditTeamModal = this.openEditTeamModal.bind(this);
        this.closeEditTeamModal = this.closeEditTeamModal.bind(this);
        this.renderMembersTable = this.renderMembersTable.bind(this);
        this.openObjectiveModal = this.openObjectiveModal.bind(this);
        this.closeObjectiveModal = this.closeObjectiveModal.bind(this);
        this.renderTeamObjectivesAmount = this.renderTeamObjectivesAmount.bind(this);
    }

    openObjectiveModal() {
        this.setState({
            isEditObjectiveModalVisible: true
        });
    }

    closeObjectiveModal() {
        this.setState({
            isEditObjectiveModalVisible: false
        });
    }

    openEditTeamModal() {
        this.setState({
            isEditTeamModalVisible: true
        });
    }

    closeEditTeamModal() {
        this.setState({
            isEditTeamModalVisible: false
        });
    }

    componentDidMount() {
        this.props.getByTeamId(this.props.match.params.teamId);
        this.props.getObjectivesByTeamId(this.props.match.params.teamId);
    }

    renderMembersTable(members) {
        return members.map(member => {
            return (
                <tr key={member.id}>
                    <td>{member.firstName} {member.lastName}</td>
                    <td>{member.login}</td>
                    <td><a>{member.teamLead && <i className="fa fa-check text-navy"></i>}</a></td>
                    <td>
                        <Link to={"/user/" + member.id}>edit</Link> | <a>delete</a>
                    </td>
                </tr>
            );
        });
    }

    renderTeamObjectivesAmount(teamObjectives) {
        return teamObjectives.map(teamObjective => {
            return teamObjective.items.map(item => {
                return (
                    <tr>
                        <td>{item.name}</td>
                        <td>
                            <span className="pie">{item.dailyAmount}</span>
                        </td>
                        <td>
                            <span className="pie">{item.weeklyAmount}</span>
                        </td>
                        <td>
                            <span className="pie">{item.monthlyAmount}</span>
                        </td>
                    </tr>
                )
            });
        });
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
                                        <button onClick={this.openEditTeamModal}
                                                className="btn btn-white btn-xs pull-right">Edit Team
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="ibox float-e-margins">
                                <div className="ibox-title">
                                    <h5>Objectives</h5>
                                    <button className="btn btn-primary btn-xs pull-right" aria-hidden="true"
                                            onClick={() => this.openObjectiveModal()}>Add objective
                                    </button>
                                </div>
                                <div className="ibox-content">
                                    <table className="table table-hover">
                                        <thead>
                                        <tr>
                                            <th>Action Name</th>
                                            <th>Daily</th>
                                            <th>Weekly</th>
                                            <th>Monthly</th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        {this.renderTeamObjectivesAmount(this.props.objectives)}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                        </div>

                        <div className="col-md-9">
                            <div className="ibox float-e-margins">
                                <div className="ibox-title">
                                    <h5>Members</h5>
                                </div>
                                <div className="ibox-content">
                                    <table className="table table-hover">
                                        <thead>
                                        <tr>
                                            <th>Agent Name</th>
                                            <th>Email</th>
                                            <th>Is Lead</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.renderMembersTable(team.members)}
                                        </tbody>
                                    </table>
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
                        {
                            this.state.isEditObjectiveModalVisible &&
                            <CreateObjective showModal={this.state.isEditObjectiveModalVisible}
                                             close={this.closeObjectiveModal}
                                             initialValues={{
                                                 teamId: this.props.match.params.teamId
                                             }}
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
        teams: state.teams.items,
        objectives: state.objectives.teamObjectives
    };
}

export default connect(mapStateToProps, {getByTeamId, getObjectivesByTeamId})

(
    TeamDetail
)
;
