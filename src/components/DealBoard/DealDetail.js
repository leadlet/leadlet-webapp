import React, {Component} from 'react';
import '../../../node_modules/fullcalendar/dist/fullcalendar.css';

export default class DealDetail extends Component {

    render() {
        return (
            <em>Loading details for deal with id {this.props.match.params.dealId}</em>
        );
    }
}

