import React, {Component} from 'react';
import {connect} from "react-redux";
import {getAllTeams} from "../../actions/team.actions";
import Tooltip from "react-bootstrap/es/Tooltip";
import OverlayTrigger from "react-bootstrap/es/OverlayTrigger";

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

        this.state = {};

        this.teamMembers = this.teamMembers.bind(this);

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

    componentDidMount() {
        this.props.getAllTeams();
    }

    render() {
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

                                <div className="team-members">
                                    {this.teamMembers(item.members)}
                                </div>

                                <h4>Info about Design Team</h4>
                                <p>
                                    It is a long established fact that a reader will be distracted by the readable
                                    content
                                    of a page when looking at its layout. The point of using Lorem Ipsum is that it has.
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
}


function mapStateToProps(state) {
    return {
        teams: state.teams
    };
}

export default connect(mapStateToProps, {getAllTeams})(TeamList);
