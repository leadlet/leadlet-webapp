import React from 'react';
import * as _ from "lodash";
import {connect} from "react-redux";

class Footer extends React.Component {
    render() {
        return (
            <div className="footer">
                <div>
                    <strong>{_.get(this,"props.authentication.user.appAccount.name", "Leadlet")}</strong>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        authentication: state.authentication,
    };
}

const connectedTopFooter = connect(mapStateToProps)(Footer);
export { connectedTopFooter as Footer };