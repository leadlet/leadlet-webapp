import React, {Component} from 'react';
import {connect} from "react-redux";
import {clearFilter, getDistincTerms, registerFilter, termSelected, termUnSelected} from "../../actions/search.actions";
import {filterByIdSelector, filtersSelector} from "../../models/selectors";
import moment from "moment";

class SelectedFilters extends Component {

    constructor(props) {
        super(props);
        this.onClearFilter = this.onClearFilter.bind(this);
    }

    onClearFilter(id){
        this.props.clearFilter(id);
    }
    render(){
        let searchFilters = [];

        if( this.props.filters ){
            var termFilters = this.props.filters
                .filter(filter => filter.type === "TERMS" && filter.selected && filter.selected.options && filter.selected.options.length > 0)
                .map( filter => {
                    var text = filter.id + ": " + filter.selected.options.join(",");
                    return (<button type="button" className="btn btn-default btn-small"
                                    id={filter.id} onClick={()=>this.onClearFilter(filter.id)}>{text} <i className="fa fa-close fa-xs"/></button>);
                });

            var rangeFilters = this.props.filters
                .filter(filter => filter.type === "RANGE" && filter.selected)
                .map( filter => {
                    var text = filter.id + ": " + filter.selected.min + "-" + filter.selected.max;
                    return (<button type="button" className="btn btn-default btn-small"
                                    id={filter.id} onClick={()=>this.onClearFilter(filter.id)}>{text} <i className="fa fa-close fa-xs"/></button>);
                });

            var dateRangeFilters = this.props.filters
                .filter(filter => filter.type === "DATERANGE" && filter.selected)
                .map( filter => {
                    var text = filter.id + ": " + moment(filter.selected.min).format("DD/MM/YYYY") + " - " + moment(filter.selected.max).format("DD/MM/YYYY");
                    return (<button type="button" className="btn btn-default btn-small"
                                    id={filter.id} onClick={()=>this.onClearFilter(filter.id)}>{text} <i className="fa fa-close fa-xs"/></button>);
                });

        }

        searchFilters = [ ...termFilters, ...rangeFilters, ...dateRangeFilters];

        return searchFilters;
    }
}

function mapStateToProps(state, props) {
    return {
        filters: filtersSelector(state)
    };
}


export default connect(mapStateToProps, {clearFilter})(SelectedFilters);

