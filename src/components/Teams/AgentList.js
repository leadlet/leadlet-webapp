import React, {Component} from 'react';
import {connect} from "react-redux";
import {getAll} from "../../actions/user.actions";

class AgentList extends Component {

    componentDidMount() {
        this.props.getAll();
    }

    render() {
        if (this.props.users.ids) {
            return this.props.users.ids.map(id => {
                let item = this.props.users.items[id];
                return (
                    <div className="col-lg-2" key={id}>
                        <div className="contact-box center-version">
                            <a href="profile.html">
                                <img alt="agent-img" className="img-circle" src="img/headshot-placeholder.jpg"/>
                                <h3 className="m-b-xs"><strong>{item.firstName} {item.lastName}</strong></h3>

                                <div className="font-bold">Graphics designer</div>
                                <address className="m-t-md">
                                    <strong>Twitter, Inc.</strong><br/>
                                    795 Folsom Ave, Suite 600<br/>
                                    San Francisco, CA 94107<br/>
                                    <abbr title="Phone">P:</abbr> (123) 456-7890
                                </address>

                            </a>
                            <div className="contact-box-footer">
                                <div className="m-t-xs btn-group">
                                    <a className="btn btn-xs btn-white"><i className="fa fa-pencil"/> Edit </a>
                                    <a className="btn btn-xs btn-white"><i className="fa fa-trash"/> Delete</a>
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
        users: state.users
    };
}

export default connect(mapStateToProps, {getAll})(AgentList);
