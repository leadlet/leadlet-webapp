import React from 'react';
import {SingleDatePicker} from 'react-dates';
import moment from 'moment';
import Select from '../../node_modules/react-select/dist/react-select.es';
import 'react-select/dist/react-select.css';
import 'react-dates/lib/css/_datepicker.css';


let times = [
    {value: '00:00', label: '00:00'},
    {value: '00:15', label: '00:15'},
    {value: '00:30', label: '00:30'},
    {value: '00:45', label: '00:45'},
    {value: '01:00', label: '01:00'},
    {value: '01:15', label: '01:15'},
    {value: '01:30', label: '01:30'},
    {value: '01:45', label: '01:45'},
    {value: '02:00', label: '02:00'},
    {value: '02:15', label: '02:15'},
    {value: '02:30', label: '02:30'},
    {value: '02:45', label: '02:45'},
    {value: '03:00', label: '03:00'},
    {value: '03:15', label: '03:15'},
    {value: '03:30', label: '03:30'},
    {value: '03:45', label: '03:45'},
    {value: '04:00', label: '04:00'},
    {value: '04:15', label: '04:15'},
    {value: '04:30', label: '04:30'},
    {value: '04:45', label: '04:45'},
    {value: '05:00', label: '05:00'},
    {value: '05:15', label: '05:15'},
    {value: '05:30', label: '05:30'},
    {value: '05:45', label: '05:45'},
    {value: '06:00', label: '06:00'},
    {value: '06:15', label: '06:15'},
    {value: '06:30', label: '06:30'},
    {value: '06:45', label: '06:45'},
    {value: '07:00', label: '07:00'},
    {value: '07:15', label: '07:15'},
    {value: '07:30', label: '07:30'},
    {value: '07:45', label: '07:45'},
    {value: '08:00', label: '08:00'},
    {value: '08:15', label: '08:15'},
    {value: '08:30', label: '08:30'},
    {value: '08:45', label: '08:45'},
    {value: '09:00', label: '09:00'},
    {value: '09:15', label: '09:15'},
    {value: '09:30', label: '09:30'},
    {value: '09:45', label: '09:45'},
    {value: '10:00', label: '10:00'},
    {value: '10:15', label: '10:15'},
    {value: '10:30', label: '10:30'},
    {value: '10:45', label: '10:45'},
    {value: '11:00', label: '11:00'},
    {value: '11:15', label: '11:15'},
    {value: '11:30', label: '11:30'},
    {value: '11:45', label: '11:45'},
    {value: '12:00', label: '12:00'},
    {value: '12:15', label: '12:15'},
    {value: '12:30', label: '12:30'},
    {value: '12:45', label: '12:45'},
    {value: '13:00', label: '13:00'},
    {value: '13:15', label: '13:15'},
    {value: '13:30', label: '13:30'},
    {value: '13:45', label: '13:45'},
    {value: '14:00', label: '14:00'},
    {value: '14:15', label: '14:15'},
    {value: '14:30', label: '14:30'},
    {value: '14:45', label: '14:45'},
    {value: '15:00', label: '15:00'},
    {value: '15:15', label: '15:15'},
    {value: '15:30', label: '15:30'},
    {value: '15:45', label: '15:45'},
    {value: '16:00', label: '16:00'},
    {value: '16:15', label: '16:15'},
    {value: '16:30', label: '16:30'},
    {value: '16:45', label: '16:45'},
    {value: '17:00', label: '17:00'},
    {value: '17:15', label: '17:15'},
    {value: '17:30', label: '17:30'},
    {value: '17:45', label: '17:45'},
    {value: '18:00', label: '18:00'},
    {value: '18:15', label: '18:15'},
    {value: '18:30', label: '18:30'},
    {value: '18:45', label: '18:45'},
    {value: '19:00', label: '19:00'},
    {value: '19:15', label: '19:15'},
    {value: '19:30', label: '19:30'},
    {value: '19:45', label: '19:45'},
    {value: '20:00', label: '20:00'},
    {value: '20:15', label: '20:15'},
    {value: '20:30', label: '20:30'},
    {value: '20:45', label: '20:45'},
    {value: '21:00', label: '21:00'},
    {value: '21:15', label: '21:15'},
    {value: '21:30', label: '21:30'},
    {value: '21:45', label: '21:45'},
    {value: '22:00', label: '22:00'},
    {value: '22:15', label: '22:15'},
    {value: '22:30', label: '22:30'},
    {value: '22:45', label: '22:45'},
    {value: '23:00', label: '23:00'},
    {value: '23:15', label: '23:15'},
    {value: '23:30', label: '23:30'},
    {value: '23:45', label: '23:45'}
];

const TIME_FORMAT = "YYYY-MM-DDTHH:mm:ss[Z]";

class renderDateTimePicker extends React.Component {

    constructor(props) {
        super(props)
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            focused: false
        }

    }

    handleDateChange(date) {

        let newDate = moment();
        if(this.props.input.value){
            newDate = moment(this.props.input.value, TIME_FORMAT);
        }

        newDate.year(date.year()).month(date.month()).date(date.date());
        this.props.input.onChange(newDate.format(TIME_FORMAT));
    }

    handleChange = (selectedTime) => {

        const activityTime = moment(selectedTime, 'HH:mm');
        const newDate = moment(this.props.input.value, TIME_FORMAT);

        newDate.hour(activityTime.hour()).minute(activityTime.minute());
        this.props.input.onChange(newDate.format(TIME_FORMAT));

    }

    render() {
        const {
            input, label,
//            meta: {touched, error}
        } = this.props


        return (
            <div>
                <label className="col-sm-3 control-label">{label}</label>
                <div className="col-sm-5">
                    <SingleDatePicker
                        isDayHighlighted={date => {
                            return moment().isSame(date, 'day')
                        }}
                        numberOfMonths={1}
                        small={true}
                        block={true}
                        date={input.value ? moment(this.props.input.value, TIME_FORMAT) : null} // momentPropTypes.momentObj or null
                        onDateChange={this.handleDateChange} // PropTypes.func.isRequired
                        focused={this.state.focused} // PropTypes.bool
                        onFocusChange={({focused}) => this.setState({focused})} // PropTypes.func.isRequired
                    />
                </div>

                <div className="col-sm-4">
                    <Select
                        closeOnSelect={true}
                        disabled={false}
                        multi={false}
                        placeholder="Select time"
                        options={times}
                        removeSelected={false}
                        rtl={false}
                        onChange={this.handleChange}
                        value={moment(this.props.input.value, TIME_FORMAT).format("HH:mm")}
                        simpleValue
                    />
                </div>

                <span style={{color: "red"}} className="help-block m-b-none">
                    {this.props.meta.error && <span className="date-error-area">{this.props.meta.error}</span>}
                </span>
            </div>
        )
    }
}

export default renderDateTimePicker