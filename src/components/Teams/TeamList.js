import React, {Component} from 'react';
import {connect} from "react-redux";
import {getAllTeams} from "../../actions/team.actions";


class TeamList extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getAllTeams();
    }

    render() {

        if (this.props.teams.ids) {
            return this.props.teams.ids.map(id => {
                let item = this.props.teams.items[id];
                return (
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="ibox">
                                <div className="ibox-title">
                                    <span className="label label-primary pull-right">NEW</span>
                                    <h5>
                                        {item.name}
                                    </h5>
                                </div>
                                <div className="ibox-content">

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
