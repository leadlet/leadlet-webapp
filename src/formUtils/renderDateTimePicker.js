import React from 'react';
import {SingleDatePicker} from 'react-dates';
import moment from 'moment';
import Select from '../../node_modules/react-select/dist/react-select.es';
import 'react-select/dist/react-select.css';
import 'react-dates/lib/css/_datepicker.css';

let hours = [
    {value: '00:00', label: '00:00'},
    {value: '00:30', label: '00:30'},
    {value: '01:00', label: '01:00'},
    {value: '01:30', label: '01:30'},
    {value: '02:00', label: '02:00'},
    {value: '02:30', label: '02:30'},
    {value: '03:00', label: '03:00'},
    {value: '03:30', label: '03:30'},
    {value: '04:00', label: '04:00'},
    {value: '04:30', label: '04:30'},
    {value: '05:00', label: '05:00'},
    {value: '05:30', label: '05:30'},
    {value: '06:00', label: '06:00'},
    {value: '06:30', label: '06:30'},
    {value: '07:00', label: '07:00'},
    {value: '07:30', label: '07:30'},
    {value: '08:00', label: '08:00'},
    {value: '08:30', label: '08:30'},
    {value: '09:00', label: '09:00'},
    {value: '09:30', label: '09:30'},
    {value: '10:00', label: '10:00'},
    {value: '10:30', label: '10:30'},
    {value: '11:00', label: '11:00'},
    {value: '11:30', label: '11:30'},
    {value: '12:00', label: '12:00'},
    {value: '12:30', label: '12:30'},
    {value: '13:00', label: '13:00'},
    {value: '13:30', label: '13:30'},
    {value: '14:00', label: '14:00'},
    {value: '14:30', label: '14:30'},
    {value: '15:00', label: '15:00'},
    {value: '15:30', label: '15:30'},
    {value: '16:00', label: '16:00'},
    {value: '16:30', label: '16:30'},
    {value: '17:00', label: '17:00'},
    {value: '17:30', label: '17:30'},
    {value: '18:00', label: '18:00'},
    {value: '18:30', label: '18:30'},
    {value: '19:00', label: '19:00'},
    {value: '19:30', label: '19:30'},
    {value: '20:00', label: '20:00'},
    {value: '20:30', label: '20:30'},
    {value: '21:00', label: '21:00'},
    {value: '21:30', label: '21:30'},
    {value: '22:00', label: '22:00'},
    {value: '22:30', label: '22:30'},
    {value: '23:00', label: '23:00'},
    {value: '23:30', label: '23:30'}
];

class renderDateTimePicker extends React.Component {

    constructor(props) {
        super(props)
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.isOutRange = this.isOutRange.bind(this);
        this.filterOptions = this.filterOptions.bind(this)

        this.state = {
            focused: false
        }

    }

    handleDateChange(date) {
        this.props.input.onChange(date);
    }

    handleTimeChange(timeStr) {

        const newTime = moment(timeStr, 'HH:mm');
        // TODO kancere anlat
        let newDateTime = this.props.input.value? this.props.input.value.clone()
                                : moment();
        newDateTime.set('hour', newTime.hour());
        newDateTime.set('minute', newTime.minute());
        this.props.input.onChange(newDateTime);
    }

    isOutRange(calendarDate){
        let isLessThenMinimumDate = false;

        if(this.props.minimumDate){
            isLessThenMinimumDate = calendarDate.isBefore(this.props.minimumDate,'day');
        }

        let isMoreThenMaximumDate = true;
        if(this.props.maximumDate){
            isMoreThenMaximumDate = calendarDate.isAfter(this.props.maximumDate);
        }

        return isLessThenMinimumDate && isMoreThenMaximumDate;
    }

    filterOptions(hours){
        let threshold = "";
        var filteredHours = JSON.parse(JSON.stringify(hours))

        if( this.props.minimumDate ){
            if( this.props.minimumDate.isSame(this.props.input.value, 'day') ){
                // same day, we should filter some hours
                threshold = this.props.minimumDate.format('HH:mm');
                filteredHours = filteredHours.map((hour) => {
                    if( hour.value <= threshold ){
                        hour.disabled = true;
                    }else{
                        delete hour.disabled;
                    }
                    return hour;
                });
            }
        }

        if( this.props.maximumDate ){
            if( this.props.maximumDate.isSame(this.props.input.value, 'day') ){
                // same day, we should filter some hours
                threshold = this.props.maximumDate.format('HH:mm');
                filteredHours = filteredHours.map((hour) => {
                    if( hour.value >= threshold ){
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
            input, label,
//            meta: {touched, error}
        } = this.props

        return (
            <div>
                <label  className="col-sm-2 control-label">{label}</label>
                <div className="col-sm-6">
                    <SingleDatePicker
                        isDayHighlighted={date => {return moment().isSame(date, 'day')}}
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
                </div>

                <div className="col-sm-4">
                    <Select
                        closeOnSelect={true}
                        disabled={false}
                        multi={false}
                        placeholder="Select time"
                        options={this.filterOptions(hours)}
                        removeSelected={false}
                        rtl={false}
                        onChange={this.handleTimeChange}
                        value={moment(this.props.input.value, "YYYY-MM-DDTHH:mm:ss+-HH:mm").format("HH:mm")}
                        simpleValue
                    />
                </div>

                <span className="help-block m-b-none">
                    {this.props.meta.error && <span>{this.props.meta.error}</span>}
                </span>
            </div>
        )
    }
}

export default renderDateTimePicker