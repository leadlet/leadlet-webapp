import React, {Component} from 'react';
import {SingleDatePicker} from 'react-dates';
import moment from 'moment';
import 'react-select/dist/react-select.css';

class renderDatePicker extends React.Component {

    constructor(props) {
        super(props)
        this.handleDateChange = this.handleDateChange.bind(this);
        this.isOutRange = this.isOutRange.bind(this);
        this.filterOptions = this.filterOptions.bind(this)

        this.state = {
            focused: false
        }

    }

    handleDateChange(date) {
        this.props.input.onChange(date);
    }

    isOutRange(day){
        let checkMinimum = false;
        if(this.props.minimumDate){
            checkMinimum = day.isBefore(this.props.minimumDate);
        }

        let checkMaximum = true;
        if(this.props.maximumDate){
            checkMaximum = day.isAfter(this.props.maximumDate);
        }

        return checkMinimum && checkMaximum;
    }

    filterOptions(hours){
        let threshold = "";
        var filteredHours = JSON.parse(JSON.stringify(hours))

        if( this.props.minimumDate ){
            const dateDiff = this.props.minimumDate.diff(this.props.input.value, 'days');
            if( dateDiff === 0){
                // same day, we should filter some hours
                threshold = this.props.minimumDate.format('HH:mm');
                filteredHours = filteredHours.map((hour) => {
                    if( hour.value < threshold ){
                        hour.disabled = true;
                    }else{
                        delete hour.disabled;
                    }
                    return hour;
                });
            }
        }

        if( this.props.maximumDate ){
            const dateDiff = this.props.maximumDate.diff(this.props.input.value, 'days');
            if( dateDiff === 0){
                // same day, we should filter some hours
                threshold = this.props.maximumDate.format('HH:mm');
                filteredHours = filteredHours.map((hour) => {
                    if( hour.value > threshold ){
                        hour.disabled = true;
                    }else{
                        delete hour.disabled;
                    }
                    return hour;
                });
            }
        }
        return filteredHours;
    }
    render() {
        const {
            input, placeholder, label,
            meta: {touched, error}
        } = this.props

        return (
            <div className="form-group">
                <label>{label}</label>
                <SingleDatePicker
                    numberOfMonths={1}
                    small={true}
                    block={true}
                    date={input.value ?
                        (typeof(input.value) === moment ?
                            input.value
                            : moment(this.props.input.value, "YYYY-MM-DDTHH:mm:ss+-HH:mm"))
                        : null} // momentPropTypes.momentObj or null
                    onDateChange={this.handleDateChange} // PropTypes.func.isRequired
                    focused={this.state.focused} // PropTypes.bool
                    onFocusChange={({focused}) => this.setState({focused})} // PropTypes.func.isRequired
                    isOutsideRange={ this.isOutRange }
                />
                {touched && error && <span>{error}</span>}
            </div>
        )
    }
}

export default renderDatePicker