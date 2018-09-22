import React, {Component} from 'react';
import {connect} from "react-redux";

import {getFieldRange, rangeChanged} from "../../actions/search.actions";
import {DateRangePicker} from "react-dates";
import moment from 'moment';
import * as _ from "lodash";

class DateRangeFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            definition: {
                id: this.props.id,
                type: "DATERANGE",
                dataField: this.props.dataField,
                group: this.props.group,
                index: this.props.index
            },
            focusedInput: null
        };

        this.onDatesChange = this.onDatesChange.bind(this);
        this.isOutsideRange = this.isOutsideRange.bind(this);
        this.renderRangePicker = this.renderRangePicker.bind(this);

    }

    componentDidMount() {
        this.props.getFieldRange(this.state.definition);
    }

    isOutsideRange(date) {
        // TODO ygokirmak set min max dates
        return false;
    }

    onDatesChange(startDate, endDate) {
        this.props.rangeChanged(this.props.id, startDate && startDate.valueOf(), endDate && endDate.valueOf());
    }

    renderRangePicker() {
        if (_.has(this, ["props", "filterStore", this.props.id])) {

            let filter = _.get(this, ["props", "filterStore", this.props.id]);
            return (
                <DateRangePicker
                    isOutsideRange={this.isOutsideRange}
                    startDate={( _.has(filter, ["selected", "min"]) && moment(filter.selected.min))
                                || (_.has(filter, ["min"]) && moment(filter.min))}
                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                    endDate={(_.has(filter, ["selected", "max"]) && moment(filter.selected.max))
                                || ( _.has(filter, ["min"]) && moment(filter.max))}
                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={({startDate, endDate}) => this.onDatesChange(startDate, endDate)} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => this.setState({focusedInput})} // PropTypes.func.isRequired,
                    displayFormat="DD/MM/YYYY"
                    small
                    noBorder
                />
            );

        }

    }

    render() {

        return (<div className="date-range-filter">
            <h6 className="filter-name">{this.props.title}</h6>

            {this.renderRangePicker()}

        </div>);
    }
}

function mapStateToProps(state, props) {
    return {
        filterStore: state.filterStore
    };
}


export default connect(mapStateToProps, {getFieldRange, rangeChanged})(DateRangeFilter);

