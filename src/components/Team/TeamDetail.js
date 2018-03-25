import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";

class TeamDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
        };

    }


    render() {
        return (
            <div>Hello Team!</div>
        )
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps, {})(TeamDetail);
