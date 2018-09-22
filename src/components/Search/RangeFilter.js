import React, {Component} from 'react';
import {connect} from "react-redux";

import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Tooltip from 'rc-tooltip';
import {Handle, Range} from 'rc-slider';
import {getFieldRange, rangeChanged} from "../../actions/search.actions";
import * as _ from "lodash";


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
                dataField: this.props.dataField,
                group: this.props.group,
                index: this.props.index
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
        this.setState({ min: null, max: null});
        this.props.rangeChanged(this.props.id, newRange[0], newRange[1]);
    }

    renderRangePicker(){
        if (_.has(this, ["props", "filterStore", this.props.id])) {

            let filter = _.get(this, ["props", "filterStore", this.props.id]);

            return [

                <div className="selector">
                    <Range
                        min={filter.min}
                        max={filter.max}
                        value={[ this.state.min || ( filter.selected && filter.selected.min) || filter.min
                            , this.state.max || ( filter.selected && filter.selected.max) || filter.max]}
                        handle={handle}
                        onAfterChange={this.onAfterChange}
                        onChange={this.onChange}
                        allowCross={false}/>
                </div>,
                <div className="text-center">
                    {this.state.min || ( filter.selected && filter.selected.min) || filter.min} - {this.state.max || ( filter.selected && filter.selected.max) || filter.max}
                </div>
            ];

        }

    }
    render(){
            return (<div className="range-filter">
                    <h6 className="filter-name">{this.props.title}</h6>
                    { this.renderRangePicker()}

                </div>
            );

    }
}

function mapStateToProps(state, props) {
    return {
        filterStore: state.filterStore
    };
}


export default connect(mapStateToProps, {getFieldRange, rangeChanged})(RangeFilter);

