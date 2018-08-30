import React, {Component} from 'react';
import {connect} from "react-redux";
import {filterByIdSelector} from "../../models/selectors";

import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Tooltip from 'rc-tooltip';
import {Handle, Range} from 'rc-slider';
import {getFieldRange, rangeChanged} from "../../actions/search.actions";


const handle = (props) => {
    const { value, dragging, index, ...restProps } = props;
    return (
        <Tooltip
            prefixCls="rc-slider-tooltip"
            overlay={value}
            visible={false}
            placement="bottom"
            key={index}
        >
            <Handle value={value} {...restProps} />
        </Tooltip>
    );
};

class RangeFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            definition: {
                id: this.props.id,
                type: "RANGE",
                dataField: this.props.dataField
            }
        };

        this.onChange = this.onChange.bind(this);
        this.onAfterChange = this.onAfterChange.bind(this);

    }

    componentDidMount(){
        this.props.getFieldRange( this.state.definition);
    }

    onChange( newRange ){
        this.setState({ min: newRange[0], max: newRange[1]});
    }
    onAfterChange( newRange ){
        this.props.rangeChanged(this.props.id, newRange[0], newRange[1]);
    }
    render(){
        if(this.props.filter){
            return (<div className="range-filter">
                    <label>{this.props.title}</label>
                    <div className="selector">
                        <Range
                            min={this.props.filter.min}
                            max={this.props.filter.max}
                            value={[ this.state.min || this.props.filter.min
                                , this.state.max ||this.props.filter.max]}
                            handle={handle}
                            onAfterChange={this.onAfterChange}
                            onChange={this.onChange}
                            allowCross={false}/>
                    </div>
                    <div className="text-center">
                        {this.state.min || this.props.filter.min} - {this.state.max || this.props.filter.max}
                    </div>
                </div>
            );
        }else{
            return (<h1>Loading</h1>);
        }
    }
}

function mapStateToProps(state, props) {
    return {
        filter: filterByIdSelector(state, props.id)
    };
}


export default connect(mapStateToProps, {getFieldRange, rangeChanged})(RangeFilter);

