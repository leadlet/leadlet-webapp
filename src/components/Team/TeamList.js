import React, {Component} from 'react';
import {connect} from "react-redux";
import {getAllTeams} from "../../actions/team.actions";
import Tooltip from "react-bootstrap/es/Tooltip";
import OverlayTrigger from "react-bootstrap/es/OverlayTrigger";
import CreateEditTeam from "./CreateEditTeam";
import Link from "react-router-dom/es/Link";

function tooltip(member) {

    if (member.teamLead) {
        return (
            <Tooltip id="tooltip">
                <strong>{member.firstName} {member.lastName} -team leader</strong>
            </Tooltip>
        );
    } else {
        return (
            <Tooltip id="tooltip">
                <strong>{member.firstName} {member.lastName}</strong>
            </Tooltip>
        );
    }
}

class TeamList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isTeamModalVisible: false
        };

        this.teamMembers = this.teamMembers.bind(this);
        this.renderTeamItems = this.renderTeamItems.bind(this);
        this.openTeamForm = this.openTeamForm.bind(this);
        this.closeTeamModal = this.closeTeamModal.bind(this);

    }

    openTeamForm() {
        this.setState({isTeamModalVisible: true});
    }

    closeTeamModal() {
        this.setState({isTeamModalVisible: false});
    }

    teamMembers(members) {
        return members.map(member => {
            return (
                <OverlayTrigger placement="bottom" overlay={tooltip(member)}>
                    <i className="fa fa-user-circle-o fa-5x"/>
                </OverlayTrigger>
            );
        });
    }

    renderTeamItems() {
        if (this.props.teams.ids) {
            return this.props.teams.ids.map(id => {
                let item = this.props.teams.items[id];
                return (
                    <div className="col-lg-4" key={id}>
                        <div className="ibox">
                            <div className="ibox-title">
                                <h5>{item.name}</h5>
                                <span className="label label-primary pull-right">NEW</span>
                            </div>
                            <div className="ibox-content">
                                <Link to={"/team/" + item.id}>
                                    <div className="team-members">
                                        {this.teamMembers(item.members)}
                                    </div>

                                    <h4>Info about Design Team</h4>
                                    <p>
                                        It is a long established fact that a reader will be distracted by the readable
                                        content
                                        of a page when looking at its layout. The point of using Lorem Ipsum is that it
                                        has.
                                    </p>
                                    <div>
                                        <span>Status of current project:</span>
                                        <div className="stat-percent">48%</div>
                                        <div className="progress progress-mini">
                                            <div style={{"width": "48%"}} className="progress-bar"></div>
                                        </div>
                                    </div>
                                    <div className="row  m-t-sm">
                                        <div className="col-sm-4">
                                            <div className="font-bold">PROJECTS</div>
                                            12
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="font-bold">RANKING</div>
                                            4th
                                        </div>
                                        <div className="col-sm-4 text-right">
                                            <div className="font-bold">BUDGET</div>
                                            $200,913 <i className="fa fa-level-up text-navy"></i>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                );
            });
        } else {
            return (
                <em>Loading...</em>
            );
        }
    }

    componentDidMount() {
        this.props.getAllTeams();
    }

    render() {
        return (
            <div>
                {this.renderTeamItems()}
                <div className="col-lg-4 agent-create-box">
                    <div className="contact-box center-version">
                        <a onClick={() => this.openTeamForm()}>
                            <img alt="plus-img" src="img/plus_icon.png"/>
                        </a>
                    </div>
                </div>
                <CreateEditTeam
                    showModal={this.state.isTeamModalVisible}
                    close={this.closeTeamModal}
                    initialValues={{}}
                />
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        teams: state.teams
    };
}

export default connect(mapStateToProps, {getAllTeams})(TeamList);
