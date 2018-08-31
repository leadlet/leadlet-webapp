import React, {Component} from 'react';
import {connect} from "react-redux";
import {filterByIdSelector} from "../../models/selectors";

import {getFieldRange, rangeChanged} from "../../actions/search.actions";
import {DateRangePicker} from "react-dates";
import moment from 'moment';

class DateRangeFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            definition: {
                id: this.props.id,
                type: "DATERANGE",
                dataField: this.props.dataField
            },
            focusedInput: null
        };

        this.onDatesChange = this.onDatesChange.bind(this);
        this.isOutsideRange = this.isOutsideRange.bind(this);
    }
    componentDidMount(){
        this.props.getFieldRange( this.state.definition);
    }
    isOutsideRange( date ){
        // TODO ygokirmak set min max dates
        return false;
    }
    onDatesChange( startDate, endDate ){
        this.props.rangeChanged(this.props.id, startDate && startDate.valueOf(), endDate && endDate.valueOf());
    }
    render(){

        return (<div className="date-range-filter">
                <h6 className="filter-name">{this.props.title}</h6>
                        <DateRangePicker
                            isOutsideRange={this.isOutsideRange}
                            startDate={ (this.props.filter && this.props.filter.selected && this.props.filter.selected.min && moment(this.props.filter.selected.min))
                                        || ( this.props.filter && this.props.filter.min && moment(this.props.filter.min))}
                            startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                            endDate={ (this.props.filter && this.props.filter.selected && this.props.filter.selected.max && moment(this.props.filter.selected.max))
                                        || ( this.props.filter && this.props.filter.max && moment(this.props.filter.max))}
                            endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                            onDatesChange={({ startDate, endDate }) => this.onDatesChange(startDate, endDate) } // PropTypes.func.isRequired,
                            focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                            onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                            displayFormat="DD/MM/YYYY"
                            small
                            noBorder
                        />

                </div>);
    }
}

function mapStateToProps(state, props) {
    return {
        filter: filterByIdSelector(state, props.id)
    };
}


export default connect(mapStateToProps, {getFieldRange, rangeChanged})(DateRangeFilter);

